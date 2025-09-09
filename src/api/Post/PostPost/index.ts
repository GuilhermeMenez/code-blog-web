import { api } from "../../_core/axios"
import { postRequest } from "./interfaces/request"
import { PostPostResponse } from "./interfaces/respose"

const PostPost = async (request: postRequest): Promise<PostPostResponse> => {
    const response = await api.post('/newpost', request)
    return response.data
}
export default PostPost