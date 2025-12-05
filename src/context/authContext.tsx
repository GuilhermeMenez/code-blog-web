/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { AuthContextType, AuthProviderProps, User } from '../types/authTypes'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [validateAuth, setValidateAuth] = useState<boolean>(false)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        validateAuth,
        setValidateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('AuthProvider must be used within an AuthContext')
  }
  return context
}
