import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contentTypes = [
  {
    iconSrc: "/medicalprompthub/icons/book-open.png",
    title: "体系的に学ぶAI活用コース",
    description: "AIの基礎から実践まで、ステップバイステップで学べる構造化されたコース。医療現場での具体的な活用方法を習得できます。",
    cta: "コースを見る",
    link: "/courses",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    examples: [
      "AI基礎コース",
      "プロンプトエンジニアリング",
      "医療AI実践"
    ]
  },
  {
    iconSrc: "/medicalprompthub/icons/lightbulb.png",
    title: "すぐに使えるAI活用Tips",
    description: "プロンプトの書き方から高度なテクニックまで、実践的なTipsを提供。明日から使える具体的なノウハウが満載です。",
    cta: "Tipsを見る",
    link: "/tips",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    examples: [
      "Few-Shotプロンプティング",
      "Chain-of-Thought",
      "構造化出力"
    ]
  },
  {
    iconSrc: "/medicalprompthub/icons/workflow.png",
    title: "実務に使えるワークフローガイド",
    description: "症例報告、論文執筆、英文校正など、実務に直結するステップバイステップガイド。複雑な業務を効率化します。",
    cta: "ガイドを見る",
    link: "/guides",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    examples: [
      "症例報告作成",
      "論文執筆支援",
      "英文校正"
    ]
  },
  {
    iconSrc: "/medicalprompthub/icons/file-text.png",
    title: "100以上の実践的プロンプト",
    description: "診断、研究、文書作成など、あらゆる場面で使えるプロンプトライブラリ。コピー&ペーストですぐに使えます。",
    cta: "プロンプトを探す",
    link: "#prompts",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    examples: [
      "鑑別診断",
      "統計解析",
      "文献レビュー"
    ]
  }
];

export function ContentShowcaseSection() {
  const [, setLocation] = useLocation();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleNavigation = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation(link);
    }
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* セクションヘッダー */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-h2 font-semibold mb-4 text-neutral-900">
            あなたに最適なコンテンツを見つけよう
          </h2>
          <p className="text-base md:text-body text-neutral-600 max-w-3xl mx-auto">
            学習スタイルや目的に応じて、4つのコンテンツタイプから選べます
          </p>
        </div>

        {/* コンテンツカードグリッド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {contentTypes.map((content, index) => {
            return (
              <div
                key={content.title}
                className={`rounded-xl p-6 md:p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                {/* アイコンとタイトル */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src={content.iconSrc} alt={content.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-lg md:text-h3 font-semibold text-neutral-900 leading-tight">
                    {content.title}
                  </h3>
                </div>

                {/* 説明 */}
                <p className="text-sm md:text-body text-neutral-600 mb-4 leading-relaxed">
                  {content.description}
                </p>

                {/* 例 */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {content.examples.map((example) => (
                      <span
                        key={example}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs md:text-sm rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleNavigation(content.link)}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base transition-colors group"
                >
                  {content.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
