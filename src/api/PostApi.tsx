import { Post, iEditPost } from "../utils/types/@Post";
import apiClient from "./ClientApi";
import FormData from "form-data";

const getAllPosts = async () => {
  return apiClient.get(`/post`);
};

const getPostById = async (postId: string) => {
  return apiClient.get(`/post/${postId}`);
};

const addPost = async (newPost: Post) => {
  return apiClient.post(`/post/`, newPost);
};

const editPost = async (postId: string, editedPost: iEditPost) => {
  return apiClient.put(`/post/${postId}`, editedPost);
};

const uploadImage = async (
  imageURI: string,
  id: string
): Promise<false | string> => {
  const image = new FormData();
  image.append("file", { name: "name", type: "image/jpeg", uri: imageURI });

  try {
    const res = await apiClient.post(`/file/upload/${id}`, image);
    if (!res.ok) {
      return false;
    } else {
      if (res.data) {
        const data: any = res.data;
        return data.url as string;
      }
    }
  } catch (err) {
    "save failed " + err;
    return false;
  }

  return false;
};

export default {
  getAllPosts,
  addPost,
  uploadImage,
  getPostById,
  editPost,
};
