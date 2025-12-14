import { AlertTriangle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { memo } from "react";
import { motion } from "framer-motion";
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
        badge: 'bg-red-100 dark:bg-red-900/50 text-red-900 dark:text-red-100 border border-red-300 dark:border-red-700 font-semibold shadow-sm'
      };
    }
    if (prompt.riskLevel === 'medium') {
      return {
        badge: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-100 border border-yellow-300 dark:border-yellow-700 font-semibold shadow-sm'
      };
    }
    return null;
  };

  const riskConfig = getRiskConfig();

  return (
    <motion.button
      onClick={() => setLocation(`/prompts/${prompt.id}`)}
      className="
        group relative w-full p-5
        bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm
        rounded-xl
        border border-neutral-200/60 dark:border-neutral-800/60
        hover:border-neutral-300/70 dark:hover:border-neutral-700/70
        transition-all duration-300
        text-left
        hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50
      "
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -2,
        scale: 1.01,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ヘッダー: カテゴリとリスクレベル */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {prompt.category}
          </span>
          {riskConfig && (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${riskConfig.badge}`}>
              {prompt.riskLevel === 'high' && <AlertTriangle className="w-3.5 h-3.5" />}
              {prompt.riskLevel === 'high' ? '高' : '中'}
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
    </motion.button>
  );
});
