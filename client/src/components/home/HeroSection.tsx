import { Search, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-1.5 lg:py-2 md:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* メインメッセージ */}
        <div className="text-center mb-2 md:mb-3">
          <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-neutral-900 leading-tight">
            医療従事者のための
            <br />
            AIプロンプトライブラリ
          </h1>
          <p className="text-[10px] md:text-xs font-normal max-w-2xl mx-auto text-neutral-600">
            100以上の実践的なプロンプトで、診断、研究、文書作成を支援
          </p>
          <div className="mt-3 max-w-3xl mx-auto">
            <p className="text-[10px] md:text-xs text-primary-700 font-medium italic">
              「このツールで生まれた時間を、患者さんとの対話のために。」
            </p>
            <p className="text-[10px] md:text-xs text-neutral-500 mt-1">
              AIは医療を効率化するだけではなく、医師が患者と向き合う時間を増やすためのツールです。
            </p>
          </div>
        </div>
        
        {/* 検索バー - 最優先機能 */}
        <div className="max-w-2xl mx-auto mb-3 md:mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="プロンプトを検索（例：鑑別診断、症例報告、統計解析）"
              className="input-field w-full h-8 lg:h-9 md:h-9 lg:h-9 pl-8 md:pl-10 pr-2.5 md:pr-3 text-[10px] md:text-xs"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        {/* セカンダリアクション */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setLocation('/guides')}
            className="px-2.5 md:px-4 py-1.5 md:py-2 lg:py-2 text-xs md:text-sm font-semibold transition-colors duration-200 text-primary-600 hover:text-primary-700"
          >
            使い方を学ぶ →
          </button>
        </div>
        
        {/* スクロールインジケーター */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors"
            aria-label="下にスクロール"
          >
            <span className="text-xs">もっと見る</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
