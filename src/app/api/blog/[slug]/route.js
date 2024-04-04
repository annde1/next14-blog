import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { Post } from "@/lib/models";
export const GET = async (request, { params }) => {
  //params must come after request
  try {
    const { slug } = params;
    await connectToDb();
    const post = await Post.findOne({ slug: slug });
    return NextResponse.json(post);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { slug } = params;
    await connectToDb();
    await Post.deleteOne({ slug: slug });
    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post");
  }
};
