// src/utils/apiClient.ts
import axios, {type InternalAxiosRequestConfig } from 'axios';

// Extend InternalAxiosRequestConfig to include _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Allows cookies (refresh token) to be sent
});

// Store for access token
let accessToken: string | null = null;

// Queue for failed requests during token refresh
interface QueuedRequest {
    resolve: (token: string) => void;
    reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

// ============================================================================
// REQUEST INTERCEPTOR - Attach access token
// ============================================================================
apiClient.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: unknown) => {
        return Promise.reject(error);
    }
);

// ============================================================================
// RESPONSE INTERCEPTOR - Handle token refresh
// ============================================================================
apiClient.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;
        if (!originalRequest) {
            return Promise.reject(error);
        }

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {

            // If already refreshing, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh endpoint (uses httpOnly cookie automatically)
                const response = await axios.get(`${API_BASE_URL}/auth/refresh`, {
                    withCredentials: true,
                });

                const newAccessToken = response.data.accessToken;

                // Update stored token
                setAuthToken(newAccessToken);

                // Update the failed request's header
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Process queued requests
                processQueue(null, newAccessToken);
                isRefreshing = false;

                // Retry the original request
                return apiClient(originalRequest);

            } catch (refreshError) {
                // Refresh failed - clear tokens and logout
                const error = refreshError instanceof Error ? refreshError : new Error('Token refresh failed');
                processQueue(error, null);
                isRefreshing = false;

                clearAuthToken();

                // Dispatch logout event for your app to handle
                window.dispatchEvent(new CustomEvent('auth:logout'));

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// ============================================================================
// TOKEN MANAGEMENT FUNCTIONS
// ============================================================================
export const setAuthToken = (token: string) => {
    accessToken = token;
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
    accessToken = null;
    delete apiClient.defaults.headers.common['Authorization'];
};

export const getAccessToken = () => accessToken;

export { apiClient };