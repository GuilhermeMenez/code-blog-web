import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { useEffect } from "react";

const Feed = () => {
const { user } = useAuth();
const { posts, handleFetchAllPosts, } = usePosts();

    useEffect(() => {
        handleFetchAllPosts(user?.id)
    }, [user?.id])

  
    return (
        <div>
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
                                <a href={`/posts/${post.postId}`} className="card shadow-sm bg-white rounded text-start h-100">
                                    <div className="card-body">
                                        <h4 className="card-title fw-bold text-dark">{post.title}</h4>
                                        <div className="card-subtitle text-muted mb-2">
                                            <p className="mb-1">{post.author.name}</p>
                                            <span>{post.createdAt.toLocaleString()}</span>
                                        </div>
                                        <p className="card-text text-dark">
                                            {post.content.substring(0, 400)}
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
}
  

export default Feed;