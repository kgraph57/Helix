import { AlertTriangle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { memo } from "react";
import { HighlightedText } from "@/components/HighlightedText";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  riskLevel?: 'high' | 'medium' | 'low';
}

interface PromptCardProps {
  prompt: Prompt;
  searchQuery?: string;
}

export const PromptCard = memo(function PromptCard({ prompt, searchQuery = '' }: PromptCardProps) {
  const [, setLocation] = useLocation();

  // リスクレベルに応じた色
  const getRiskConfig = () => {
    if (prompt.riskLevel === 'high') {
      return {
        badge: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
      };
    }
    if (prompt.riskLevel === 'medium') {
      return {
        badge: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400'
      };
    }
    return null;
  };

  const riskConfig = getRiskConfig();

  return (
    <button
      onClick={() => setLocation(`/prompts/${prompt.id}`)}
      className="
        group relative w-full p-5
        bg-white dark:bg-neutral-900
        rounded-xl
        border border-neutral-200 dark:border-neutral-800
        hover:border-neutral-300 dark:hover:border-neutral-700
        transition-all duration-300
        text-left
        hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50
        hover:-translate-y-1
        active:translate-y-0
      "
    >
      {/* ヘッダー: カテゴリとリスクレベル */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {prompt.category}
          </span>
          {riskConfig && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${riskConfig.badge}`}>
              {prompt.riskLevel === 'high' && <AlertTriangle className="w-3 h-3" />}
              {prompt.riskLevel === 'high' ? '高リスク' : '中リスク'}
            </span>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
      </div>
      
      {/* タイトル */}
      <h3 className="text-base font-semibold mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors line-clamp-2">
        <HighlightedText text={prompt.title} query={searchQuery} />
      </h3>
      
      {/* 説明 */}
      <p className="text-sm leading-relaxed line-clamp-2 text-neutral-600 dark:text-neutral-400">
        <HighlightedText text={prompt.description} query={searchQuery} />
      </p>
    </button>
  );
});
