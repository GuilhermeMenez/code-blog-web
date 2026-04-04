import { api } from '@/http/axios'
import type { UserProfile, UpdateProfileDTO, FollowResponse } from '@/types/users.types'
import type { PaginatedResponse, PaginationParams } from '@/types/common.types'

export const usersApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await api.get<UserProfile>(`/users/${userId}`)
    return response.data
  },

  updateProfile: async (data: UpdateProfileDTO): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/users/profile', data)
    return response.data
  },

  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<UserProfile>> => {
    const response = await api.get<PaginatedResponse<UserProfile>>('/users/search', {
      params: { q: query, ...params },
    })
    return response.data
  },

  getFollowers: async (userId: string, params?: PaginationParams): Promise<PaginatedResponse<UserProfile>> => {
    const response = await api.get<PaginatedResponse<UserProfile>>(`/users/${userId}/followers`, { params })
    return response.data
  },

  getFollowing: async (userId: string, params?: PaginationParams): Promise<PaginatedResponse<UserProfile>> => {
    const response = await api.get<PaginatedResponse<UserProfile>>(`/users/${userId}/following`, { params })
    return response.data
  },

  follow: async (userId: string): Promise<FollowResponse> => {
    const response = await api.post<FollowResponse>(`/users/${userId}/follow`)
    return response.data
  },

  unfollow: async (userId: string): Promise<FollowResponse> => {
    const response = await api.delete<FollowResponse>(`/users/${userId}/follow`)
    return response.data
  }
}
