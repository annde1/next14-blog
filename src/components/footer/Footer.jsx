import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.logo}>lamadev</div>
        <div className={styles.text}>
          Lama creative thoughts agency © All rights reserved.
        </div>
      </div>
    </div>
  );
};
export default Footer;
