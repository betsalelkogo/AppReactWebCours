import UserAPI from "../api/UserApi";

export type User = {
  name: String;
  email: String;
  username: String;
  password: String;
  //avatar: String
};

const register = async (user: User) => {
  const data = {
    name: user.name,
    email: user.email,
    username: user.username,
    password: user.password,
  };
  try {
    const res: any = await UserAPI.register(data);
    console.log(res);
    return res;
  } catch (err) {
    console.log("Register user failed" + err);
  }
};

const login = async (username: String, password: String) => {
  const data = {
    username: username,
    password: password,
  };
  try {
    const res: any = await UserAPI.login(data);
    console.log(res);
    return res;
  } catch (err) {
    console.log("Register user failed" + err);
  }
};

export default { register, login };
