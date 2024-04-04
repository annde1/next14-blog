"use server";
import { signOut, signIn } from "./auth";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
export const addPost = async (previousState, formData) => {
  //   "use server"; //this directive makes a function a server action. After this point whatever I do in this function is gonna run on the server. A function like this must be async. We can use server in each function (seperately) or on top of the file
  //   console.log(formData);
  //   const title = formData.get("title");
  //   const description = formData.get("description");
  //   const slug = formData.get("slug");
  //   const userId = formData.get("userId");
  const { title, description, slug, userId } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newPost = new Post({
      title,
      description,
      slug,
      userId,
    });
    await newPost.save();
    //revalidate path for updaing the blog page, cause in the getPosts function we didnt use no-store
    revalidatePath("/blog");
    revalidatePath("/admin");
    // console.log("Post saved to database");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDb();
    await Post.findByIdAndDelete(id);
    // console.log("POST DELETED FROM DATBASE");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (er) {
    console.log(err);
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDb();
    await Post.deleteMany({ userId: id }); //deleteing user's posts
    await User.findByIdAndDelete(id); //deleting the user
    console.log("User deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Failed to delete user!" };
  }
};

export const addUser = async (previousState, formData) => {
  //previousState for dispatching errors
  const { userName, email, password, img } = Object.fromEntries(formData);
  try {
    await connectToDb();
    const newUser = new User({ userName, email, password, img });
    await newUser.save();
    console.log("user saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Failed to create user" };
  }
};
export const handleGitHubLogin = async (e) => {
  await signIn("github");
};
export const handleLogout = async (e) => {
  await signOut();
};

export const register = async (previousState, formData) => {
  // console.log("beginning of register");
  const { userName, email, password, passwordRepeat, img } =
    Object.fromEntries(formData);
  // console.log(userName, email, password, passwordRepeat, img);
  if (password !== passwordRepeat) {
    // console.log("passwords do not match");
    return { error: "Passwords do not match" };
  }
  try {
    // console.log("connecting to db");
    await connectToDb();
    // console.log("db connected");
    const user = await User.findOne({ userName });
    if (user) {
      // console.log("user exists");
      return { error: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    // console.log("User saved to db");
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

export const login = async (prevState, formData) => {
  const { userName, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { userName, password, redirectTo: "/blog" });
    return { ok: true };
  } catch (err) {
    console.log(err);
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
