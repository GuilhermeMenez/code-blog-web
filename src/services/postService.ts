import DeletePost from "../api/Post/DeletePost";
import GetAllPosts from "../api/Post/GetAllPosts";
import GetPostsById from "../api/Post/GetPostsById";
import PostPost from "../api/Post/PostPost";
import { postRequest } from "../api/Post/PostPost/interfaces/request";
import putPost from "../api/Post/PutPost";
import { putPostRequest } from "../api/Post/PutPost/Interfaces/request";
import { Post } from "../types/postType";


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
            const request: putPostRequest = {
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
    createPost: async (post: postRequest): Promise<string> => {
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