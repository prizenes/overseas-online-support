// =============================================================
// 英語SEOブログの記事データ。記事の追加はこのファイルに足すだけ。
// 本文はセクション配列で持ち、/en/blog/[slug] が描画する。
// =============================================================

export type BlogSection = { h2: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  date: string; // ISO (YYYY-MM-DD)
  keywords: string[];
  intro: string[];
  sections: BlogSection[];
  related: string[]; // slugs
};

export const BLOG_PATH = "/en/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "japanese-speaking-exercise-support",
    title: "Japanese-Speaking Exercise Support for People Living Abroad",
    metaTitle:
      "Japanese-Speaking Exercise Support for People Living Abroad | Priseness",
    description:
      "Japanese-speaking exercise support for Japanese speakers living abroad. A physical therapist from Japan provides online exercise guidance in Japanese — start with a free inquiry.",
    category: "Getting Started",
    date: "2026-06-01",
    keywords: [
      "Japanese-speaking exercise support",
      "online exercise support in Japanese",
      "exercise support for Japanese living abroad",
    ],
    intro: [
      "Living abroad changes many things about daily life — including how you take care of your body. Many Japanese speakers living abroad tell us the same thing: explaining physical concerns in English is hard, and following exercise instructions in a second language is even harder.",
      "Japanese-speaking exercise support exists for exactly this situation. It is online exercise support in Japanese, provided by a licensed physical therapist from Japan, designed for Japanese speakers living abroad.",
    ],
    sections: [
      {
        h2: "What is Japanese-speaking exercise support?",
        paragraphs: [
          "It is a way to organize your physical concerns and your exercise direction in your own language. In an online session held in Japanese over Google Meet, a physical therapist from Japan listens to your situation, reviews how you move, and helps you find exercises and self-care routines you can continue at home.",
          "This is physical therapist-based exercise support, not a medical service. It does not replace local medical providers, and we encourage you to consult local medical providers when needed. What it adds is the comfort of discussing your body in Japanese, without translating symptoms or nuances into English.",
        ],
      },
      {
        h2: "Who is it for?",
        paragraphs: [
          "Exercise support for Japanese living abroad fits people who want to stay active but feel unsure where to start: those with low back, knee, or hip concerns, those who find local explanations hard to follow, families in Japan worried about a parent living overseas, and people who want to continue exercising after returning from a short stay in Japan.",
          "Sessions are scheduled around your time zone, and family members in Japan or abroad are welcome to join.",
        ],
      },
      {
        h2: "How it works",
        paragraphs: [
          "Everything starts with a free inquiry. You describe your situation through a short form, the physical therapist reviews whether the service fits, and the schedule is coordinated by email across time zones. Pricing guidance comes individually, only if you decide to book a session — there is no payment at the inquiry stage.",
          "After the session, exercise guidance in Japanese is shared by PDF or video so you can continue at home, with optional follow-up support for exercise continuation.",
        ],
      },
    ],
    related: [
      "japanese-physical-therapist-online",
      "low-back-pain-support-in-japanese",
    ],
  },
  {
    slug: "low-back-pain-support-in-japanese",
    title: "Low Back Pain Support in Japanese for People Living Abroad",
    metaTitle:
      "Low Back Pain Support in Japanese for People Living Abroad | Priseness",
    description:
      "Low back pain support in Japanese for Japanese speakers abroad. Online exercise guidance from a Japanese physical therapist helps you organize concerns and keep moving at home.",
    category: "Low Back Pain",
    date: "2026-06-04",
    keywords: [
      "low back pain support in Japanese",
      "online exercise guidance for back pain Japanese",
      "Japanese physical therapist online",
    ],
    intro: [
      "Low back concerns are one of the most common reasons Japanese speakers living abroad reach out to us. The pattern is familiar: discomfort appears, you are not sure whether exercising is a good idea, and discussing the details in English feels like a barrier.",
      "Low back pain support in Japanese gives you a place to sort this out in your own language, with a physical therapist from Japan, online.",
    ],
    sections: [
      {
        h2: "Why language matters for back concerns",
        paragraphs: [
          "Describing back discomfort involves nuance — when it appears, what movements feel uneasy, how your daily life is set up. These details shape what kind of exercise is realistic for you. In a session held in Japanese, you can explain them naturally, and the guidance you receive is easier to actually follow at home.",
          "If you have already seen a local provider, the session can also help you organize what was explained to you and think through how to continue exercising afterwards. This service works alongside local care, not instead of it.",
        ],
      },
      {
        h2: "What a session looks like",
        paragraphs: [
          "Over Google Meet, the physical therapist asks about your situation, watches how you move within a safe and comfortable range, and helps you find a direction for exercise and self-care you can keep up at home. Afterwards, a simple routine is shared in Japanese by PDF or video.",
          "Online exercise guidance for back concerns is intentionally gradual: the goal is steady continuation, not pushing through discomfort. Follow-up sessions are available if you want support staying consistent.",
        ],
      },
      {
        h2: "When to see a local provider first",
        paragraphs: [
          "Online support has clear limits, and safety comes first. If your symptoms are strong or changing quickly, local medical care should always be the first step. For everything else — uncertainty, hesitation about moving, wanting to talk it through in Japanese — a free inquiry is an easy place to start.",
        ],
      },
    ],
    related: [
      "knee-pain-exercise-support-japanese",
      "continue-home-exercise-after-physical-therapy",
    ],
  },
  {
    slug: "knee-pain-exercise-support-japanese",
    title: "Knee Pain Exercise Support in Japanese for Japanese Speakers Abroad",
    metaTitle:
      "Knee Pain Exercise Support in Japanese for Japanese Speakers Abroad | Priseness",
    description:
      "Knee pain exercise support in Japanese for Japanese speakers living abroad. A physical therapist from Japan provides online exercise guidance you can continue at home.",
    category: "Knee Pain",
    date: "2026-06-07",
    keywords: [
      "knee pain exercise support Japanese",
      "knee pain support in Japanese",
      "Japanese-speaking exercise guidance",
    ],
    intro: [
      "Knee concerns have a way of shrinking daily life abroad — fewer walks, hesitating on stairs, skipping activities you used to enjoy. Many Japanese speakers in this situation are unsure whether moving more would help or make things worse, and asking in English feels daunting.",
      "Knee pain exercise support in Japanese is a way to think this through in your own language, with physical therapist-based exercise support delivered online from Japan.",
    ],
    sections: [
      {
        h2: "Sorting out what your knees can do",
        paragraphs: [
          "Knees respond to how the whole body moves — hips, posture, daily habits, even the layout of your home. In a Japanese-language session over Google Meet, the physical therapist asks about your daily life, observes simple movements, and helps you understand what kind of activity is realistic right now.",
          "The outcome is not a generic exercise list, but Japanese-speaking exercise guidance matched to your situation: which movements to start with, how much is enough, and how to adjust when something feels off.",
        ],
      },
      {
        h2: "Continuing at home",
        paragraphs: [
          "After the session, your routine is shared in Japanese by PDF or video. Many people use the video form check option as well — you record yourself exercising at home, and the physical therapist reviews it and shares adjustment points in Japanese.",
          "If you are also seeing a local provider, this support can sit alongside that care as self-care support and exercise continuation support. We encourage you to consult local medical providers when needed.",
        ],
      },
    ],
    related: [
      "low-back-pain-support-in-japanese",
      "japanese-speaking-exercise-support",
    ],
  },
  {
    slug: "continue-home-exercise-after-physical-therapy",
    title: "How to Continue Home Exercise After Physical Therapy",
    metaTitle:
      "How to Continue Home Exercise After Physical Therapy | Support in Japanese",
    description:
      "Finished physical therapy and unsure what comes next? Exercise continuation support in Japanese helps Japanese speakers abroad keep up home exercise with online guidance from Japan.",
    category: "Exercise Continuation",
    date: "2026-06-09",
    keywords: [
      "continue home exercise after physical therapy",
      "exercise continuation support",
      "Japanese exercise support after physical therapy",
    ],
    intro: [
      "Finishing a course of physical therapy often comes with a quiet question: now what? You may have a sheet of home exercises, but without regular check-ins, routines fade — especially when the original instructions were in English.",
      "This article looks at how to continue home exercise after physical therapy, and how exercise continuation support in Japanese can help Japanese speakers living abroad keep going.",
    ],
    sections: [
      {
        h2: "Why home exercise fades",
        paragraphs: [
          "The most common reasons are simple: uncertainty about whether you are doing the movements correctly, not knowing how to progress when exercises feel too easy or too hard, and having no one to ask when questions come up. When the instructions were given in a second language, each of these gaps widens.",
        ],
      },
      {
        h2: "What helps continuation",
        paragraphs: [
          "Three things make home exercise stick: a routine matched to your actual home and schedule, a way to check your form, and periodic conversations to adjust the plan. Online exercise guidance in Japanese can provide all three — a physical therapist from Japan reviews your current routine, helps you organize what your local provider explained, and adjusts the plan so it fits your life abroad.",
          "Monthly follow-up sessions (two or four per month) are available for people who want steady accountability, and a video form check option lets you confirm your movements between sessions.",
        ],
      },
      {
        h2: "Working alongside local care",
        paragraphs: [
          "Exercise continuation support does not replace your local providers — it picks up where formal sessions ended, focusing on the everyday work of keeping active. If new symptoms appear or something changes, returning to local medical care comes first.",
        ],
      },
    ],
    related: [
      "japanese-physical-therapist-online",
      "knee-pain-exercise-support-japanese",
    ],
  },
  {
    slug: "japanese-physical-therapist-online",
    title:
      "Japanese Physical Therapist Online: Exercise Support in Japanese from Japan",
    metaTitle:
      "Japanese Physical Therapist Online | Exercise Support in Japanese from Japan",
    description:
      "Looking for a Japanese physical therapist online? A licensed physical therapist from Japan provides online exercise support in Japanese for people living abroad. Free inquiry available.",
    category: "About the Service",
    date: "2026-06-10",
    keywords: [
      "Japanese physical therapist online",
      "physical therapist from Japan online",
      "Japanese speaking physical therapist",
    ],
    intro: [
      "If you searched for a Japanese physical therapist online, you are probably looking for something specific: someone with a physical therapist's background who can talk with you about your body in Japanese, wherever you live.",
      "This article explains what working with a Japanese-speaking physical therapist online looks like, and what such support can and cannot do.",
    ],
    sections: [
      {
        h2: "Who provides the support",
        paragraphs: [
          "Sessions are provided by Yutaka Kuriyagawa, a licensed physical therapist in Japan with over 20 years of experience, who runs Priseness, a rehabilitation-focused exercise gym in Sapporo. The online service brings the same careful, person-by-person approach to Japanese speakers living abroad.",
          "Areas of focus include low back, knee, and hip concerns, walking confidence and fall prevention, exercise continuation after local healthcare visits, and home exercise routines for middle-aged and older adults.",
        ],
      },
      {
        h2: "What online support can and cannot do",
        paragraphs: [
          "Online, a physical therapist from Japan can listen to your situation in Japanese, observe how you move over Google Meet, help you organize your concerns, and share exercise and self-care directions you can continue at home.",
          "What it cannot do is equally important: it cannot perform hands-on assessment, it cannot judge the cause of symptoms, and it does not replace your doctor or your local physical therapist. It is guidance from Japan that works alongside local care.",
        ],
      },
      {
        h2: "Getting started",
        paragraphs: [
          "Everything begins with a free inquiry — a short form describing your situation. The physical therapist reviews it, the schedule is coordinated around your time zone, and pricing guidance comes individually only if you decide to book. Family members are welcome to join sessions, including families in Japan supporting a relative abroad.",
        ],
      },
    ],
    related: [
      "japanese-speaking-exercise-support",
      "continue-home-exercise-after-physical-therapy",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
