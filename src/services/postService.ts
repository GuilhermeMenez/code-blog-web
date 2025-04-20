import GetPosts, { GetPostsResponse } from "../api/GetPosts/"

export const postService = {
    getPosts: async (): Promise<GetPostsResponse> => {
        // try {
        const response = await GetPosts()
        return response
        // } catch (error) {
        //     if (error instanceof Error) {
        //         throw error
        //     } else {
        //         throw new Error("An unknown error occurred");
        //     }
        // }
    }

}


