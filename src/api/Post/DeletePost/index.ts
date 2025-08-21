import { api } from "../../_core/axios"
import { DeletPostRequest } from "./interfaces/request";

const DeletePost = async (id: DeletPostRequest): Promise<void> => {
    await api.delete(`/posts/${id}`);

}

export default DeletePost