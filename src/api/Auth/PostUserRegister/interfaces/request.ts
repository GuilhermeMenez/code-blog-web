type UserRoles = 'admin' | 'user'

export interface PostUserRegisterRequest {
  name: string
  email: string
  password: string
  userRole: UserRoles
}
