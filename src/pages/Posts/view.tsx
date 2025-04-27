import { useEffect, useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../types";

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await postService.getPosts();
            if (fetchedPosts) setPosts(fetchedPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <header className="container-fluid px-0 mb-4">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
                    <span className="navbar-brand mb-0 h1 fw-bold">MyCodeBlog</span>
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
                            <div className="col-12 mb-4" key={post.id}>
                                <a href={`/posts/${post.id}`} className="card shadow-sm bg-white rounded text-start h-100">
                                    <div className="card-body">
                                        <h4 className="card-title fw-bold text-dark">{post.titulo}</h4>
                                        <div className="card-subtitle text-muted mb-2">
                                            <p className="mb-1">{post.autor}</p>
                                            <span>{post.data.toLocaleString()}</span>
                                        </div>
                                        <p className="card-text text-dark">
                                            {post.texto.substring(0, 400)}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Posts;


