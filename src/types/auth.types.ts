export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}
