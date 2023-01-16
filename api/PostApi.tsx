import apiClient from "./ClientApi";
import { Post } from "../model/PostModel";

const getAllPosts = async () => {
  return apiClient.get("/student");
};

const addPost = async (postJson: any) => {
  return apiClient.post("/student", postJson);
};

const uploadImage = async (image: any) => {
  return apiClient.post("/file", image);
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
};
