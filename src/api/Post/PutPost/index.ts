import { api } from "../../_core/axios";
import { putPostRequest } from "./Interfaces/request";

const putPost = async (request: putPostRequest): Promise<void> => {
    const response = await api.put(`/posts/edit/${request.id}`, request.data);
    return response.data
};

export default putPost