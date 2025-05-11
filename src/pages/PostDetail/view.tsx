import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../../types";
import { postService } from "../../services/postService";


const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);


    useEffect(() => {
        const fetchPost = async () => {
            const fetchedPost = await postService.getPostByid(id!);
            if (fetchedPost)
                setPost(fetchedPost);
        };

        fetchPost();
    }, [id]);

    if (!post) return <p>Carregando post...</p>;

    return (
        <div>
            <header className="container-fluid px-0 mb-5">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
                    <a href="/posts" className="navbar-brand mb-0 h1 fw-bold">MyCodeBlog</a>
                    <div className="d-flex gap-2">
                        <a href="/newpost" className="btn btn-primary">Novo Post</a>
                        <a href={`/posts/edit/${post.id}`} className="btn btn-primary">Editar</a>
                        <button type="button" className="btn btn-secondary">Apagar</button>
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
                            <h4 className="card-title fw-bold text-dark">{post.titulo}</h4>
                            <div className="card-subtitle text-muted mb-2">
                                <p className="mb-1">{post.autor}</p>
                                <span>{post.data.toLocaleString()}</span>
                            </div>
                            <p className="card-text text-dark">
                                {post.texto}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;