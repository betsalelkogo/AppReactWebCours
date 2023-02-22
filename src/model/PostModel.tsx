import PostApi from "../api/PostApi";

export type Post = {
  _id: String;
  text: String;
  userId: String;
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
        text: obj.text,
        _id: obj._id,
        userId: obj.userId,
        image: obj.avatarUrl,
      };
      data.push(pt);
    });
  }
  return data;
};

const getPostById = async (podtId: String) => {
  console.log("getPostById()" + podtId);
  const res: any = await PostApi.getPostById(podtId);
  if (res.data) {
    const p: Post = {
      text: res.data.text,
      _id: res.data._id,
      userId: res.data.userId,
      image: res.data.avatarUrl,
    };
    return p;
  }
  return undefined;
};

const addPost = async (post: Post) => {
  console.log("addPost");
  const data = {
    text: post.text,
    userId: post.userId,
    image: post.image,
    _id: " ",
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
export default { getAllPosts, addPost, uploadImage, getPostById };
