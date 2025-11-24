import { usePosts } from '@/hooks/usePosts';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { post, handleFetchPostById, handleUpdatePost } = usePosts();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch post apenas uma vez quando o ID mudar
  useEffect(() => {
    if (id) {
      handleFetchPostById(id);
    }
  }, [id]); // Apenas id como dependência

  // Atualizar os campos apenas quando o post muda e ainda não foi carregado
  useEffect(() => {
    if (post && !hasLoaded) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setHasLoaded(true);
    }
  }, [post, hasLoaded]); // post e hasLoaded como dependências

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    if (!user?.id) {
      setError('Você precisa estar logado para editar um post!');
      return;
    }

    if (!title.trim()) {
      setError('O título não pode estar vazio!');
      return;
    }

    if (!content.trim()) {
      setError('O conteúdo não pode estar vazio!');
      return;
    }

    setIsLoading(true);
    setError('');

    const updatedPost = {
      title: title.trim(),
      content: content.trim(),
      authorId: post.author?.id || '',
      userId: user.id,
      postId: post.postId,
    };

    try {
      await handleUpdatePost(updatedPost);
    } catch (error) {
      setError('Erro ao atualizar post. Tente novamente.');
      setIsLoading(false);
    }
  };

  if (!post)
    return (
      <div className="loading-container">
        <p className="loading-text">Carregando post...</p>
      </div>
    );

  return (
    <div className="edit-post-layout">
      {/* HEADER */}
      <header className="edit-header">
        <div className="header-content">
          <a href="/feed" className="header-logo">
            MyCodeBlog
          </a>
          <div className="header-actions">
            <a href="/newpost" className="action-button primary">
              + Novo Post
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="edit-main">
        <div className="edit-container">
          <div className="edit-header-section">
            <h1 className="edit-title">Editar Post</h1>
            <p className="edit-subtitle">Atualize o título e conteúdo do seu post</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="edit-form">
            {/* TITLE INPUT */}
            <div className="form-group">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título do post"
                required
              />
              <span className="form-hint">{title.length}/100 caracteres</span>
            </div>

            {/* CONTENT TEXTAREA */}
            <div className="form-group">
              <label className="form-label">Conteúdo</label>
              <textarea
                className="form-textarea"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo do seu post..."
                required
              />
              <span className="form-hint">{content.length}/5000 caracteres</span>
            </div>

            {/* FORM ACTIONS */}
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => navigate(`/posts/${post.postId}`)}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button type="submit" className="button button-primary" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>

          {/* TIPS */}
          <div className="edit-tips">
            <h3 className="tips-title">💡 Dicas</h3>
            <ul className="tips-list">
              <li>Mantenha o título conciso e descritivo</li>
              <li>Use parágrafos para melhor legibilidade</li>
              <li>Revise o conteúdo antes de salvar</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditPost;
