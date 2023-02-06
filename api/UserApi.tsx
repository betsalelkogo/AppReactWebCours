import apiClient from "./ClientApi";

const login = async (email: string, password: string) => {
  return apiClient.get("/login", { email, password });
};
const register = async (name: string, email: string, password: string) => {
  return apiClient.post("/register", { name, email, password });
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
