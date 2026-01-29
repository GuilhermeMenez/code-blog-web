import { useState, useCallback } from 'react'
import { postsService } from '@/services/posts.services'
import type { Post, CreatePostDTO, UpdatePostDTO } from '@/types/posts.types'
import type { ApiError, PaginationParams } from '@/types/common.types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPost, setCurrentPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  })

  const fetchPosts = useCallback(async (params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.getAll(params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setPosts(data!.data)
    setPagination({
      total: data!.total,
      page: data!.page,
      limit: data!.limit,
    })
    setIsLoading(false)
  }, [])

  const fetchFeed = useCallback(async (params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.getFeed(params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setPosts(data!.data)
    setPagination({
      total: data!.total,
      page: data!.page,
      limit: data!.limit,
    })
    setIsLoading(false)
  }, [])

  const fetchPostById = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.getById(id)

    if (error) {
      setError(error)
      setIsLoading(false)
      return null
    }

    setCurrentPost(data)
    setIsLoading(false)
    return data
  }, [])

  const fetchPostsByAuthor = useCallback(async (authorId: string, params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.getByAuthor(authorId, params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setPosts(data!.data)
    setPagination({
      total: data!.total,
      page: data!.page,
      limit: data!.limit,
    })
    setIsLoading(false)
  }, [])

  const createPost = useCallback(async (payload: CreatePostDTO) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.create(payload)

    if (error) {
      setError(error)
      setIsLoading(false)
      return null
    }

    setPosts((prev) => [data!, ...prev])
    setIsLoading(false)
    return data
  }, [])

  const updatePost = useCallback(async (id: string, payload: UpdatePostDTO) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.update(id, payload)

    if (error) {
      setError(error)
      setIsLoading(false)
      return null
    }

    setPosts((prev) => prev.map((post) => (post.id === id ? data! : post)))
    setCurrentPost(data)
    setIsLoading(false)
    return data
  }, [])

  const deletePost = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)

    const { error } = await postsService.delete(id)

    if (error) {
      setError(error)
      setIsLoading(false)
      return false
    }

    setPosts((prev) => prev.filter((post) => post.id !== id))
    setIsLoading(false)
    return true
  }, [])

  const searchPosts = useCallback(async (query: string, params?: PaginationParams) => {
    setIsLoading(true)
    setError(null)

    const { data, error } = await postsService.search(query, params)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setPosts(data!.data)
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
    posts,
    currentPost,
    isLoading,
    error,
    pagination,
    fetchPosts,
    fetchFeed,
    fetchPostById,
    fetchPostsByAuthor,
    createPost,
    updatePost,
    deletePost,
    searchPosts,
    clearError,
  }
}
