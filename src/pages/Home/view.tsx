import { useEffect, useState } from "react";
import { postService } from "../../services/postService";
import { Post } from "../../types";

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const loadPosts = async () => {
            const response = await postService.getPosts()
            if (response && Array.isArray(response)) {
                setPosts(response as Post[])
            }
        }
        loadPosts()
    }, []);
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
    );

}
export default Home;


