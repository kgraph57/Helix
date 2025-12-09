import { Search } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* メインメッセージ */}
        <div className="text-center mb-12">
          <h1 className="text-display font-bold mb-4 text-neutral-900">
            医療従事者のための
            <br />
            AIプロンプトライブラリ
          </h1>
          <p className="text-h3 font-normal max-w-2xl mx-auto text-neutral-600">
            100以上の実践的なプロンプトで、診断、研究、文書作成を支援
          </p>
        </div>
        
        {/* 検索バー - 最優先機能 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="プロンプトを検索（例：鑑別診断、症例報告、統計解析）"
              className="input-field w-full h-14 pl-12 pr-4"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        {/* セカンダリアクション */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setLocation('/guides')}
            className="px-6 py-3 text-body font-semibold transition-colors duration-200 text-primary-600 hover:text-primary-700"
          >
            使い方を学ぶ →
          </button>
        </div>
      </div>
    </section>
  );
}
