"use client";

import { useEffect, useState } from "react";

/**
 * 「あなたの現地時間 ⇄ 日本時間」をライブ表示するストリップ。
 * 時差を理解しているサービスであることを、コピーではなく体験で伝える。
 */
export default function JstClock({ lang = "ja" }: { lang?: "ja" | "en" }) {
  const [now, setNow] = useState<Date | null>(null);
  const [tz, setTz] = useState<string>("");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null; // SSR時は出さず、ハイドレーション後に表示

  const fmt = (timeZone?: string) =>
    new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    }).format(now);

  const local = fmt(undefined);
  const jst = fmt("Asia/Tokyo");

  return (
    <div className="tz-strip" role="status">
      <span className="dot" aria-hidden="true" />
      {lang === "ja" ? (
        <>
          <span>
            あなたの現地時間 <strong>{local}</strong>
            {tz && <small>（{tz}）</small>}
          </span>
          <span>
            日本時間 <strong>{jst}</strong>
          </span>
          <span>時差をふまえて日程を調整します</span>
        </>
      ) : (
        <>
          <span>
            Your local time <strong>{local}</strong>
            {tz && <small> ({tz})</small>}
          </span>
          <span>
            Japan time <strong>{jst}</strong>
          </span>
          <span>We schedule around your time zone</span>
        </>
      )}
    </div>
  );
}
