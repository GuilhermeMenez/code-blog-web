import { api } from '../axios'
import type { UserProfile, UpdateProfileDTO, FollowResponse } from '@/types/users.types'
import type { PaginatedResponse, PaginationParams } from '@/types/common.types'

export const usersApi = {
  getProfile: (userId: string) => 
    api.get<UserProfile>(`/users/${userId}`),

  updateProfile: (data: UpdateProfileDTO) => 
    api.put<UserProfile>('/users/profile', data),

  follow: (userId: string) => 
    api.post<FollowResponse>(`/users/${userId}/follow`),

  unfollow: (userId: string) => 
    api.delete<FollowResponse>(`/users/${userId}/follow`),

  getFollowers: (userId: string, params?: PaginationParams) => 
    api.get<PaginatedResponse<UserProfile>>(`/users/${userId}/followers`, { params }),

  getFollowing: (userId: string, params?: PaginationParams) => 
    api.get<PaginatedResponse<UserProfile>>(`/users/${userId}/following`, { params }),

  search: (query: string, params?: PaginationParams) => 
    api.get<PaginatedResponse<UserProfile>>('/users/search', { params: { q: query, ...params } }),
}
