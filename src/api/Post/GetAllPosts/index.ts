import { api } from '@/api/_core/axios';
import { GetAllPostsRequest } from "./interfaces/request";
import { GetAllPostsResponse } from "./interfaces/response";

const GetAllPosts = async (request: GetAllPostsRequest): Promise<GetAllPostsResponse> => {
    const response = await api.get(`/post/${request.userId}/posts`)
    return response.data;
}
export default GetAllPosts
export type { GetAllPostsRequest, GetAllPostsResponse }