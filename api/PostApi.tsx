import apiClient from "./ClientApi";

const getAllPosts = async () => {
  return apiClient.get("/post");
};
const getPostById = async (podtId: String) => {
  return apiClient.get("/:id", podtId);
};

const addPost = async (postJson: any) => {
  return apiClient.post("/post", postJson);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getPostById,
};
