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
      className="group p-6 bg-white rounded-xl border border-neutral-200 transition-all duration-200 text-left hover:border-primary-300 hover:shadow-md hover:-translate-y-1"
    >
      {/* カテゴリバッジ */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-caption font-semibold rounded-full border bg-primary-50 text-primary-700 border-primary-100">
          {prompt.category}
        </span>
        <ArrowRight className="w-5 h-5 transition-all duration-200 text-neutral-400" />
      </div>
      
      {/* タイトル */}
      <h3 className="text-h3 font-semibold mb-3 transition-colors duration-200 text-neutral-900">
        {prompt.title}
      </h3>
      
      {/* 説明 - 3行表示 */}
      <p className="text-body leading-relaxed line-clamp-3 text-neutral-600">
        {prompt.description}
      </p>
      
      {/* ボトムアクセント */}
      <div className="mt-4 pt-4 border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span className="text-caption font-medium text-primary-600">
          詳細を見る →
        </span>
      </div>
    </button>
  );
});
