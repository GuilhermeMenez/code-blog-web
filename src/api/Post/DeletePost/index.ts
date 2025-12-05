import { api } from '@/api/_core/axios'
import { DeletePostRequest } from './interfaces/request'

const DeletePost = async (request: DeletePostRequest): Promise<void> => {
  await api.delete(`post/posts/${request.postId}`)
}

export default DeletePost
export type { DeletePostRequest }
