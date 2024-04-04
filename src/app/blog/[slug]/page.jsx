import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";
//SERVER SIDE NAVIGATION

//HOW TO FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await fetch(` http://localhost:3000/api/blog/${slug}`);
  if (!res.ok) {
    console.log(res);
    throw new Error("Something went wrong");
  }
  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  console.log("SLUG", slug);
  const post = await getPost(slug);
  console.log("POST", post);
  return {
    title: post.title,
    description: post.description,
  };
}; //function for generating metadat for the post page
const SinglePostPage = async ({ params, searchParams }) => {
  //THIS IS A SS COMPONENT, WE ARE GOING TO FETCH THE DATA FROM A DB SO IT'S BETTER TO KEEP IT A SERVER SIDE COMPONTNT
  // console.log(params, searchParams); //slug
  // console.log(slug);
  const { slug } = params;
  const post = await getData(slug);
  console.log(post);
  console.log(post.userId);
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={post.img} height={600} width={370} alt="" />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          {/* <Image
            className={styles.avatar}
            width={50}
            height={50}
            src={post.img}
            alt=""
          /> */}
          {/* <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>Terry J.</span>
          </div> */}
          <div className={styles.detailText}>
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          </div>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>20.11.2023</span>
          </div>
          <div className={styles.content}>{post.description}</div>
        </div>
      </div>
    </div>
  );
};
export default SinglePostPage;
//Suspense - a component that enables declarative handling of loading states. Allows to specify fallback content to display while waiting for asynchronous data to load
