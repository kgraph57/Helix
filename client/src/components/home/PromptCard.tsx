import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { memo } from "react";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface PromptCardProps {
  prompt: Prompt;
}

export const PromptCard = memo(function PromptCard({ prompt }: PromptCardProps) {
  const [, setLocation] = useLocation();

  return (
    <button
      onClick={() => setLocation(`/prompts/${prompt.id}`)}
      className="group p-4 md:p-6 bg-white rounded-lg md:rounded-xl border border-neutral-200 transition-all duration-200 text-left hover:border-primary-300 hover:shadow-md hover:-translate-y-1"
    >
      {/* カテゴリバッジ */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <span className="px-2.5 py-0.5 md:px-3 md:py-1 text-xs md:text-caption font-semibold rounded-full border bg-primary-50 text-primary-700 border-primary-100">
          {prompt.category}
        </span>
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-all duration-200 text-neutral-400" />
      </div>
      
      {/* タイトル */}
      <h3 className="text-base md:text-h3 font-semibold mb-2 md:mb-3 transition-colors duration-200 text-neutral-900">
        {prompt.title}
      </h3>
      
      {/* 説明 - 3行表示 */}
      <p className="text-sm md:text-body leading-relaxed line-clamp-3 text-neutral-600">
        {prompt.description}
      </p>
      
      {/* ボトムアクセント */}
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-xs md:text-caption font-medium text-primary-600">
          詳細を見る →
        </span>
      </div>
    </button>
  );
});
