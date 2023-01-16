import apiClient from "../api/ClientApi";
import PostApi from "../api/PostApi";
import FormData from "form-data";

export type Post = {
  id: String;
  title: String;
  detail: String;
  image: String;
};

const getAllPosts = async () => {
  console.log("getAllPosts()");
  const res: any = await PostApi.getAllPosts();
  let data = Array<Post>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      // console.log("element: " + obj._id)
      const pt: Post = {
        title: obj.title,
        detail: obj.deltail,
        id: obj._id,
        image: obj.avatarUrl,
      };
      data.push(pt);
    });
  }
  return data;
};

const addPost = async (post: Post) => {
  console.log("addPost");
  const data = {
    title: post.title,
    detail: post.detail,
    _id: post.id,
    avatarUrl: post.image,
  };
  try {
    const res = PostApi.addPost(data);
  } catch (err) {
    console.log("add post fail: " + err);
  }
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  try {
    const res = await PostApi.uploadImage(body);
    if (!res.ok) {
      console.log("save failed " + res.problem);
    } else {
      if (res.data) {
        const d: any = res.data;
        console.log("----= url:" + d.url);
        return d.url;
      }
    }
  } catch (err) {
    console.log("save failed " + err);
  }
  return "";
};
export default { getAllPosts, addPost, uploadImage };
