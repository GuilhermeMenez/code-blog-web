import { api } from "../../_core/axios"
import { PostUserRegisterRequest } from "./interfaces/request"
import { PostUserRegisterResponse } from "./interfaces/response"

const PostUserRegister = async (request: PostUserRegisterRequest): Promise<PostUserRegisterResponse> => {
    const response = await api.post('/register', request)
    return response.data
}
export default PostUserRegister
export type { PostUserRegisterRequest, PostUserRegisterResponse }