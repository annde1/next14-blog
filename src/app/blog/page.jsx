import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";
export const metadata = {
  title: "Blog Page",
  description: "Blog Page Description",
}; // best for seo
const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  }); //no-store cancels caching the data

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};
const Blog = async ({ searchParams }) => {
  const posts = await getData();
  // const posts = await getPosts(); //fetching data from an internal API
  console.log(posts);
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};
export default Blog;
//Whenever we are fetching data inside a component the component should be async
//next js caches the api responses, so if a client makes a request to an API route that has been previously accessed, next can serve the cached response instead of re-executing the api route. (Gonna load faster). If there is a need to cancel automatic caching we can use {cache: "no-store"}
//{next:{revalidate: 3600}} //refreshes the data every one hour
