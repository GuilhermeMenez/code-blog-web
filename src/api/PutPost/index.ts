import { api } from "../_core/axios";
import { Post } from "../../types";

const putPost = async (id: string, updatedPost: Post): Promise<Post> => {
    const response = await api.put<Post>(`/posts/edit/${id}`, updatedPost)
    return response.data
};

export default putPost