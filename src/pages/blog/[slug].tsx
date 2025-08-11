import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import styles from "./BlogPost.module.css";

type Params = {
  slug: string;
};

type BlogPostProps = {
  title: string;
  date: string;
  content: string;
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("content/blog"));
  const paths = files.map((file) => ({
    params: { slug: file.replace(".md", "") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: Params }) {
  const filePath = path.join("content/blog", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    props: {
      title: data.title,
      date: data.date,
      content: htmlContent,
    },
  };
}

export default function BlogPost({ title, date, content }: BlogPostProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>最終更新日：{date}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className={styles.backWrapBottom}>
        <Link href="/blog" className={styles.backLink}>
          ← ブログ一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
