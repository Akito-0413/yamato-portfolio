import styles from "./Career.module.css";
import Image from "next/image";

export default function Career() {
  const careers = [
    {
      icon: "/geeksalon.png",
      alt: "GeekSalon",
      period: "2021/06 ~ 2023/04",
      company: "GeekSalon",
      role: "Webサービス開発コースにメンターとしてジョイン\n大学生に向けてWebアプリケーション開発の支援、マーケティング、メンターの採用・育成業務に従事",
      tags: ["#長期インターン", "#Mrk", "#Programming", "#HR"],
    },
    {
      icon: "/gmo.png",
      alt: "GMOインターネットグループ株式会社",
      period: "2024/04 ~ 2024/12",
      company: "GMOインターネットグループ株式会社",
      role: "Webアプリケーションエンジニアとして新卒入社\n社内外システムの開発・運用に携わる",
      tags: ["#WebDevelopment"],
    },
    {
      icon: "/gmo.png",
      alt: "GMOインターネット株式会社",
      period: "2025/01~",
      company: "GMOインターネット株式会社",
      role: "事業承継に伴い転籍。引き続きWebアプリケーションの開発・運用に従事\nエンジニアの新卒採用や九州大学での講義の業務も担当",
      tags: ["#WebDevelopment", "#HR"],
    },
  ];

  return (
    <section className={styles.careerSection} id="career">
      <h2 className={styles.careerTitle}>Career</h2>
      <ul className={styles.careerList}>
        {careers.map((career, idx) => (
          <li className={styles.careerItem} key={idx}>
            <div className={styles.careerIconArea}>
              <Image
                src={career.icon}
                alt={career.alt}
                width={96}
                height={96}
                className={styles.careerIcon}
              />
            </div>
            <div className={styles.careerContent}>
              <div>
                <span>{career.period}</span>
                <h3 className={styles.careerCompany}>{career.company}</h3>
                <div className={styles.careerRole}>{career.role}</div>
                <div className={styles.careerTags}>
                  {career.tags.map((tag, i) => (
                    <span className={styles.careerTag} key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
