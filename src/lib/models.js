import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      // max: 20,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean, // corrected
      default: false, // not necessary for boolean type
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema); //if there User model already exists then reuse the existing one, else create new one
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema); //same for post, reuse or create
