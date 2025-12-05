import DeletePost from '@/api/Post/DeletePost'
import GetAllPosts from '@/api/Post/GetAllPosts'
import GetPostsById from '@/api/Post/GetPostsById'
import PostPost, { PostRequest } from '@/api/Post/PostPost'
import putPost from '@/api/Post/PutPost'
import { EditPost, Post } from '@/types/postType'

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await GetAllPosts()
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  },

  getPostByid: async (request: string): Promise<Post> => {
    try {
      const response = await GetPostsById({ postId: request })
      return response.post
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  },

  upDatePost: async (request: EditPost): Promise<void> => {
    try {
      const response = await putPost(request)
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  },

  deletePost: async (request: string): Promise<void> => {
    try {
      const response = await DeletePost({ postId: request })
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  },
  createPost: async (request: PostRequest): Promise<string> => {
    try {
      const response = await PostPost(request)
      return response.postId
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error('An unknown error occurred')
      }
    }
  },
}
