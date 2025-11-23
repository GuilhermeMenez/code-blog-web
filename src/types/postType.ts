import { Comments } from "./commentsType"

export interface Post {
    postId: string,
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


export interface EditPost {
    title: string;
    content: string;
    authorId: string;
    userId: string;
    postId: string;
}

export interface CreatePost {
    title: string;
    content: string;
    authorId: string;
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

