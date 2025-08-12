"use client";

import { useEffect } from "react";

export default function ScrollToContact({
  trigger,
  hash = "contact",
}: {
  trigger: boolean;
  hash?: string;
}) {
  useEffect(() => {
    if (!trigger) return;

    const newUrl = `${location.pathname}${location.search}#${hash}`;
    history.replaceState(null, "", newUrl);

    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [trigger, hash]);

  return null;
}
