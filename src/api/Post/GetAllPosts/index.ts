import { api } from '@/api/_core/axios';
import { GetAllPostsResponse } from './interfaces/response';

const GetAllPosts = async (): Promise<GetAllPostsResponse> => {
  const response = await api.get(`/post/posts`);
  return response.data;
};
export default GetAllPosts;
export type { GetAllPostsResponse };
