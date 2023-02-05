import apiClient from "./ClientApi";

const login = async () => {
  return apiClient.get("/login");
};
const register = async () => {
  return apiClient.get("/register");
};

const logout = async () => {
  return apiClient.post("/logout");
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  logout,
  register,
  uploadImage,
  login,
};
