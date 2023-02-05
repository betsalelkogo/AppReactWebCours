import apiClient from "../api/ClientApi";
import UserApi from "../api/UserApi";
import FormData from "form-data";

export type User = {
  id: String;
  name: String;
  email: String;
  password: String;
  imag: String;
};

const Login = async () => {
  console.log("Login()");
  const res: any = await UserApi.login();
  let us;
  if (res.data) {
    res.data;
    // console.log("element: " + obj._id)
    const user: User = {
      name: res.data.name,
      email: res.data.email,
      id: res.data._id,
      password: res.data.password,
      imag: res.data.avatarUrl,
    };
    us = user;
  }
  return us;
};

const uploadImage = async (imageURI: String) => {
  var body = new FormData();
  body.append("file", { name: "name", type: "image/jpeg", uri: imageURI });
  try {
    const res = await UserApi.uploadImage(body);
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
export default { Login, uploadImage };
