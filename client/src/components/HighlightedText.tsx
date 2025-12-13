import { highlightSearchQuery } from "@/lib/search-utils";

interface HighlightedTextProps {
  text: string;
  query: string;
}

/**
 * React用のハイライトコンポーネント（JSXを返す）
 */
export function HighlightedText({ text, query }: HighlightedTextProps) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const highlighted = highlightSearchQuery(text, query);
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}
