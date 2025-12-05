import AuthApi from '@/api/Auth/index'
import { PostUserLoginRequest, PostUserLoginResponse } from '@/api/Auth/PostUserLogin'
import { PostUserRegisterRequest, PostUserRegisterResponse } from '@/api/Auth/PostUserRegister'
import { PostUserLogoutResquest } from '@/api/Auth/PostUserLogOut'

export const authService = {
  // TO-DO: tratar erros

  login: async (request: PostUserLoginRequest): Promise<PostUserLoginResponse> => {
    try {
      const response = await AuthApi.postLogin(request)
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('Usuário ou senha inválidos')
      }
    }
  },

  register: async (request: PostUserRegisterRequest): Promise<PostUserRegisterResponse> => {
    try {
      const response = await AuthApi.postRegister(request)
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('Erro ao registrar usuário')
      }
    }
  },

  logout: async (request: PostUserLogoutResquest): Promise<void> => {
    try {
      const response = await AuthApi.postLogout(request)
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('Erro ao deslogar usuário')
      }
    }
  },
}
