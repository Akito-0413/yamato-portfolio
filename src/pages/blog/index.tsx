import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import styles from "./BlogIndex.module.css";

type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO(YYYY-MM-DD)想定
  excerpt?: string;
};

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const posts: PostMeta[] = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    // 先頭段落を抜粋に
    const firstParagraph =
      content
        .trim()
        .split(/\n\s*\n/)[0]
        ?.replace(/\n/g, " ")
        .slice(0, 140) ?? "";

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      excerpt: data.excerpt ?? firstParagraph,
    };
  });

  // 日付降順
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return { props: { posts } };
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const fmt = (d: string) =>
    new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(
      new Date(d)
    );

  return (
    <main className={styles.wrap}>
      <h1 className={styles.pageTitle}>Blog</h1>

      <div className={styles.backToTop}>
        <Link href="/" className={styles.backLink}>
          ← TOPページへ戻る
        </Link>
      </div>

      <ul className={styles.grid}>
        {posts.map((p) => (
          <li key={p.slug} className={styles.card}>
            <Link href={`/blog/${p.slug}`} className={styles.cardLink}>
              <h2 className={styles.title}>{p.title}</h2>
              <p className={styles.date}>最終更新日：{fmt(p.date)}</p>
              {p.excerpt && <p className={styles.excerpt}>{p.excerpt}…</p>}
              <span className={styles.more}>続きを読む →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
