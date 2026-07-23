import { api } from '@/http/axios'
import { userProfileSchema, followResponseSchema } from '@/http/schemas/users.schema'
import { paginatedResponseSchema } from '@/http/schemas/common.schema'
import type { UserProfile, UpdateProfileDTO, FollowResponse } from '@/http/schemas/users.schema'
import type { PaginatedResponse, PaginationParams } from '@/http/schemas/common.schema'

const paginatedUsersSchema = paginatedResponseSchema(userProfileSchema)

export const usersApi = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    const response = await api.get(`/users/${userId}`)
    return userProfileSchema.parse(response.data)
  },

  updateProfile: async (data: UpdateProfileDTO): Promise<UserProfile> => {
    const response = await api.put('/users/profile', data)
    return userProfileSchema.parse(response.data)
  },

  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<UserProfile>> => {
    const response = await api.get('/users/search', {
      params: { q: query, ...params },
    })
    return paginatedUsersSchema.parse(response.data)
  },

  getFollowers: async (userId: string, params?: PaginationParams): Promise<PaginatedResponse<UserProfile>> => {
    const response = await api.get(`/users/${userId}/followers`, { params })
    return paginatedUsersSchema.parse(response.data)
  },

  getFollowing: async (userId: string, params?: PaginationParams): Promise<PaginatedResponse<UserProfile>> => {
    const response = await api.get(`/users/${userId}/following`, { params })
    return paginatedUsersSchema.parse(response.data)
  },

  follow: async (userId: string): Promise<FollowResponse> => {
    const response = await api.post(`/users/${userId}/follow`)
    return followResponseSchema.parse(response.data)
  },

  unfollow: async (userId: string): Promise<FollowResponse> => {
    const response = await api.delete(`/users/${userId}/follow`)
    return followResponseSchema.parse(response.data)
  }
}
