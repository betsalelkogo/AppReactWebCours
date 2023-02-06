import apiClient from "./ClientApi";

const login = async (email: string, password: string) => {
  return apiClient.get("/auth/login", { email, password });
};
const register = async (name: string, email: string, password: string) => {
  return apiClient.post("/auth/register", { name, email, password });
};

const logout = async () => {
  return apiClient.post("/auth/logout");
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
