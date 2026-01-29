import { api } from '../axios'
import type { AuthResponse, LoginDTO, RegisterDTO, User } from '@/types/auth.types'

export const authApi = {
  login: (data: LoginDTO) => 
    api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterDTO) => 
    api.post<AuthResponse>('/auth/register', data),

  logout: () => 
    api.post('/auth/logout'),

  me: () => 
    api.get<User>('/auth/me'),

  refreshToken: () => 
    api.post<{ token: string }>('/auth/refresh'),
}
