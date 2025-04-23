import GetPosts, { GetPostsById } from "../api/GetPosts/"
import { Post } from "../types"

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
    }

}