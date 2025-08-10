import Image from "next/image";
import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <Image
        src="/profile-yamato.jpg"
        alt="Profile Picture"
        width={150}
        height={150}
        className={styles.profileImage}
      />
      <h2 className={styles.profileName}>YamaTo</h2>
      <div className={styles.profileDescription}>
        I’m a software developer at GMO Internet, Inc.
        <br />
        Currently, I’m working on frontend web development.
      </div>
    </div>
  );
}
