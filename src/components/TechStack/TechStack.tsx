import Image from "next/image";
import styles from "./TechStack.module.css";

const techStack = [
  { name: "React", src: "/react-logo.png" },
  { name: "Vue", src: "/vue-logo.png" },
  { name: "Next.js", src: "/nextjs-logo.png" },
  { name: "TypeScript", src: "/typescript-logo.png" },
  { name: "Java", src: "/java-logo.png" },
  { name: "AWS", src: "/aws-logo.png" },
  { name: "SpringBoot", src: "/springboot-logo.png" },
  { name: "Dify", src: "/dify-logo.png" },
];

export default function TechStack() {
  return (
    <div className={styles.techstackContainer}>
      <div className={styles.techstackGrid}>
        {techStack.map((techstack) => (
          <div key={techstack.name} className={styles.techstachIcon}>
            <Image
              src={techstack.src}
              alt={`${techstack.name} logo`}
              width={80}
              height={80}
              className={styles.techstachImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
