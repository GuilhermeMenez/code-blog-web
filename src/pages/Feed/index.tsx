import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postService } from "@/services/postService";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./feed.css";

const Feed = () => {
  const { user } = useAuth();
  const { posts, handleFetchAllPosts, setPosts } = usePosts();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    handleFetchAllPosts();
  }, []);

  const isMyPost = (post: (typeof posts)[0]) => {
    return post.userId === user?.id || post.author.id === user?.id;
  };

  const openDeleteModal = (postId: string) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
    setIsDeleting(false);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);

    try {
      await postService.deletePost(postToDelete);
      setPosts(posts.filter((post) => post.postId !== postToDelete));
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      setIsDeleting(false);
    }
  };

  const handleEdit = (postId: string) => {
    navigate(`/posts/edit/${postId}`);
  };

  return (
    <div className="feed-container">
      {/* MAIN CONTENT */}
      <main className="posts-section">
        <div className="posts-container">
          {posts?.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum post encontrado. Crie um novo post para começar!</p>
            </div>
          ) : (
            posts.map((post) => (
              <article key={post.postId} className="post-card">
                <div className="post-header">
                  <div className="post-info">
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-meta">
                      <p className="post-author">{post.author.name}</p>
                      <time className="post-date">
                        {new Date(post.createdAt).toLocaleString("pt-BR")}
                      </time>
                    </div>
                  </div>

                  {/* MENU DE AÇÕES DO POST */}
                  {isMyPost(post) && (
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button 
                          className="post-menu-button" 
                          aria-label="Menu do post"
                        >
                          ⋯
                        </button>
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Portal>
                        <DropdownMenu.Content className="dropdown-content" align="end">
                          <DropdownMenu.Item
                            className="dropdown-item"
                            onClick={() => handleEdit(post.postId)}
                          >
                            ✏️ Editar
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="dropdown-item delete"
                            onClick={() => openDeleteModal(post.postId)}
                          >
                            🗑️ Excluir
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                  )}
                </div>

                <a href={`/posts/${post.postId}`} className="post-content-link">
                  <p className="post-content">
                    {post.content.substring(0, 400)}
                    {post.content.length > 400 && "..."}
                  </p>
                </a>
              </article>
            ))
          )}
        </div>
      </main>

      {/* RADIX ALERT DIALOG - CONFIRMAÇÃO DE EXCLUSÃO */}
      <AlertDialog.Root open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="alert-overlay" />
          <AlertDialog.Content className="alert-content">
            <AlertDialog.Title className="alert-title">
              Confirmar Exclusão
            </AlertDialog.Title>
            <AlertDialog.Description className="alert-description">
              Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
            </AlertDialog.Description>

            <div className="alert-buttons">
              <AlertDialog.Cancel asChild>
                <button 
                  className="button button-secondary"
                  disabled={isDeleting}
                >
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button 
                  className="button button-danger"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Feed;