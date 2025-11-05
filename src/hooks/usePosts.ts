import { useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { CreatePost, editPost } from "../types/postType";
import { usePostContext } from "../context/postContext";

const usePosts = () => {
  const navigate = useNavigate();
  const { post, setPost, posts, setPosts, selectedPost, setSelectedPost } =
    usePostContext();

  const handleFetchAllPosts = async (userId?: string) => {
    if (!userId) return;
    try {
      const posts = await postService.getPosts();
      setPosts(posts);
      console.log(posts);
    } catch (error) {
      throw error;
    }
  };

  const handleFetchPostById = async (postId: string) => {
    try {
      const fetchedPost = await postService.getPostByid(postId);
      setPost(fetchedPost);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdatePost = async (updatedPost: editPost) => {
    try {
      console.log(updatedPost, "hook");
      await postService.upDatePost(updatedPost);
    } catch (error) {
      throw error;
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      navigate("/posts");
    } catch (error) {
      throw error;
    }
  };
  const handleCreatePost = async (newPost: CreatePost) => {
    try {
      await postService.createPost(newPost);
      await handleFetchAllPosts(newPost.authorId);
      navigate("/posts");
    } catch (error) {
      throw error;
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
