import { api } from '@/api/_core/axios'
import { PostUserLogoutResquest } from './interfaces/request'

const PostUserLogOut = async (request: PostUserLogoutResquest): Promise<void> => {
  const response = await api.post(`/auth/logout`, request)
  return response.data
}
export default PostUserLogOut
export type { PostUserLogoutResquest }
