import { siteUrl } from "@/lib/site";

export type EnBlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const enBlogPosts: EnBlogPost[] = [
  {
    slug: "japanese-speaking-exercise-support",
    title: "Japanese-Speaking Exercise Support for People Living Abroad",
    description:
      "Japanese-speaking exercise support for people living abroad who want to discuss low back pain, knee pain, walking concerns, and exercise continuation in Japanese.",
    date: "2026-06-09",
    keywords: [
      "Japanese-speaking exercise support",
      "online exercise support in Japanese",
      "exercise support for Japanese living abroad"
    ],
    sections: [
      {
        heading: "Why Japanese-speaking support matters abroad",
        body: [
          "Living abroad can make it difficult to talk about physical concerns in your first language. Even when local healthcare is available, explaining daily movement, exercise anxiety, family concerns, or past rehabilitation experience can feel stressful.",
          "This service is designed for Japanese speakers living abroad who want to organize their concerns in Japanese before deciding what kind of exercise support may be appropriate."
        ]
      },
      {
        heading: "What online exercise support can help organize",
        body: [
          "A Japanese physical therapist listens to your situation, checks your daily environment, and reviews movement concerns through an online session. The goal is to support safer exercise continuation and self-care planning at home.",
          "This is not a medical diagnosis or treatment. It does not replace local healthcare providers. Local doctors or physical therapists should be consulted when needed, especially when symptoms are severe or changing."
        ]
      },
      {
        heading: "For Japanese people, families, and Japanese speakers overseas",
        body: [
          "The support may be useful for people who feel unsure about exercise, families worried about an older parent living abroad, or Japanese speakers who want to continue exercise habits after local medical consultation.",
          "Family members can join the conversation when helpful, and the first step is a free inquiry through the Japanese form."
        ]
      }
    ]
  },
  {
    slug: "low-back-pain-support-in-japanese",
    title: "Low Back Pain Support in Japanese for People Living Abroad",
    description:
      "Low back pain support in Japanese for Japanese speakers living abroad who want online exercise guidance and help organizing self-care concerns.",
    date: "2026-06-09",
    keywords: [
      "low back pain support in Japanese",
      "Japanese physical therapist online",
      "online exercise guidance for back pain Japanese"
    ],
    sections: [
      {
        heading: "When low back pain feels harder to discuss overseas",
        body: [
          "Low back pain can affect sitting, walking, work, travel, and exercise habits. When you live abroad, it may also be difficult to explain what you feel in Japanese or to understand local explanations fully.",
          "Japanese-language online exercise support can help you organize what is bothering you, what movements feel difficult, and what kind of exercise continuation may be realistic at home."
        ]
      },
      {
        heading: "Support focused on exercise continuation",
        body: [
          "The online session may include questions about daily life, movement confirmation, and discussion of exercise habits. The aim is to consider exercise guidance and self-care direction that fits your current environment.",
          "This service is not a medical diagnosis or treatment, and it does not promise a specific result. Local doctors or physical therapists should be consulted when needed."
        ]
      },
      {
        heading: "When to seek local medical care first",
        body: [
          "Please seek local medical care for severe pain, numbness, paralysis, sudden worsening symptoms, fever, pain after a fall, or any symptom that feels urgent.",
          "Online exercise support can be used as self-care support after local healthcare consultation, or as a way to discuss exercise concerns in Japanese when there are no urgent symptoms."
        ]
      }
    ]
  },
  {
    slug: "knee-pain-exercise-support-japanese",
    title: "Knee Pain Exercise Support in Japanese for Japanese Speakers Abroad",
    description:
      "Knee pain exercise support in Japanese for Japanese speakers abroad who want to discuss walking concerns, exercise continuation, and home exercises online.",
    date: "2026-06-09",
    keywords: [
      "knee pain exercise support Japanese",
      "Japanese-speaking exercise support",
      "online exercise support in Japanese"
    ],
    sections: [
      {
        heading: "Knee concerns can make exercise decisions confusing",
        body: [
          "When your knee feels uncomfortable, it can be hard to know whether to walk, rest, stretch, or start strengthening exercises. This can be even more confusing when you live abroad and cannot easily discuss the details in Japanese.",
          "Online exercise support in Japanese helps you organize daily concerns, walking anxiety, and questions about exercise continuation."
        ]
      },
      {
        heading: "What can be discussed online",
        body: [
          "A Japanese physical therapist can ask about your daily life, check simple movements online, and discuss exercise options that may be easier to continue at home.",
          "This is exercise support and guidance, not a medical diagnosis or treatment. It does not replace local doctors or physical therapists, and local care should be consulted when needed."
        ]
      },
      {
        heading: "Useful for families and long-term exercise habits",
        body: [
          "The service may also be useful when a family member is worried about walking confidence, fall concerns, or reduced activity in a Japanese-speaking parent or relative living abroad.",
          "The first step is a free inquiry. After reviewing the situation, we can explain whether an online consultation may be appropriate."
        ]
      }
    ]
  }
];

export function getEnBlogPost(slug: string) {
  return enBlogPosts.find((post) => post.slug === slug);
}

export function getEnBlogUrl(slug: string) {
  return `${siteUrl}/en/blog/${slug}`;
}
