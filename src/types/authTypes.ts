export interface User {
    sub?: string;
    id?: string;
    name?: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;

    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

    validateAuth: boolean;
    setValidateAuth: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface LogoutParams {
    token: string;
}