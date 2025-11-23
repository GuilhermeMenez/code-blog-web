import { api } from '@/api/_core/axios';
import { PutPostRequest } from "./Interfaces/request";

const PutPost = async (request: PutPostRequest): Promise<void> => {
    const response = await api.put(`/post/posts/edit/${request.postId}`, request);
    return response.data
};

export default PutPost
export type { PutPostRequest };