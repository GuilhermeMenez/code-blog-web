import { useNavigate } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { FormEvent, useState } from "react";
import Cookies from 'js-cookie';

const CreatePost = () => {
    const navigate = useNavigate();
    const { handleCreatePost } = usePosts();
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(title, content, user?.id, Cookies.get("token"));

        if (!user?.id) {
            alert("Você precisa estar logado para criar um post!");
            return;
        }

        try {
            await handleCreatePost({title, content, authorId: user.id});

            console.log("Post criado com sucesso!");
            navigate("/posts");
        } catch (error) {
            console.error("Erro ao criar post:", error);
             console.log("Erro ao criar post. Tente novamente.");
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <header className="container-fluid px-0 mb-5">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
                    <a href="/posts" className="navbar-brand mb-0 h1 fw-bold">
                        MyCodeBlog
                    </a>
                </nav>
            </header>

            <div className="mb-2 w-60 mx-auto bg-white rounded shadow-sm p-4">
                <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control bg-light text-dark"
                            name="titulo"
                            placeholder="Título *"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <textarea
                            id="summernote"
                            className="form-control bg-light text-dark"
                            name="texto"
                            placeholder="Texto *"
                            rows={5}
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ resize: 'none' }}
                        ></textarea>
                    </div>

                    <small className="form-text text-muted mb-3 d-block">
                        (*) Campos obrigatórios
                    </small>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            Publicar
                        </button>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
