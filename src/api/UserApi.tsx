import apiClient from "./ClientApi";
import { URL_PATHS } from "../utils/constants";

const getUser = async (userId: string) => {
  return apiClient.get(`/user/${userId}`);
};

const editUserInfo = async (userJson: any) => {
  return apiClient.post(`/user`, userJson);
};

const uploadUserImage = async (image: any) => {
  return apiClient.post(`/file/file`, image);
};

export default { getUser, editUserInfo, uploadUserImage };
