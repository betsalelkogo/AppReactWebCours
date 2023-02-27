export interface Post {
  _id?: string;
  text: string;
  image?: string;
  userId?: string;
  owner?: PostOnwer;
  delete?: false;
}

export interface PostOnwer {
  name: string;
  email: string;
  avatarUrl: string;
  _id: string;
  delete?: false;
}

export interface iEditPost {
  text?: string;
  image?: string;
  delete?: true;
}
