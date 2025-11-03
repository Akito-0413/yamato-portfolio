import Image from 'next/image';
import styles from './Profile.module.css';
import Link from 'next/link';
import profileImg from './images/profile-yamato.jpg';
import xLogo from './images/x-logo.png';
import zennLogo from './images/zenn-logo.svg';
import ExternalLink from '../../ui/Link/ExternalLink';

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <Image
        src={profileImg}
        alt="Profile Picture"
        width={200}
        height={200}
        className={styles.profileImage}
      />
      <div className={styles.snsLinks}>
        <ExternalLink
          href="https://x.com/touka_change"
          className={styles.snsIcon}
        >
          <Image src={xLogo} alt="X (Twitter)" width={45} height={45} />
        </ExternalLink>
        <ExternalLink href="https://zenn.dev/yama14" className={styles.snsIcon}>
          <Image src={zennLogo} alt="Zenn" width={45} height={45} />
        </ExternalLink>
      </div>
      <div className={styles.profileDescription}>
        ソフトウェアエンジニアとして
        <br />
        Webアプリのフロントエンドからバックエンドまで一貫して開発を行っています。
        <br />
        <br />
        アーキテクチャ設計やユーザビリティの向上に加え
        <br />
        組織のブランド価値を高める取り組みにも関心を持っています。
        <br />
        <br />
        ホスピタリティを軸に
        <br />
        <strong>ユーザーの操作体験・エンジニアの開発体験の向上</strong>
        <br />
        <strong>
          一緒に働く仲間がやりがいを感じ、持てる力を存分に発揮できる環境作り
        </strong>
        <br />
        この2点を意識して日々の業務に取り組んでいます。
        <br />
        <br />
        お仕事に関する相談は、
        <Link href="#contact" className="text-black">
          お問い合わせフォーム
        </Link>
        からお気軽にご連絡ください。
      </div>
    </div>
  );
}
