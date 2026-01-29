import { postsApi } from '@/api/endpoints/posts.api'
import { handleApiError } from '@/utils/error-handler'
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/types/posts.types'
import type { ServiceResponse, PaginatedResponse, PaginationParams } from '@/types/common.types'

export const postsService = {
  async getAll(params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<Post>>> {
    try {
      const { data } = await postsApi.getAll(params)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async getById(id: string): Promise<ServiceResponse<Post>> {
    try {
      const { data } = await postsApi.getById(id)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async getByAuthor(authorId: string, params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<Post>>> {
    try {
      const { data } = await postsApi.getByAuthor(authorId, params)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async getFeed(params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<Post>>> {
    try {
      const { data } = await postsApi.getFeed(params)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async create(payload: CreatePostDTO): Promise<ServiceResponse<Post>> {
    try {
      const { data } = await postsApi.create(payload)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async update(id: string, payload: UpdatePostDTO): Promise<ServiceResponse<Post>> {
    try {
      const { data } = await postsApi.update(id, payload)

      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async delete(id: string): Promise<ServiceResponse<void>> {
    try {
      await postsApi.delete(id)

      return { data: undefined, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },

  async search(query: string, params?: PaginationParams): Promise<ServiceResponse<PaginatedResponse<Post>>> {
    try {
      const { data } = await postsApi.search(query, params)
      
      return { data, error: null }
    } catch (error) {
      return { data: null, error: handleApiError(error) }
    }
  },
}
