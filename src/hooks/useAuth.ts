import { useState, useCallback } from 'react'
import { authService } from '@/services/auth.services'
import type { User, LoginDTO, RegisterDTO } from '@/types/auth.types'
import type { ApiError } from '@/types/common.types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const login = useCallback(async (payload: LoginDTO) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await authService.login(payload)

    if (error) {
      setError(error)
      setIsLoading(false)
      return false
    }

    setUser(data!.user)
    setIsAuthenticated(true)
    setIsLoading(false)
    return true
  }, [])

  const register = useCallback(async (payload: RegisterDTO) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await authService.register(payload)

    if (error) {
      setError(error)
      setIsLoading(false)
      return false
    }

    setUser(data!.user)
    setIsAuthenticated(true)
    setIsLoading(false)
    return true
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)

    await authService.logout()

    setUser(null)
    setIsAuthenticated(false)
    setIsLoading(false)
  }, [])

  const fetchUser = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await authService.me()

    if (error) {
      setError(error)
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    setUser(data)
    setIsAuthenticated(true)
    setIsLoading(false)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    fetchUser,
    clearError,
  }
}
