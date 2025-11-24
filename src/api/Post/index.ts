import DeletePost, { DeletePostRequest } from './DeletePost';
import GetAllPosts from './GetAllPosts';
import GetBalancedFeed, { GetBalancedFeedRequest } from './GetBalancedFeed';
import GetPostsById, { GetPostsByIdRequest } from './GetPostsById';
import PostPost, { PostRequest } from './PostPost';
import PutPost, { PutPostRequest } from './PutPost';

const PostApi = {
  DeletePost: (request: DeletePostRequest) => DeletePost(request),
  GetAllPosts: () => GetAllPosts(),
  GetBalancedFeed: (request: GetBalancedFeedRequest) => GetBalancedFeed(request),
  GetPostsById: (request: GetPostsByIdRequest) => GetPostsById(request),
  PostPost: (request: PostRequest) => PostPost(request),
  PutPost: (request: PutPostRequest) => PutPost(request),
};
export default PostApi;
