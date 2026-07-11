import { api } from '@/http/axios'
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/types/posts.types'
import type { PaginatedResponse, PaginationParams } from '@/types/common.types'

export const postsApi = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>('/posts', { params })
    return response.data
  },

  getById: async (id: string): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`)
    return response.data
  },

  getByAuthor: async (authorId: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>(`/posts/author/${authorId}`, { params })
    return response.data
  },

  getFeed: async (params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>('/posts/feed', { params })
    return response.data
  },

  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get<PaginatedResponse<Post>>('/posts/search', {
      params: { q: query, ...params },
    })
    return response.data
  },

  create: async (data: CreatePostDTO): Promise<Post> => {
    const response = await api.post<Post>('/posts', data)
    return response.data
  },

  update: async (id: string, data: UpdatePostDTO): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`)
  }
}
