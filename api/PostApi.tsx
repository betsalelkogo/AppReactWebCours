import apiClient from "./ClientApi";
import { Post } from "../model/PostModel";

const getAllPosts = async () => {
  return apiClient.get("/post");
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
};
