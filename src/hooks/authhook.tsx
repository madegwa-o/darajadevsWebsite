import React, {createContext, useCallback, useContext, useState} from "react";

export interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextProps {
    user?: User;
    accessToken?: string;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    login: (user: User, token?: string) => void;
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

export default function AuthenticationProvider({children,initialUser}: { children: React.ReactNode; initialUser?: User;}): React.JSX.Element {
    const [user, setUser] = useState<User | undefined>(initialUser);
    const [accessToken, setAccessToken] = useState<string>();

    const login = useCallback((user: User, token?: string) => {
        setAccessToken(token);
        setUser(user);
    },[])

    const logout = useCallback (() => {
        setAccessToken('');
        setUser(undefined);

        window.location.reload();
    },[])
    const isAuthenticated = !!user

    return (
        <authContext.Provider value={{ user, accessToken, setUser, setAccessToken,login, logout, isAuthenticated }}>
            {children}
        </authContext.Provider>
    );
}
