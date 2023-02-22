import apiClient from "./ClientApi";
import { URL_PATHS } from "../utils/constants";

const getUser = async (userId: string) => {
  return apiClient.get(`/${URL_PATHS.user}/${userId}`);
};

const editUserInfo = async (userJson: any) => {
  return apiClient.post(`/${URL_PATHS.user}`, userJson);
};

const uploadUserImage = async (image: any) => {
  return apiClient.post(`/${URL_PATHS.file}/file`, image);
};

export default { getUser, editUserInfo, uploadUserImage };
