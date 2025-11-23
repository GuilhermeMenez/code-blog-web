import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/authContext";
import { authService } from "../services/authService";
import {
  LogoutParams,
  SignInParams,
  SingUpParams,
  User,
} from "../types/authTypes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    validateAuth,
    setValidateAuth,
  } = useAuthContext();

  const handleSessionCookie = (token: string) => {
    Cookies.set("token", token, { expires: 30 });
    setIsAuthenticated(true);
  };

  const handleSignUp = async ({ name, email, password }: SingUpParams) => {
    try {
      const response = await authService.register({
        name,
        email,
        password,
        userRole: "user",
      });
      const { token } = response;

      setUser(jwtDecode(token));
      handleSessionCookie(token);
      navigate("/posts");
    } catch (error) {
        console.error(error);
    }
  };

  const handleSignIn = async ({ login, password }: SignInParams) => {
    try {
      const response = await authService.login({ login, password });

      const { token } = response;
      const { sub, name, id } = jwtDecode<User>(token);

      const userData: User = {
        sub: sub,
        id: id,
        name: name,
      };

      setUser(userData);
      handleSessionCookie(token);
      setIsAuthenticated(true);
      setValidateAuth(true);
      navigate("/feed");
    } catch (error) {
        console.error(error);
    }
  };

  const handleLougout = async ({ token }: LogoutParams) => {
    try {
      authService.logout({ token });
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    function loadCookie() {
      const token = Cookies.get("token");

      if (token) {
        setUser(jwtDecode<User>(token));
      }
    }
    loadCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    validateAuth,
    setValidateAuth,
    handleSignUp,
    handleSignIn,
    handleLougout,
  };
};

export { useAuth };
