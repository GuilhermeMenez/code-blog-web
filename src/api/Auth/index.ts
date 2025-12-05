import PostUserLogin, { PostUserLoginRequest } from './PostUserLogin'
import PostUserLogOut, { PostUserLogoutResquest } from './PostUserLogOut'
import PostUserRegister, { PostUserRegisterRequest } from './PostUserRegister'

const AuthApi = {
  postLogin: (request: PostUserLoginRequest) => PostUserLogin(request),
  postRegister: (request: PostUserRegisterRequest) => PostUserRegister(request),
  postLogout: (request: PostUserLogoutResquest) => PostUserLogOut(request),
}
export default AuthApi
