import Image from "next/image";
import styles from "./contact.module.css";

import dynamic from "next/dynamic";
// const HydrationTestNoSSR = dynamic(() => import("@/components/hydrationTest"), {
//   ssr: false,
// });
export const metadata = {
  title: "Contact Page",
  description: "Contact Description",
};
const Contact = () => {
  const a = Math.random();
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        {/* <HydrationTestNoSSR /> */}
        <div suppressHydrationWarning>{a}</div>

        <form action="" className={styles.form}>
          <input type="text" placeholder="Name and Surname" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};
export default Contact;
//even though we use useclient the initial render will be on the server side
// hydration problem when what's rendered on the client side doesnt match the html rendered on the server side (example: Math.Random()). Solution: useEffect hook to make sure our component runs on the client side or it's possible to disable ssr on specific components, as well as surpressHydrationWarning
//When a server sside component is wrapped by client side component it's still going to be a server side component
