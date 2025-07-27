import Image from "next/image";
import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileName}>YamaTo</h1>
      <h2 className={styles.profileJob}>Software Developer</h2>
      <Image
        src="/profile-yamato.jpg"
        alt="Profile Picture"
        width={150}
        height={150}
        className={styles.profileImage}
      />
      <div className={styles.profileDescription}>
        I’m a software developer at GMO Internet, Inc.
        <br />
        Right now, I’m working on frontend web development.
      </div>
    </div>
  );
}
