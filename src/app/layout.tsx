import Header from "../components/Header/Header";
import "../app/globals.css"; // グローバルCSSをインポート

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* ヘッダーを固定表示 */}
        <main>{children}</main> {/* 各ページのコンテンツ */}
      </body>
    </html>
  );
}
