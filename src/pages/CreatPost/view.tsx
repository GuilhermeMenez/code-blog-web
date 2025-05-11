import { postRequest } from "../../api/GetPosts/interfaces/request";
import { postService } from "../../services/postService";
import { useNavigate } from "react-router-dom";



const CreatPost = () => {
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newPost: postRequest = {
            titulo: formData.get("titulo") as string,
            autor: formData.get("autor") as string,
            texto: formData.get("texto") as string,
            data: new Date().toLocaleDateString("pt-BR")
        };

        await postService.createPost(newPost);
        navigate("/posts");
    }

    function handleCancel() {
        navigate(-1);
    }
    return (
        <div>
            <header className="container-fluid px-0 mb-5">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between px-3">
                    <a href="/posts" className="navbar-brand mb-0 h1 fw-bold">MyCodeBlog</a>
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
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control bg-light text-dark"
                            name="autor"
                            placeholder="Autor *"
                            required
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
    )
}
export default CreatPost