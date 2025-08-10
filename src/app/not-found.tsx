import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404エラー</h1>
      <h2>ページが見つかりません</h2>
      <p>お探しのページは存在しないか、移動された可能性があります。</p>
      <Link href="/">
        <button
          style={{
            color: "white",
            backgroundColor: "#0f0f0f",
            textDecoration: "underline",
            border: "none",
            cursor: "pointer",
          }}
        >
          ホーム画面に戻る
        </button>
      </Link>
    </div>
  );
}
