import { api } from '@/api/_core/axios'
import { GetBalancedFeedRequest } from './interfaces/request'
import { GetBalancedFeedResponse } from './interfaces/response'

const GetBalancedFeed = async (
  request: GetBalancedFeedRequest,
): Promise<GetBalancedFeedResponse> => {
  const response = await api.get(`post/${request.userId}/feed`)
  return response.data
}

export default GetBalancedFeed
export type { GetBalancedFeedRequest, GetBalancedFeedResponse }
