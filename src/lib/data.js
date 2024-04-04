// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];
// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";
export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find({});
    // console.log(posts);

    return posts;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getPost = async (id) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug: id });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}; //we didnt use here no store function so next js is not going to show changes if we add new post. Althought the changes wll be still visible cause we are in development mode, but if I will build tha application then I wont be able to see the changes immediately. We can tell next js that we added new post and it should update my page

export const getUser = async (id) => {
  noStore(); //because we are not using fetch we need to import non caching function
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
