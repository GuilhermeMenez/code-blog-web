import { Post } from "../../types"
import { api } from "../_core/axios"
import { postRequest } from "../GetPosts/interfaces/request"

const PostPost = async (post: postRequest): Promise<Post> => {
    const response = await api.post<Post>('/newpost', post)
    return response.data
}
export default PostPost