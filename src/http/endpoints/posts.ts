import { api } from '@/http/axios'
import { postSchema } from '@/http/schemas/posts.schema'
import { paginatedResponseSchema } from '@/http/schemas/common.schema'
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/http/schemas/posts.schema'
import type { PaginatedResponse, PaginationParams } from '@/http/schemas/common.schema'

const paginatedPostsSchema = paginatedResponseSchema(postSchema)

export const postsApi = {
  getAll: async (params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/posts', { params })
    return paginatedPostsSchema.parse(response.data)
  },

  getById: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`)
    return postSchema.parse(response.data)
  },

  getByAuthor: async (authorId: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get(`/posts/author/${authorId}`, { params })
    return paginatedPostsSchema.parse(response.data)
  },

  getFeed: async (params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/posts/feed', { params })
    return paginatedPostsSchema.parse(response.data)
  },

  search: async (query: string, params?: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/posts/search', {
      params: { q: query, ...params },
    })
    return paginatedPostsSchema.parse(response.data)
  },

  create: async (data: CreatePostDTO): Promise<Post> => {
    const response = await api.post('/posts', data)
    return postSchema.parse(response.data)
  },

  update: async (id: string, data: UpdatePostDTO): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, data)
    return postSchema.parse(response.data)
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`)
  }
}
