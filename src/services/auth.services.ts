import { authApi } from '@/api/endpoints/auth.api'
import { handleApiError } from '@/utils/error-handler'
import type { AuthResponse, LoginDTO, RegisterDTO, User } from '@/types/auth.types'
import type { ServiceResponse } from '@/types/common.types'

export const authService = {
  async login(payload: LoginDTO): Promise<ServiceResponse<AuthResponse>> {
    try {
      const { data } = await authApi.login(payload)
      localStorage.setItem('token', data.token)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async register(payload: RegisterDTO): Promise<ServiceResponse<AuthResponse>> {
    try {
      const { data } = await authApi.register(payload)
      localStorage.setItem('token', data.token)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async logout(): Promise<ServiceResponse<void>> {
    try {
      await authApi.logout()
      localStorage.removeItem('token')

      return { data: undefined, error: null }
    } catch (error) {
      localStorage.removeItem('token')
      
      return { data: null, error: handleApiError(error) }
    }
  },

  async me(): Promise<ServiceResponse<User>> {
    try {
      const { data } = await authApi.me()

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },
}
