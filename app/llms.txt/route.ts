import { blogPosts } from "@/lib/blog-posts";
import { BLOG_POSTS, BLOG_PATH } from "@/lib/blog";
import { SITE_URL, PRISENESS_OFFICIAL_URL } from "@/lib/site";

// AI検索（ChatGPT / Perplexity / Gemini 等）向けのサイト要約。
// 記事データから自動生成されるので、記事を追加すると自動で更新される。
export const dynamic = "force-static";

export function GET() {
  const enSorted = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const jaSorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  const lines = [
    "# Priseness Online Exercise Support (海外在住者向けオンライン運動サポート)",
    "",
    "> Online exercise support in Japanese for Japanese speakers living abroad, provided by a physical therapist from Japan (Priseness, a rehabilitation-focused exercise gym in Sapporo, Japan). It is exercise guidance and self-care support. It is not a medical diagnosis or medical treatment and does not replace local medical providers or local physical therapists.",
    "",
    "## Key facts",
    "- Who it is for: Japanese speakers living abroad (mainly in their 40s-50s) and their families who want to talk about body concerns and exercise in Japanese.",
    "- Typical topics: low back pain, knee pain, hip discomfort, walking and fall-prevention concerns, exercise continuation after local healthcare visits, home exercise routines.",
    "- Language: sessions are held in Japanese.",
    "- Format: online video session via Google Meet; family members can join.",
    "- How to start: a free inquiry first (no payment at this stage). Scheduling is coordinated across time zones; payment guidance is given individually only after scheduling.",
    "- Therapist: Yutaka Kuriyagawa (栗谷川 豊), licensed physical therapist in Japan.",
    "- Safety: for severe pain, numbness, paralysis, sudden worsening symptoms, or pain after a fall, seek local medical care first.",
    `- Official site of the gym: ${PRISENESS_OFFICIAL_URL}`,
    "",
    "## Main pages",
    `- [日本語トップページ / Japanese home](${SITE_URL}/): service overview, plans and the free inquiry form (Japanese)`,
    `- [English home](${SITE_URL}/en): overview of online exercise support in Japanese (English)`,
    `- [日本語ブログ](${SITE_URL}/blog): articles in Japanese`,
    `- [English blog](${SITE_URL}${BLOG_PATH}): articles in English`,
    "",
    "## English articles",
    ...enSorted.map((p) => `- [${p.title}](${SITE_URL}${BLOG_PATH}/${p.slug}): ${p.description}`),
    "",
    "## 日本語の記事",
    ...jaSorted.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
