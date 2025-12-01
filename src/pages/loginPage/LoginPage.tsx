// src/pages/loginPage/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { apiClient, setAuthToken } from '../../utils/apiClient';
import { useAuth } from '../../hooks/authhook';
import styles from './LoginPage.module.css';
import  {AxiosError} from "axios";

interface LoginFormData {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const { login, logout } = useAuth();
    const navigate = useNavigate();

    // Listen for logout events from interceptor
    useEffect(() => {
        const handleLogout = () => {
            logout();
            navigate('/login');
        };

        window.addEventListener('auth:logout', handleLogout);
        return () => window.removeEventListener('auth:logout', handleLogout);
    }, [logout, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await apiClient.post('/api/v1/auth/login', formData);

            console.log('logging in', response.data);
            if (response.data.accessToken && response.data.user) {
                setAuthToken(response.data.accessToken);
                login(response.data.user, response.data.accessToken);
                navigate('/');
            }


        } catch (err: unknown) {
            let errorMessage = 'Login failed. Please check your credentials.';

            if (err instanceof AxiosError) {
                const data = err.response?.data;

                errorMessage =
                    (typeof data === 'object' && data !== null && 'message' in data)
                        ? (data as { message?: string }).message ?? errorMessage
                        : typeof data === 'string'
                            ? data
                            : errorMessage;
            }

            setError(errorMessage);
            console.error('Login error:', err);
        }
        finally {

            setLoading(false);
        }
    };



    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Header */}
                <div className={styles.header}>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Username Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            required
                            autoComplete="username"
                        />
                    </div>

                    {/* Password Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={styles.togglePassword}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitButton}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Footer Links */}
                <div className={styles.footer}>
                    <p>
                        Don't have an account?{' '}
                        <a href="/signup">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;