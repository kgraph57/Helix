import { Search } from "lucide-react";
import { memo } from "react";
import { PromptCard } from "./PromptCard";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface PromptGridSectionProps {
  prompts: Prompt[];
  searchQuery: string;
  selectedCategory: string | null;
  onClearFilters: () => void;
}

export const PromptGridSection = memo(function PromptGridSection({ 
  prompts, 
  searchQuery, 
  selectedCategory,
  onClearFilters 
}: PromptGridSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* セクションヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-h2 font-semibold mb-2 text-neutral-900">
              {searchQuery || selectedCategory ? '検索結果' : 'すべてのプロンプト'}
            </h2>
            <p className="text-body text-neutral-600">
              {prompts.length}件のプロンプト
            </p>
          </div>
          
          {selectedCategory && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-primary-50 text-primary-700 hover:bg-primary-100"
            >
              {selectedCategory} ×
            </button>
          )}
        </div>
        
        {/* プロンプトカードグリッド - 2列 */}
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          // 検索結果なし
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
            <h3 className="text-h3 font-semibold mb-2 text-neutral-900">
              プロンプトが見つかりませんでした
            </h3>
            <p className="text-body mb-6 text-neutral-600">
              検索条件を変更してお試しください
            </p>
            <button
              onClick={onClearFilters}
              className="btn-secondary"
            >
              検索をクリア
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
