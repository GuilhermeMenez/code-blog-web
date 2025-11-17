import { useParams } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";


const PostDetail = () => {
    const { id } = useParams();
    const { post, handleFetchPostById, handleDeletePost  } = usePosts();
    const { user } = useAuth();

   useEffect(() => {
  if (id) {
    handleFetchPostById(id); 
  }
}, [id]);

    const deletePost = async () => {
        if (!post?.postId) return;
        await handleDeletePost(post.postId);
    }

    const isMyPost = () => {
        if (!post || !user) return false;
        return post.userId === user.id || post.author.id === user.id;
    };

    if (!post) return <p>Carregando post...</p>;

    return (
        <div>
            <header className="container-fluid px-0 mb-5">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
                    <a href="/posts" className="navbar-brand mb-0 h1 fw-bold">MyCodeBlog</a>
                    <div className="d-flex gap-2">
                        <a href="/newpost" className="btn btn-primary">Novo Post</a>
                        {isMyPost() && (
                            <>
                                <a href={`/posts/edit/${post.postId}`} className="btn btn-primary">Editar</a> 
                                <button type="button" className="btn btn-secondary" onClick={deletePost}>Apagar</button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active" aria-current="page">Posts</li>
                    </ol>
                </nav>
                <div className="row w-60 mx-auto">
                    <a className="card shadow-sm bg-white rounded text-start h-100">
                        <div className="card-body">
                            <h4 className="card-title fw-bold text-dark">{post.title}</h4>
                            <div className="card-subtitle text-muted mb-2">
                                <p className="mb-1">{post.author.name}</p>
                                <span>{post.createdAt.toLocaleString()}</span>
                            </div>
                            <p className="card-text text-dark">
                                {post.content}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;