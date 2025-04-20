import { api } from "../_core/axios"
import { GetPostsResponse } from "./interfaces/response"

const GetPosts = async (): Promise<GetPostsResponse> => {
    const response = await api.get('/posts', {
        method: 'GET',
    })
    return response.data
}

export default GetPosts
export type { GetPostsResponse }