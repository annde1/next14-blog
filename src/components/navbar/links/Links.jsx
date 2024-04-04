"use client";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";
import Image from "next/image";
import { handleLogout } from "@/lib/actions";

const links = [
  { title: "Homepage", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

//TEMP
// const session = true;
const admin = true;
const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link, index) => (
          <NavLink key={index} item={link} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link, index) => (
            <NavLink key={index} item={link} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Links;
