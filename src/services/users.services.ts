import { usersApi } from '@/api/endpoints/users.api'
import { handleApiError } from '@/utils/error-handler'
import type { UserProfile, UpdateProfileDTO, FollowResponse } from '@/types/users.types'
import type { ServiceResponse, PaginatedResponse, PaginationParams } from '@/types/common.types'

export const usersService = {
  async getProfile(userId: string): Promise<ServiceResponse<UserProfile>> {
    try {
      const { data } = await usersApi.getProfile(userId)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async updateProfile(payload: UpdateProfileDTO): Promise<ServiceResponse<UserProfile>> {
    try {
      const { data } = await usersApi.updateProfile(payload)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async follow(userId: string): Promise<ServiceResponse<FollowResponse>> {
    try {
      const { data } = await usersApi.follow(userId)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async unfollow(userId: string): Promise<ServiceResponse<FollowResponse>> {
    try {
      const { data } = await usersApi.unfollow(userId)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async getFollowers(userId: string, params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<UserProfile>>> {
    try {
      const { data } = await usersApi.getFollowers(userId, params)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async getFollowing(userId: string, params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<UserProfile>>> {
    try {
      const { data } = await usersApi.getFollowing(userId, params)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async search(query: string, params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<UserProfile>>> {
    try {
      const { data } = await usersApi.search(query, params)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },
}
