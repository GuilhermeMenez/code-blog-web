import { useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { CreatePost, EditPost } from "../types/postType";
import { usePostContext } from "../context/postContext";

const usePosts = () => {
  const navigate = useNavigate();
  const { post, setPost, posts, setPosts, selectedPost, setSelectedPost } =
    usePostContext();

  const handleFetchAllPosts = async () => {
    try {
      const posts = await postService.getPosts();
      setPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleFetchPostById = async (postId: string) => {
    try {
      const fetchedPost = await postService.getPostByid(postId);
      setPost(fetchedPost);
    } catch (error) {
      console.error("Error fetching post by ID:", error);
    }
  };

  const handleUpdatePost = async (updatedPost: EditPost) => {
    try {
      await postService.upDatePost(updatedPost);
      navigate(`/posts/${updatedPost.postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  
  const handleCreatePost = async (newPost: CreatePost) => {
    try {
      await postService.createPost(newPost);
      await handleFetchAllPosts();
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return {
    post,
    setPost,
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    handleFetchAllPosts,
    handleFetchPostById,
    handleDeletePost,
    handleUpdatePost,
    handleCreatePost,
  };
};
export { usePosts };
