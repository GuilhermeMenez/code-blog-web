import { useNavigate } from "react-router-dom";
import { postService } from "../services/postService";
import { editPost, Post } from "../types/postType";
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
      console.error("Erro ao buscar posts:", error);
      throw error;
    }
  };

  const handleFetchPostById = async (postId: string) => {
    try {
      const allPosts = await postService.getPostByid(postId);
      setPosts([allPosts]);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      throw error;
    }
  };

  const handleUpdatePost = async (post: Post) => {
    try {
      await postService.upDatePost(post);
      await handleFetchAllPosts(post.userId);
      navigate("/posts");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      throw error;
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      navigate("/posts");
    } catch (error) {
      console.error("Erro ao deletar post:", error);
      throw error;
    }
  };
  const handleCreatePost = async (newPost: editPost) => {
    try {
      await postService.createPost(newPost);
      await handleFetchAllPosts(newPost.authorId);
      navigate("/posts");
    } catch (error) {
      console.error("Erro ao criar post:", error);
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
