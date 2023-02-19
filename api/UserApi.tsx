import apiClient from "./ClientApi";

const register = async (userJson: any) => {
  return apiClient.post("/auth/register", userJson);
};

const login = async (authJson: any) => {
  return apiClient.post("/auth/login", authJson);
};

const logout = async (refreshToken: any) => {
  return apiClient.get(
    "/auth/logout",
    {},
    { headers: { Authorization: "JWT " + refreshToken } }
  );
};

export default { register, login, logout };
