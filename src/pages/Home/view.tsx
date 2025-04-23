import { useEffect, useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../types";

const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await postService.getPosts();
            if (fetchedPosts)
                setPosts(fetchedPosts);
        };

        fetchPosts();
    }, []);
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {posts?.map((post) => (
                <div key={post.id}>
                    <h2>{post.titulo}</h2>
                    <p dangerouslySetInnerHTML={{ __html: post.texto }} />
                </div>
            ))}
        </div>
    );

}
export default Posts;


