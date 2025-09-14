export interface User {
    sub?: string;
    id?: string;
    name?: string;
}

export interface AuthContextType {
    user: User
    setUser: (user: User) => void;

    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;

    validateAuth: boolean
    setValidateAuth: (validateAuth: boolean) => void;
}


export interface AuthProviderProps {
    children: React.ReactNode;
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