import { api } from '@/api/_core/axios';
import { GetPostsByIdRequest } from "./interfaces/request";
import { GetPostByIdResponse } from "./interfaces/response";

const GetPostsById = async (request: GetPostsByIdRequest): Promise<GetPostByIdResponse> => {
    const response = await api.get(`/post/posts/${request.postId}`);
    return response.data
}

export default GetPostsById;
export type { GetPostsByIdRequest };