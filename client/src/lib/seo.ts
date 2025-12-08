/**
 * SEO関連のユーティリティ関数
 * 各ページでメタタグとタイトルを動的に更新する
 */

const BASE_URL = "https://kgraph57.github.io/medicalprompthub";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image-new.png`;

interface SEOData {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
}

/**
 * ページのSEO情報を更新
 */
export function updateSEO(data: SEOData): void {
  const fullTitle = `${data.title} | Medical Prompt Hub`;
  const url = `${BASE_URL}${data.path}`;
  const ogImage = data.ogImage || DEFAULT_OG_IMAGE;

  // タイトルを更新
  document.title = fullTitle;

  // 既存のメタタグを更新または作成
  updateMetaTag("name", "title", fullTitle);
  updateMetaTag("name", "description", data.description);
  if (data.keywords) {
    updateMetaTag("name", "keywords", data.keywords);
  }

  // robots
  if (data.noindex) {
    updateMetaTag("name", "robots", "noindex, nofollow");
  } else {
    updateMetaTag("name", "robots", "index, follow");
  }

  // Open Graph
  updateMetaTag("property", "og:title", fullTitle);
  updateMetaTag("property", "og:description", data.description);
  updateMetaTag("property", "og:url", url);
  updateMetaTag("property", "og:image", ogImage);
  updateMetaTag("property", "og:type", "website");
  updateMetaTag("property", "og:locale", "ja_JP");
  updateMetaTag("property", "og:site_name", "Medical Prompt Hub");

  // Twitter Card
  updateMetaTag("property", "twitter:card", "summary_large_image");
  updateMetaTag("property", "twitter:title", fullTitle);
  updateMetaTag("property", "twitter:description", data.description);
  updateMetaTag("property", "twitter:image", ogImage);
  updateMetaTag("property", "twitter:url", url);

  // Canonical URL
  updateCanonical(url);
}

/**
 * メタタグを更新または作成
 */
function updateMetaTag(attribute: "name" | "property", key: string, content: string): void {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

/**
 * Canonical URLを更新または作成
 */
function updateCanonical(url: string): void {
  let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  
  canonical.href = url;
}

/**
 * 構造化データ（JSON-LD）を追加
 */
export function addStructuredData(data: {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}): void {
  // 既存の構造化データを削除（同じ@typeの場合）
  const existing = document.querySelector(`script[type="application/ld+json"][data-type="${data["@type"]}"]`);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-type", data["@type"] as string);
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
}

/**
 * ホームページ用の構造化データ
 */
export function addHomeStructuredData(): void {
  addStructuredData({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Medical Prompt Hub",
    "description": "医療従事者のためのAIプロンプトライブラリ",
    "url": BASE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });

  addStructuredData({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Medical Prompt Hub",
    "url": BASE_URL,
    "logo": DEFAULT_OG_IMAGE,
    "description": "医療従事者のためのAIプロンプトライブラリ"
  });
}

/**
 * FAQページ用の構造化データ
 */
export function addFAQStructuredData(faqs: Array<{ question: string; answer: string }>): void {
  addStructuredData({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });
}
