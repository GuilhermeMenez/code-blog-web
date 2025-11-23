import { api } from '@/api/_core/axios';

import { PostUserLoginResponse } from "./interfaces/response";
import { PostUserLoginRequest } from "./interfaces/request";

const PostUserLogin = async (request: PostUserLoginRequest): Promise<PostUserLoginResponse> => {
    const response = await api.post(`/auth/login`, request);
    return response.data;
}
export default PostUserLogin;
export type { PostUserLoginRequest, PostUserLoginResponse };