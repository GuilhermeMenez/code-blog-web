import { jwtDecode } from 'jwt-decode'
import { useAuthContext } from "../context/authContext";
import { authService } from "../services/authService";
import { SignInParams, SingUpParams, User } from "../types/authTypes";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuth = () => {
    const navigate = useNavigate();
    const {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        validateAuth,
        setValidateAuth
    } = useAuthContext();

    const handleSessionCookie = (token: string) => {
        Cookies.set('token', token, { expires: 30 })
        setIsAuthenticated(true)
    }

    const handleSignUp = async ({ name, email, password }: SingUpParams) => {
        try {
            const response = await authService.register({ name, email, password, userRole: 'user' });
            const { token } = response

            setUser(jwtDecode(token))
            handleSessionCookie(token)
            navigate('/posts')

        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw error;
        }
    }

    const handleSignIn = async ({ login, password }: SignInParams) => {
        try {
            const response = await authService.login({ login, password });

            const { token } = response
            const { sub, name, id } = jwtDecode<User>(token)

            const userData: User = {
                sub: sub,
                id: id,
                name: name,

            }

            setUser(userData)
            handleSessionCookie(token)
            setIsAuthenticated(true)
            setValidateAuth(true)
            navigate('/posts')

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }

        //fazer o signout

    }

    useEffect(() => {
        function loadCookie() {
            const token = Cookies.get('token')

            if (token) {
                setUser(jwtDecode<User>(token))
            }
        }

        loadCookie()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        validateAuth,
        setValidateAuth,
        handleSignUp,
        handleSignIn
    };
}



export { useAuth }