import { useState, useCallback } from 'react'
import { usersService } from '@/services/users.services'
import type { UserProfile, UpdateProfileDTO } from '@/types/users.types'
import type { ApiError, PaginationParams } from '@/types/common.types'

export function useUsers() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  })

  const fetchProfile = useCallback(async (userId: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.getProfile(userId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return null
    }

    setProfile(data)
    setIsLoading(false)
    return data
  }, [])

  const updateProfile = useCallback(async (payload: UpdateProfileDTO) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.updateProfile(payload)

    if (error) {
      setError(error)
      setIsLoading(false)
      return null
    }

    setProfile(data)
    setIsLoading(false)
    return data
  }, [])

  const followUser = useCallback(async (userId: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.follow(userId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return false
    }

    if (profile && profile.id === userId) {
      setProfile({ ...profile, followersCount: data!.followersCount })
    }

    setIsLoading(false)
    return true
  }, [profile])

  const unfollowUser = useCallback(async (userId: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.unfollow(userId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return false
    }

    if (profile && profile.id === userId) {
      setProfile({ ...profile, followersCount: data!.followersCount })
    }

    setIsLoading(false)
    return true
  }, [profile])

  const fetchFollowers = useCallback(async (userId: string, params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.getFollowers(userId, params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setUsers(data!.data)
    setPagination({
      total: data!.total,
      page: data!.page,
      limit: data!.limit,
    })
    setIsLoading(false)
  }, [])

  const fetchFollowing = useCallback(async (userId: string, params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.getFollowing(userId, params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setUsers(data!.data)
    setPagination({
      total: data!.total,
      page: data!.page,
      limit: data!.limit,
    })
    setIsLoading(false)
  }, [])

  const searchUsers = useCallback(async (query: string, params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await usersService.search(query, params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setUsers(data!.data)
    setPagination({
      total: data!.total,
      page: data!.page,
      limit: data!.limit,
    })
    setIsLoading(false)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    profile,
    users,
    isLoading,
    error,
    pagination,
    fetchProfile,
    updateProfile,
    followUser,
    unfollowUser,
    fetchFollowers,
    fetchFollowing,
    searchUsers,
    clearError,
  }
}
