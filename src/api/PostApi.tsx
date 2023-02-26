import { iEditPost } from "../utils/types/@Post";
import apiClient from "./ClientApi";

const getAllPosts = async () => {
  return apiClient.get("/post");
};
const getPostById = async (postId: String) => {
  return apiClient.get("/post/" + postId, postId);
};

const addPost = async (postJson: any) => {
  return apiClient.post("/post", postJson);
};

const editPost = async (postId: string, editedPost: iEditPost) => {
  return apiClient.put("/post/" + postId, editedPost);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file/file", image);
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getPostById,
  editPost,
};
