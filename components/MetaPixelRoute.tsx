"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * クライアント側のルート遷移ごとに Meta Pixel の PageView を送信する。
 * ベースコード(meta-pixel-init)が初回ロード時の PageView を既に送るため、
 * 初回マウントはスキップし、2回目以降のパス変更でのみ発火させる。
 * これで /en → /en/blog → 各記事 などの SPA 遷移でも PageView が計上される。
 * パス名のみを参照し、クエリ等の個人情報は送らない。
 */
export default function MetaPixelRoute() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
