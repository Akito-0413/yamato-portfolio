import styles from './Qualifications.module.css';

const qualifications = [
  {
    title: 'AWS Certified Solutions Architect - Associate(SAA-C03)',
    date: '2026-03-20',
    status: 'Certified',
  },
  {
    title: 'AWS Certified Cloud Practitioner(CLF-C02)',
    date: '2025-09-27',
    status: 'Certified',
  },
  {
    title: 'JBA公認E級審判',
    date: '2025-05-01',
    status: 'Qualification',
  },
  {
    title: '普通自動車第一種運転免許',
    date: '2020-09-04',
    status: 'License',
  },
  {
    title: '実用英語技能検定2級',
    date: '2019-05-01',
    status: 'Passed',
  },
];

export default function Qualifications() {
  return (
    <section
      className={styles.qualificationsSection}
      id="qualifications"
      aria-labelledby="qualifications-title"
    >
      <h2 className={styles.qualificationsTitle} id="qualifications-title">
        Qualifications
      </h2>

      <div className={styles.qualificationsGrid}>
        {qualifications.map((qualification) => (
          <article
            className={styles.qualificationCard}
            key={qualification.title}
          >
            <div className={styles.cardHeader}>
              <span className={styles.status}>{qualification.status}</span>
              <time className={styles.date} dateTime={qualification.date}>
                {qualification.date}
              </time>
            </div>
            <h3 className={styles.name}>{qualification.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
