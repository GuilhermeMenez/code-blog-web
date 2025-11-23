import { ReactNode } from "react";

export interface User {
    sub?: string;
    id?: string;
    name?: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;

    isAuthenticated: boolean;
    setIsAuthenticated: (auth: boolean) => void;

    validateAuth: boolean;
    setValidateAuth: (validate: boolean) => void;
}


export interface AuthProviderProps {
    children: ReactNode;
};

export interface SingUpParams {
    name: string;
    email: string;
    password: string;
    userRole: 'admin' | 'user';
}


export interface SignInParams {
    login: string,
    password: string;
}

export interface LogoutParams {
    token: string;
}