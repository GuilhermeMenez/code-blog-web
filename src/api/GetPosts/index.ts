import { Post } from "../../types";
import { api } from "../_core/axios"
import { GetPostsResponse } from "./interfaces/response"

const GetPosts = async (): Promise<GetPostsResponse> => {
    const response = await api.get<Post[]>('/posts')
    return { posts: response.data };

}

const GetPostsById = async (id: string): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`)
    return response.data
}

export default GetPosts
export { GetPostsById }
//export type { GetPostsResponse }