import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postService } from "@/services/postService";
import "./feed.css";

const Feed = () => {
const { user } = useAuth();
const { posts, handleFetchAllPosts, setPosts } = usePosts();
const navigate = useNavigate();
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [postToDelete, setPostToDelete] = useState<string | null>(null);
const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handleFetchAllPosts(user?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    const isMyPost = (post: typeof posts[0]) => {
        return post.userId === user?.id || post.author.id === user?.id;
    };

    const openDeleteModal = (postId: string) => {
        setPostToDelete(postId);
        setShowDeleteModal(true);
        setOpenDropdown(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setPostToDelete(null);
    };

    const confirmDelete = async () => {
        if (!postToDelete) return;
        
        try {
            await postService.deletePost(postToDelete);
            setPosts(posts.filter(post => post.postId !== postToDelete));
            closeDeleteModal();
        } catch (error) {
            console.error("Erro ao excluir post:", error);
            alert("Erro ao excluir post. Tente novamente.");
            closeDeleteModal();
        }
    };

    const handleEdit = (postId: string) => {
        navigate(`/posts/edit/${postId}`);
        setOpenDropdown(null);
    };

    const toggleDropdown = (postId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenDropdown(openDropdown === postId ? null : postId);
    };
  
    return (
        <>
            <header className="container-fluid px-0 mb-4">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
                    <a href="/posts" className="navbar-brand mb-0 h1 fw-bold">MyCodeBlog</a>
                    <a href="/newpost" className="btn btn-primary">Novo Post</a>
                </nav>
            </header>

            <section>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Posts</li>
                        </ol>
                    </nav>
                    <div className="row w-60 mx-auto">
                        {posts?.map((post) => (
                            <div className="col-12 mb-4" key={post.postId}>
                                <div className="card shadow-sm bg-white rounded text-start h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h4 className="card-title fw-bold text-dark mb-0">{post.title}</h4>
                                            {isMyPost(post) && (
                                                <div className="dropdown" ref={openDropdown === post.postId ? dropdownRef : null}>
                                                    <button
                                                        className="btn btn-link text-dark p-0"
                                                        type="button"
                                                        id={`dropdownMenuButton-${post.postId}`}
                                                        onClick={(e) => toggleDropdown(post.postId, e)}
                                                        style={{ fontSize: '1.2rem', lineHeight: '1', cursor: 'pointer' }}
                                                    >
                                                        ⋯
                                                    </button>
                                                    {openDropdown === post.postId && (
                                                        <div 
                                                            className="dropdown-menu show" 
                                                            style={{ position: 'absolute', right: 0, top: '100%', zIndex: 1000, minWidth: '120px' }}
                                                        >
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => handleEdit(post.postId)}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                className="dropdown-item text-danger"
                                                                onClick={() => openDeleteModal(post.postId)}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="card-subtitle text-muted mb-2">
                                            <p className="mb-1">{post.author.name}</p>
                                            <span>{new Date(post.createdAt).toLocaleString()}</span>
                                        </div>
                                        <a href={`/posts/${post.postId}`} className="text-decoration-none text-dark">
                                        <p className="card-text text-dark">
                                            {post.content.substring(0, 400)}
                                                {post.content.length > 400 && "..."}
                                        </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal de Confirmação de Exclusão */}
            {showDeleteModal && (
                <div 
                    className="modal show d-block" 
                    tabIndex={-1}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onClick={closeDeleteModal}
                >
                    <div 
                        className="modal-dialog modal-dialog-centered"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar Exclusão</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={closeDeleteModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={closeDeleteModal}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    onClick={confirmDelete}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
  

export default Feed;