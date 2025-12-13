import { Search, ArrowRight, Command } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useRef } from "react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // キーボードショートカット: /キーで検索バーにフォーカス
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 入力フィールドにフォーカスがある場合はスキップ
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // /キーで検索バーにフォーカス
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      // Escキーで検索をクリア
      if (e.key === 'Escape' && searchQuery) {
        onSearchChange('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [searchQuery, onSearchChange]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
      {/* 控えめな背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary-50/40 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center">
          {/* メインタイトル - Vercel風のクリーンなタイポグラフィ */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900 leading-[1.1] tracking-tight">
              医療の情熱を
              <br />
              <span className="text-primary-600">プロンプトで解き放つ</span>
            </h1>
            
            {/* サブタイトル - シンプルで読みやすい */}
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-2">
                100以上の実践プロンプトで、あなたの専門性を高める
              </p>
              <p className="text-base md:text-lg text-neutral-500">
                日常業務を効率化し、患者との対話に集中できる時間を生み出します
              </p>
            </div>
          </div>

          {/* 検索バー - Code Wiki風の強化デザイン */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="flex items-center bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus-within:shadow-xl focus-within:border-primary-500 dark:focus-within:border-primary-400">
                <div className="pl-4 md:pl-5 pr-3">
                  <Search className="w-5 h-5 md:w-6 md:h-6 text-neutral-400 dark:text-neutral-500" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="プロンプトを検索... (例: 鑑別診断、症例報告)"
                  className="flex-1 h-14 md:h-16 pr-4 text-base md:text-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="プロンプト検索"
                />
                {/* キーボードショートカット表示 */}
                {!searchQuery && (
                  <div className="hidden sm:flex items-center gap-1 pr-3 md:pr-4">
                    <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded">
                      <Command className="w-3 h-3" />
                      <span>/</span>
                    </kbd>
                  </div>
                )}
              </div>
              {/* 検索ヒント */}
              {searchQuery && (
                <p className="mt-2 text-xs md:text-sm text-neutral-500 dark:text-neutral-400 text-center">
                  <kbd className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-xs">Esc</kbd> キーでクリア
                </p>
              )}
            </div>
          </div>
          
          {/* CTAボタン - ミニマルで洗練されたデザイン */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={() => setLocation('/guides')}
              className="group inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="ガイドページへ移動"
            >
                はじめる
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              プロンプトを探す
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
