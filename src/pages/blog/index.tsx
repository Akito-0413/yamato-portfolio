import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import styles from "./BlogIndex.module.css";

type PostItem = {
  id: string;
  title: string;
  date: string;
  excerpt?: string | null;
  url: string;
  source: "Portfolio" | "Qiita" | "Zenn";
  external: boolean;
};

type QiitaItem = {
  id: string;
  title: string;
  updated_at?: string;
  created_at?: string;
  rendered_body?: string | null;
  body?: string | null;
  url: string;
};

async function fetchQiitaItems(username?: string): Promise<PostItem[]> {
  if (!username) return [];
  try {
    const res = await fetch(
      `https://qiita.com/api/v2/users/${encodeURIComponent(
        username
      )}/items?page=1&per_page=20`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data: QiitaItem[] = await res.json();
    return data.map((it) => ({
      id: `qiita_${it.id}`,
      title: it.title ?? "(no title)",
      date: it.updated_at ?? it.created_at ?? "1970-01-01",
      excerpt: it.rendered_body ? null : it.body?.slice(0, 140) ?? null,
      url: it.url,
      source: "Qiita",
      external: true,
    }));
  } catch {
    return [];
  }
}

function extractTag(text: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

function stripCdata(s: string) {
  let t = s.trim();

  if (t.startsWith("<![CDATA[") && t.endsWith("]]>")) {
    t = t.slice("<![CDATA[".length, -3);
  }

  t = t.replace("<![CDATA[", "").replace("]]>", "");
  return t.trim();
}

function parseZennRSS(xml: string): PostItem[] {
  const items = xml
    .split(/<item>/i)
    .slice(1)
    .map((chunk) => "<item>" + chunk);
  return items.map((item, idx) => {
    const rawTitle = extractTag(item, "title") ?? "(no title)";
    const title = stripCdata(rawTitle);
    const link = extractTag(item, "link") ?? "";
    const pubDate = extractTag(item, "pubDate") ?? "1970-01-01";
    const iso = new Date(pubDate).toISOString();
    return {
      id: `zenn_${idx}_${link}`,
      title,
      date: iso,
      excerpt: null,
      url: link,
      source: "Zenn" as const,
      external: true,
    };
  });
}

async function fetchZennItems(username?: string): Promise<PostItem[]> {
  if (!username) return [];
  try {
    const res = await fetch(
      `https://zenn.dev/${encodeURIComponent(username)}/feed`,
      {
        headers: { Accept: "application/rss+xml" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const xml = await res.text();
    return parseZennRSS(xml);
  } catch {
    return [];
  }
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
    : [];

  const localPosts: PostItem[] = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);

    const firstParagraph =
      content
        .trim()
        .split(/\n\s*\n/)[0]
        ?.replace(/\n/g, " ")
        .slice(0, 140) ?? "";

    return {
      id: `local_${slug}`,
      title: data.title ?? slug,
      date: data.date ?? "1970-01-01",
      excerpt: data.excerpt ?? firstParagraph ?? null,
      url: `/blog/${slug}`,
      source: "Portfolio" as const,
      external: false,
    };
  });

  const [qiitaPosts, zennPosts] = await Promise.all([
    fetchQiitaItems(process.env.QIITA_USER),
    fetchZennItems(process.env.ZENN_USER),
  ]);

  const all = [...localPosts, ...qiitaPosts, ...zennPosts];

  all.sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    props: { posts: all },
    revalidate: 3600,
  };
}

export default function BlogIndex({ posts }: { posts: PostItem[] }) {
  const fmt = (d: string) =>
    new Intl.DateTimeFormat("ja-JP", { dateStyle: "medium" }).format(
      new Date(d)
    );

  const badgeClass = (src: PostItem["source"]) =>
    src === "Qiita"
      ? `${styles.badge} ${styles.badgeQiita}`
      : src === "Zenn"
      ? `${styles.badge} ${styles.badgeZenn}`
      : `${styles.badge} ${styles.badgeLocal}`;

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
          <li key={p.id} className={styles.card}>
            {p.external ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.date}>
                  最終更新日：{fmt(p.date)}{" "}
                  <span className={badgeClass(p.source)}>{p.source}</span>
                </p>
                {p.excerpt && <p className={styles.excerpt}>{p.excerpt}…</p>}
                <span className={styles.more}>外部サイトで読む →</span>
              </a>
            ) : (
              <Link href={p.url} className={styles.cardLink}>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.date}>
                  最終更新日：{fmt(p.date)}{" "}
                  <span className={badgeClass(p.source)}>{p.source}</span>
                </p>
                {p.excerpt && <p className={styles.excerpt}>{p.excerpt}…</p>}
                <span className={styles.more}>続きを読む →</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
