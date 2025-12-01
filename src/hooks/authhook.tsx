// src/context/AuthenticationProvider.tsx
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import { setAuthToken, clearAuthToken } from "../utils/apiClient";

export interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextProps {
    user?: User;
    accessToken?: string;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(authContext);
    if (!ctx) throw new Error("useAuth must be used within AuthenticationProvider");
    return ctx;
};

export default function AuthenticationProvider({
                                                   children
                                               }: {
    children: React.ReactNode;
}): React.JSX.Element {

    const [user, setUser] = useState<User | undefined>(undefined);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

    // Restore user from localStorage on reload
    useEffect(() => {
        const storeUser = async () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }

        storeUser();

    }, []);

    // Handle login
    const login = useCallback((user: User, token: string) => {
        setAccessToken(token);
        setUser(user);

        // Save user only (token is memory only)
        localStorage.setItem("user", JSON.stringify(user));

        setAuthToken(token);
    }, []);

    // Handle logout
    const logout = useCallback(() => {
        setUser(undefined);
        setAccessToken(undefined);

        localStorage.removeItem("user");

        clearAuthToken();

        window.location.reload();
    }, []);

    // Listen to token refresh failure
    useEffect(() => {
        const handleForcedLogout = () => logout();

        window.addEventListener("auth:logout", handleForcedLogout);
        return () =>
            window.removeEventListener("auth:logout", handleForcedLogout);
    }, [logout]);

    const isAuthenticated = !!accessToken;

    return (
        <authContext.Provider
            value={{
                user,
                accessToken,
                setUser,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </authContext.Provider>
    );
}
