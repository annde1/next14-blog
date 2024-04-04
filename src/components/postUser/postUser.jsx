import styles from "./postUser.module.css";
import Image from "next/image";
import { getUser } from "@/lib/data";
const getData = async (id) => {
  const res = await fetch(` https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
};
const PostUser = async ({ userId }) => {
  const userData = await getUser(userId);
  console.log(userData);
  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        width={50}
        height={50}
        src={userData?.img ? userData.img : "/noavatar.png"}
        alt=""
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{userData?.userName}</span>
      </div>
    </div>
  );
};
export default PostUser;
//the post will be fetched first and only then the user details (because we split fetching the data into two different components). That's why we should use some loading indicator
