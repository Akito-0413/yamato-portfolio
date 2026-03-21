import Image from 'next/image';
import styles from './TechStack.module.css';
import reactLogo from './images/react-logo.png';
import vueLogo from './images/vue-logo.png';
import nextLogo from './images/nextjs-logo.png';
import tsLogo from './images/typescript-logo.png';
import javaLogo from './images/java-logo.png';
import awsLogo from './images/aws-logo.png';
import springLogo from './images/springboot-logo.png';
import difyLogo from './images/dify-logo.png';

const techStack = [
  { name: 'React', src: reactLogo },
  { name: 'Vue', src: vueLogo },
  { name: 'Next.js', src: nextLogo },
  { name: 'TypeScript', src: tsLogo },
  { name: 'Java', src: javaLogo },
  { name: 'AWS', src: awsLogo },
  { name: 'SpringBoot', src: springLogo },
  { name: 'Dify', src: difyLogo },
];

export default function TechStack() {
  return (
    <section className={styles.techstackContainer} aria-labelledby="tech-stack">
      <div className={styles.techstackInner}>
        <h2 className={styles.heading} id="tech-stack">
          Technology Stack
        </h2>
        <div className={styles.techstackGrid}>
          {techStack.map((techstack, index) => (
            <div
              key={techstack.name}
              className={styles.techstachIcon}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Image
                src={techstack.src}
                alt={`${techstack.name} logo`}
                width={80}
                height={80}
                className={styles.techstachImage}
              />
              <span className={styles.name}>{techstack.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
