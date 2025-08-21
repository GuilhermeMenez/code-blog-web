import DeletePost from "../api/Post/DeletePost"
import GetPosts, { GetPostsById } from "../api/Post/GetPosts"
import { postRequest } from "../api/Post/GetPosts/interfaces/request"
import PostPost from "../api/Post/PostPost"
import putPost from "../api/Post/PutPost"
import { Post } from "../api/Post/PutPost/Interfaces/request"

export const postService = {
    getPosts: async (): Promise<Post[]> => {
        try {
            const response = await GetPosts()
            return response.posts
        } catch (error) {
            if (error instanceof Error) {
                throw error
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },

    getPostByid: async (id: string): Promise<Post> => {
        try {
            const response = await GetPostsById(id)
            return response
        }
        catch (error) {
            if (error instanceof Error) {
                throw error
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    },

    upDatePost: async (post: Post): Promise<Post> => {
        try {
            const response = await putPost(post.id, post)
            return response
        } catch (error) {
            if (error instanceof Error) {
                throw error
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },


    deletePost: async (id: string): Promise<void> => {
        try {
            const response = await DeletePost(id)
            return response
        }
        catch (error) {
            if (error instanceof Error) {
                throw error
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    },
    createPost: async (post: postRequest): Promise<Post> => {
        try {
            const response = await PostPost(post)
            return response
        } catch (error) {
            if (error instanceof Error) {
                throw error
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

}