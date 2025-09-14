import DeletePost from "@/api/Post/DeletePost";
import GetAllPosts from "@/api/Post/GetAllPosts";
import GetPostsById from "@/api/Post/GetPostsById";
import PostPost, { PostRequest } from "@/api/Post/PostPost";
import putPost, { PutPostRequest } from "@/api/Post/PutPost";
import { Post } from "@/types/postType";


export const postService = {
    getPosts: async (request: string): Promise<Post[]> => {
        try {
            const response = await GetAllPosts({ userId: request })
            return response.posts
        } catch (error) {
            if (error instanceof Error) {
                throw error
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },

    getPostByid: async (request: string): Promise<Post> => {
        try {
            const response = await GetPostsById({ postId: request })
            return response.post
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

    upDatePost: async (post: Post): Promise<void> => {
        try {
            const request: PutPostRequest = {
                id: post.id,
                data: {
                    title: post.title,
                    content: post.content,
                }
            };
            await putPost(request)
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    },

    deletePost: async (request: string): Promise<void> => {
        try {
            const response = await DeletePost({ postId: request })
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
    createPost: async (post: PostRequest): Promise<string> => {
        try {
            const response = await PostPost(post);
            return response.postId;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("An unknown error occurred");
            }
        }
    }

}