import { useNavigate } from 'react-router';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/hooks/useAuth';
import { FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import './style.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const { handleCreatePost } = usePosts();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) {
      setError('Você precisa estar logado para criar um post!');
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

    if (!Cookies.get('token')) {
      setError('Token de autenticação não encontrado!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await handleCreatePost({
        title: title.trim(),
        content: content.trim(),
        authorId: user.id,
      });

      navigate('/feed');
    } catch (error) {
      setError('Erro ao criar post. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm('Você tem alterações não salvas. Deseja descartar?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="create-post-layout">
      {/* HEADER */}
      <header className="create-header">
        <div className="header-content">
          <a href="/feed" className="header-logo">
            MyCodeBlog
          </a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="create-main">
        <div className="create-container">
          <div className="create-header-section">
            <h1 className="create-title">Criar Novo Post</h1>
            <p className="create-subtitle">
              Compartilhe suas ideias e conhecimentos com a comunidade
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="create-form">
            {/* TITLE INPUT */}
            <div className="form-group">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-input"
                placeholder="Digite um título atraente para seu post"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
              <span className="form-hint">{title.length}/100 caracteres</span>
            </div>

            {/* CONTENT TEXTAREA */}
            <div className="form-group">
              <label className="form-label">Conteúdo</label>
              <textarea
                className="form-textarea"
                placeholder="Digite o conteúdo do seu post aqui..."
                rows={12}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
              ></textarea>
              <span className="form-hint">{content.length}/5000 caracteres</span>
            </div>

            {/* REQUIRED FIELDS NOTE */}
            <div className="required-note">
              <span className="required-icon">ℹ️</span>
              <span>Todos os campos marcados com * são obrigatórios</span>
            </div>

            {/* FORM ACTIONS */}
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button type="submit" className="button button-primary" disabled={isLoading}>
                {isLoading ? 'Publicando...' : 'Publicar Post'}
              </button>
            </div>
          </form>

          {/* TIPS SECTION */}
          <div className="create-tips">
            <h3 className="tips-title">💡 Dicas para um bom post</h3>
            <ul className="tips-list">
              <li>Crie um título claro e descritivo</li>
              <li>Organize seu conteúdo em parágrafos bem estruturados</li>
              <li>Use exemplos práticos e código quando relevante</li>
              <li>Revise ortografia e gramática antes de publicar</li>
              <li>Considere adicionar referências ou links úteis</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePost;
