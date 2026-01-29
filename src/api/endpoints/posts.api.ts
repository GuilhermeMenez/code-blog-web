import { api } from '../axios'
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/types/posts.types'
import type { PaginatedResponse, PaginationParams } from '@/types/common.types'

export const postsApi = {
  getAll: (params?: PaginationParams) => 
    api.get<PaginatedResponse<Post>>('/posts', { params }),

  getById: (id: string) => 
    api.get<Post>(`/posts/${id}`),

  getByAuthor: (authorId: string, params?: PaginationParams) => 
    api.get<PaginatedResponse<Post>>(`/posts/author/${authorId}`, { params }),

  getFeed: (params?: PaginationParams) => 
    api.get<PaginatedResponse<Post>>('/posts/feed', { params }),

  create: (data: CreatePostDTO) => 
    api.post<Post>('/posts', data),

  update: (id: string, data: UpdatePostDTO) => 
    api.put<Post>(`/posts/${id}`, data),

  delete: (id: string) => 
    api.delete(`/posts/${id}`),

  search: (query: string, params?: PaginationParams) => 
    api.get<PaginatedResponse<Post>>('/posts/search', { params: { q: query, ...params } }),
}
