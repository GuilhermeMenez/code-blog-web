import { api } from '@/api/_core/axios';

import { PostUserLoginResponse } from "./interfaces/response.ts";
import { PostUserLoginRequest } from "./interfaces/request.ts";

const PostUserLogin = async (request: PostUserLoginRequest): Promise<PostUserLoginResponse> => {
    const response = await api.post(`/login`, request);
    return response.data;
}
export default PostUserLogin;
export type { PostUserLoginRequest, PostUserLoginResponse };