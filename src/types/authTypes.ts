export interface User {
    sub?: string;
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
