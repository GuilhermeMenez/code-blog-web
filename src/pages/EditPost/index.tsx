import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { post, handleFetchPostById, handleUpdatePost } = usePosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      handleFetchPostById(id);
      console.log(id, "id")
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    if (!user?.id) {
      alert("Você precisa estar logado para editar um post!");
      return;
    }

    const updatedPost = {
      title,
      content,
      authorId: post.author?.id || "",
      userId: user.id,
      postId: post.postId
    };

    try {
      await handleUpdatePost(updatedPost);
      navigate(`/posts/${post.postId}`);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    }
  };
  
  if (!post) return <p>Carregando post...</p>;

  return (
    <div>
      <header className="container-fluid px-0 mb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
          <a href="/posts" className="navbar-brand mb-0 h1 fw-bold">
            MyCodeBlog
          </a>
          <div className="d-flex gap-2">
            <a href="/newpost" className="btn btn-primary">
              Novo Post
            </a>
          </div>
        </nav>
      </header>

      <div className="container" style={{ maxWidth: "700px" }}>
        <h2 className="mb-4 text-center">Editar Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Título</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Conteúdo</label>
            <textarea
              className="form-control"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{ resize: 'none' }}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/posts/${post.postId}`)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
