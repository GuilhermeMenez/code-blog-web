import { api } from "../_core/axios"
import { Post } from "../../types"

const DeletePost = async (id: string): Promise<void> => {
    await api.delete<Post>(`/posts/${id}`)

}

export default DeletePost