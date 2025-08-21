import PostUserLogin, { PostUserLoginRequest } from "./PostUserLogin";
import PostUserRegister, { PostUserRegisterRequest } from "./PostUserRegister";

const AuthApi = {
    postLogin: (request: PostUserLoginRequest) => PostUserLogin(request),
    postRegister: (request: PostUserRegisterRequest) => PostUserRegister(request)
}
export default AuthApi;