import { Comments } from "./commentsType"

export interface Post {
    id: string,
    title: string,
    content: string,
    userId: string,
    author:{
       id: string,
       name: string
    },
    createdAt: string,
    comments: Comments[]
}



export interface PostContextType {
    post: Post | null;
    setPost: (post: Post | null) => void;

    posts: Post[];
    setPosts: (posts: Post[]) => void;

    selectedPost: Post | null;
    setSelectedPost: (post: Post | null) => void;
}


export interface PostProviderProps {
    children: React.ReactNode;
};


export interface editPost {
    title: string;
    content: string;
    authorId: string;
}