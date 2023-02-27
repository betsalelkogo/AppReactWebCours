import apiClient from "./ClientApi";
import { iEditUser } from "../utils/types/@User";
const getUser = async (userId: string) => {
  return apiClient.get("/user/" + userId);
};

const editUserInfo = async (userId: string, userData: iEditUser) => {
  return apiClient.post(`/user/edit-user/${userId}`, userData);
};

const uploadUserImage = async (image: FormData) => {
  return apiClient.post(`/file/file`, image);
};

export default { getUser, editUserInfo, uploadUserImage };
