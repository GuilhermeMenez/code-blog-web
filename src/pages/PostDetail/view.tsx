import { useParams, useNavigate } from 'react-router-dom'
import { usePosts } from '@/hooks/usePosts'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState, useRef } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// import './style.css';

const PostDetail = () => {
  const { id } = useParams()
  const { post, handleFetchPostById, handleDeletePost } = usePosts()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    if (id && !hasLoadedRef.current) {
      handleFetchPostById(id)
      hasLoadedRef.current = true
    }
  }, [id])

  useEffect(() => {
    hasLoadedRef.current = false
  }, [id])

  const deletePost = async () => {
    if (!post?.postId) return
    try {
      await handleDeletePost(post.postId)
      setShowDeleteModal(false)
      navigate('/feed')
    } catch (error) {
      alert('Erro ao excluir post. Tente novamente.')
    }
  }

  const isMyPost = () => {
    if (!post || !user) return false
    return post.userId === user.id || post.author.id === user.id
  }

  if (!post)
    return (
      <div className="loading-container">
        <p className="loading-text">Carregando post...</p>
      </div>
    )

  return (
    <div className="post-detail-layout">
      {/* HEADER */}
      <header className="post-detail-header">
        <div className="header-content">
          <a href="/feed" className="header-logo">
            MyCodeBlog
          </a>
          <div className="header-actions">
            <a href="/newpost" className="action-button primary">
              + Novo Post
            </a>

            {isMyPost() && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="action-button secondary" aria-label="Menu">
                    ⋮
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="dropdown-content" align="end">
                    <DropdownMenu.Item
                      className="dropdown-item"
                      onClick={() => navigate(`/posts/edit/${post.postId}`)}
                    >
                      ✏️ Editar
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="dropdown-item delete"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      🗑️ Excluir
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="post-detail-main">
        <div className="post-detail-container">
          {/* BREADCRUMB */}
          <nav className="breadcrumb-nav" aria-label="breadcrumb">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a href="/feed">Feed</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* POST CARD */}
          <article className="post-detail-card">
            <div className="post-detail-header-section">
              <div>
                <h1 className="post-detail-title">{post.title}</h1>
                <div className="post-detail-meta">
                  <p className="post-detail-author">{post.author.name}</p>
                  <time className="post-detail-date">
                    {new Date(post.createdAt).toLocaleString('pt-BR')}
                  </time>
                </div>
              </div>
            </div>

            <div className="post-detail-divider"></div>

            <div className="post-detail-content">
              <p>{post.content}</p>
            </div>
          </article>
        </div>
      </main>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h2 className="modal-title">Confirmar Exclusão</h2>
              <p className="modal-text">
                Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
              </p>
              <div className="modal-buttons">
                <button
                  className="button button-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button className="button button-danger" onClick={deletePost}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetail
