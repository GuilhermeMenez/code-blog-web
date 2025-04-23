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
            <h1>{post.titulo}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.texto }} />
            <p><strong>Autor:</strong> {post.autor}</p>
            <p><strong>Data:</strong> {post.data.toLocaleString()}</p>
        </div>
    );
};

export default PostDetail;