import styles from './Career.module.css';
import Image from 'next/image';
import geeksalon from './images/geeksalon.png';
import gmo from './images/gmo.png';

export default function Career() {
  const careers = [
    {
      icon: geeksalon,
      alt: 'GeekSalon',
      period: '2021/06 ~ 2023/04',
      company: 'GeekSalon',
      role: '大学生に向けてWebアプリ開発の支援、マーケティング、メンターの採用・育成業務に従事',
      tags: ['#長期インターン', '#Mrk', '#Programming', '#HR'],
    },
    {
      icon: gmo,
      alt: 'GMOインターネットグループ株式会社',
      period: '2024/04 ~ 2024/12',
      company: 'GMOインターネットグループ株式会社',
      role: 'Webアプリケーションエンジニアとして新卒入社\n自社サービスの開発・運用に携わる',
      tags: ['#WebDevelopment'],
    },
    {
      icon: gmo,
      alt: 'GMOインターネット株式会社',
      period: '2025/01~',
      company: 'GMOインターネット株式会社',
      role: '事業承継に伴い転籍。引き続き自社サービスの開発・運用に従事\nエンジニアの新卒採用や九州大学での講義の業務も担当',
      tags: ['#WebDevelopment', '#HR', '#Education'],
      articles: [
        {
          title: 'エンジニアが学生と向き合う理由。採用の現場で見えてきたこと',
          href: 'https://note.recruit.internet.gmo/n/nf5cc4aa4416b',
          source: 'GMOインターネット 採用公式note',
          image:
            'https://assets.st-note.com/production/uploads/images/282730047/rectangle_large_type_2_f3d4594c821909cd2e2da2cd6b2dbf2f.png?fit=bounds&quality=85&width=1280',
          imageAlt: 'note記事の見出し画像',
        },
      ],
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
              <h3 className={styles.careerCompany}>{career.company}</h3>
              <span>{career.period}</span>
              <div className={styles.careerRole}>{career.role}</div>
              {career.articles ? (
                <details className={styles.careerArticles}>
                  <summary className={styles.articleToggle}>
                    <span className={styles.articleToggleIcon} aria-hidden="true">
                      &gt;
                    </span>
                    <span>Related Articles</span>
                  </summary>
                  <div className={styles.articlePreviews}>
                    {career.articles.map((article) => (
                      <a
                        className={styles.articlePreview}
                        href={article.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={article.href}
                      >
                        <span className={styles.articleImageWrap}>
                          <Image
                            src={article.image}
                            alt={article.imageAlt}
                            fill
                            sizes="(max-width: 600px) 100vw, 420px"
                            className={styles.articleImage}
                          />
                        </span>
                        <span className={styles.articleText}>
                          <span className={styles.articleSource}>
                            {article.source}
                          </span>
                          <span className={styles.articleTitle}>
                            {article.title}
                          </span>
                          <span className={styles.articleAction}>
                            Read Article
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                </details>
              ) : null}
              <div className={styles.careerTags}>
                {career.tags.map((tag, i) => (
                  <span className={styles.careerTag} key={i}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
