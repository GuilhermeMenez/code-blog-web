import { api } from '@/api/_core/axios'
import { PostRequest } from './interfaces/request'
import { PostPostResponse } from './interfaces/respose'

const PostPost = async (request: PostRequest): Promise<PostPostResponse> => {
  const response = await api.post('/post/newpost', request)
  return response.data
}
export default PostPost
export type { PostRequest, PostPostResponse }
