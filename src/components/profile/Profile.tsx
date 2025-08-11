import Image from "next/image";
import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <Image
        src="/profile-yamato.jpg"
        alt="Profile Picture"
        width={200}
        height={200}
        className={styles.profileImage}
      />
      <h2 className={styles.profileName}>YamaTo</h2>
      <div className={styles.profileDescription}>
        ソフトウェアエンジニアとして
        <br />
        Webアプリのフロントエンドからバックエンドまで一貫して開発を行っています。
        <br />
        <br />
        アーキテクチャ設計やアクセシビリティの向上に加え
        <br />
        組織のブランド価値を高める取り組みにも関心を持っています。
        <br />
        <br />
        <strong>
          「<u>ホスピタリティを持ったエンジニア</u>」
        </strong>
        を目指して、ユーザーに最高の体験を提供することはもちろん
        <br />
        一緒に働く仲間がやりがいを感じ、持てる力を存分に発揮できる環境づくりにも力を注いでいます。
        <br />
        <br />
        日々の出来事に一喜一憂せず、振り返りを通じて学びを蓄積し
        <br />
        「どうすればもっと良くできるか」を常に考えながら行動しています。
      </div>
    </div>
  );
}
