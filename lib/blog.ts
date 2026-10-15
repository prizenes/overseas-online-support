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
  /** AEO: answer-first summary shown at the top of the article */
  summary?: string;
  sections: BlogSection[];
  /** AEO: FAQ shown at the end of the article and output as FAQPage JSON-LD */
  faq?: { q: string; a: string }[];
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
          "After the session, your routine is shared in Japanese by PDF or video, so you can keep going at home with clear guidance you can revisit anytime.",
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
          "Monthly follow-up sessions (two or four per month) are available for people who want steady accountability and regular check-ins between sessions.",
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
  {
    slug: "scheduling-online-exercise-support-across-time-zones",
    title:
      "Scheduling Online Exercise Support in Japanese Across Time Zones (US, Europe, Asia-Pacific)",
    metaTitle:
      "Online Exercise Support in Japanese Across Time Zones | US, Europe, Asia-Pacific",
    description:
      "How to schedule online exercise support in Japanese from the US, Europe, or Asia-Pacific. Typical session times by region, plus tips for coordinating with a physical therapist in Japan.",
    category: "Scheduling",
    date: "2026-10-15",
    keywords: [
      "online exercise support in Japanese time zone",
      "Japanese physical therapist online time difference",
      "exercise support for Japanese living abroad",
    ],
    summary:
      "Sessions run during Japan's daytime and evening (roughly 9:00-19:00 Japan time). From the US that usually means your evening or night; from Europe, your morning; from Australia and Southeast Asia, your daytime. You can enter your preferred time in your own time zone, and it is converted to Japan time automatically.",
    intro: [
      "A time difference with Japan can make online support feel out of reach. In practice, the hours line up better than many people expect, and you do not have to do the math yourself.",
      "This guide explains typical session times by region and how to coordinate a schedule when you request online exercise support in Japanese.",
    ],
    sections: [
      {
        h2: "Typical session times by region",
        paragraphs: [
          "Sessions are generally held within Japan's daytime and evening hours, roughly 9:00-19:00 Japan time. Here is how that tends to map to your local clock.",
          "US East Coast: Japan's morning is your previous evening or night, so after-work evening hours are the most practical. US West Coast: Japan's morning and midday fall in your previous late afternoon to night, so evenings after work usually fit.",
          "UK and Europe: Japan's afternoon and early evening line up with your morning, which works well before or early in the workday. Australia: the difference is only one to two hours, so daytime slots are available. Singapore, Thailand, and nearby: the difference is also small, so daytime works.",
          "Regions that observe daylight saving time shift by one hour with the seasons, so please double-check the time on both clocks once a date is proposed.",
        ],
      },
      {
        h2: "Tips for coordinating a schedule",
        paragraphs: [
          "Enter your preferred time in your own local time zone on the inquiry form. The form detects your time zone and shows the equivalent Japan time automatically, so you do not need to convert it yourself.",
          "If your preferred time falls outside the usual Japan-time window, you can still send the inquiry. We review it and coordinate a time by email. Offering a few alternative times makes scheduling faster.",
          "Family members in Japan or abroad are welcome to join, so it also helps to check the clocks of everyone who will attend.",
        ],
      },
      {
        h2: "Getting started",
        paragraphs: [
          "Start with a free inquiry. No payment is requested at this stage. We confirm whether online support fits your situation and propose a time that works across time zones.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I use this service from the United States or Europe?",
        a: "Yes. Sessions are coordinated around your time zone. You can enter your preferred time in your local time zone and it is converted to Japan time automatically.",
      },
      {
        q: "What if my preferred time is outside Japan's usual hours?",
        a: "You can still send the inquiry. We review it and coordinate a workable time with you by email.",
      },
      {
        q: "Is the session held in Japanese?",
        a: "Yes. Sessions are held in Japanese by a physical therapist from Japan, online.",
      },
    ],
    related: [
      "japanese-physical-therapist-online",
      "japanese-speaking-exercise-support",
    ],
  },
  {
    slug: "questions-to-ask-after-local-physical-therapy",
    title:
      "Questions to Ask After Local Physical Therapy: A Checklist for Japanese Speakers Abroad",
    metaTitle:
      "Questions to Ask After Local Physical Therapy | Checklist for Japanese Speakers",
    description:
      "A practical checklist of questions to ask after local physical therapy, so you can continue home exercise with confidence. Includes how to organize the answers in Japanese.",
    category: "Exercise Continuation",
    date: "2026-10-15",
    keywords: [
      "questions to ask after physical therapy",
      "continue home exercise after physical therapy",
      "Japanese exercise support after physical therapy",
    ],
    summary:
      "Before you leave your last local physical therapy visit, confirm five things: which movements to continue and how often, how much discomfort is acceptable, which signs mean you should seek care, when and how to progress, and when to check in next. Writing these down makes it much easier to keep your home routine going and to review it in Japanese later.",
    intro: [
      "Home exercise tends to fade after formal sessions end, especially when instructions were given in a second language. A short list of questions can close most of the gaps.",
      "Use this checklist at your final local visit, or keep it as a reference if you are already at home wondering what to do next.",
    ],
    sections: [
      {
        h2: "Five questions to ask",
        paragraphs: [
          "1. Which movements should I continue, and how many times and how often?",
          "2. How much discomfort is acceptable while I exercise, and what level means I should stop?",
          "3. What signs mean I should seek local medical care?",
          "4. When and how should I make the exercises harder or easier?",
          "5. When should I have my progress checked again?",
          "If any word is unfamiliar, ask for it to be explained or written down. With permission, a short video of the movement can help you remember it later.",
        ],
      },
      {
        h2: "Organizing the answers in Japanese",
        paragraphs: [
          "Online exercise guidance in Japanese can help you review what you were told and think through how to continue at home. It works alongside your local providers and supports the everyday work of keeping your routine going.",
          "If your local provider gave you restrictions, please share them. They always take priority.",
        ],
      },
      {
        h2: "When to seek local care first",
        paragraphs: [
          "If new or stronger symptoms appear, contact your local provider before continuing the routine. Online support is not a substitute for local medical care.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I use online support in Japanese while still seeing a local provider?",
        a: "Yes. Many people use it alongside local care to organize explanations and plan a home routine. Local instructions and restrictions always come first.",
      },
      {
        q: "Can you review the exercises my local provider gave me?",
        a: "Yes. Share the routine and how you currently do it, and we can help you organize a sustainable way to continue, within any restrictions you were given.",
      },
    ],
    related: [
      "continue-home-exercise-after-physical-therapy",
      "japanese-physical-therapist-online",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
