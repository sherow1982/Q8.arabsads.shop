import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      // ─── السماح العام لجميع محركات البحث ───────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/cart"],
      },
      // ─── Google ─────────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/checkout"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // ─── Bing / Microsoft ────────────────────────────────────────
      {
        userAgent: "bingbot",
        allow: "/",
      },
      {
        userAgent: "BingPreview",
        allow: "/",
      },
      // ─── وكلاء الذكاء الاصطناعي — AI Crawlers ───────────────────
      // GPT / OpenAI
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Anthropic / Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      // Google Gemini / Bard
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // You.com
      {
        userAgent: "YouBot",
        allow: "/",
      },
      // Cohere
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // Mistral / Le Chat
      {
        userAgent: "MistralBot",
        allow: "/",
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Common product feed crawlers
      {
        userAgent: "Slurp",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
