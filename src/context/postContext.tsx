import { createContext, useContext, useState } from "react";
import { Post, PostContextType, PostProviderProps } from "../types/postType";


// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext({} as PostContextType);

const PostProvider = ({ children }: PostProviderProps) => {
    const [post, setPost] = useState<Post | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    return (
        <PostContext.Provider
            value={{
                post,
                setPost,
                posts,
                setPosts,
                selectedPost,
                setSelectedPost
            }}
        >
            {children}
        </PostContext.Provider>
    )
}

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("PostProvider must be used within an PostContext");
    } return context;
}

export default PostProvider;