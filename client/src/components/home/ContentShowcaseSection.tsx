import { ArrowRight, BookOpen, Lightbulb, GitBranch, FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contentTypes = [
  {
    icon: BookOpen,
    title: "体系的に学ぶAI活用コース",
    description: "AIの基礎から実践まで、ステップバイステップで学べる構造化されたコース。医療現場での具体的な活用方法を習得できます。",
    cta: "コースを見る",
    link: "/courses",
    bgColor: "bg-blue-50/50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    examples: [
      "AI基礎コース",
      "プロンプトエンジニアリング",
      "医療AI実践"
    ]
  },
  {
    icon: Lightbulb,
    title: "すぐに使えるAI活用Tips",
    description: "プロンプトの書き方から高度なテクニックまで、実践的なTipsを提供。明日から使える具体的なノウハウが満載です。",
    cta: "Tipsを見る",
    link: "/tips",
    bgColor: "bg-amber-50/50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-100",
    examples: [
      "Few-Shotプロンプティング",
      "Chain-of-Thought",
      "構造化出力"
    ]
  },
  {
    icon: GitBranch,
    title: "実務に使えるワークフローガイド",
    description: "症例報告、論文執筆、英文校正など、実務に直結するステップバイステップガイド。複雑な業務を効率化します。",
    cta: "ガイドを見る",
    link: "/guides",
    bgColor: "bg-green-50/50",
    iconColor: "text-green-600",
    borderColor: "border-green-100",
    examples: [
      "症例報告作成",
      "論文執筆支援",
      "英文校正"
    ]
  },
  {
    icon: FileText,
    title: "100以上の実践的プロンプト",
    description: "診断、研究、文書作成など、あらゆる場面で使えるプロンプトライブラリ。コピー&ペーストですぐに使えます。",
    cta: "プロンプトを探す",
    link: "#prompts",
    bgColor: "bg-purple-50/50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-100",
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
    <section ref={ref} className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* セクションヘッダー */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-neutral-900">
            あなたに最適なコンテンツを見つけよう
          </h2>
          <p className="text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            学習スタイルや目的に応じて、4つのコンテンツタイプから選べます
          </p>
        </div>

        {/* コンテンツカードグリッド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contentTypes.map((content, index) => {
            const Icon = content.icon;
            return (
              <div
                key={content.title}
                className={`group rounded-xl p-6 border ${content.borderColor} ${content.bgColor} hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
                onClick={() => handleNavigation(content.link)}
              >
                {/* アイコンとタイトル */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${content.bgColor} ${content.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {content.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {content.description}
                    </p>
                  </div>
                </div>

                {/* 例 */}
                <div className="mb-4 ml-16">
                  <div className="flex flex-wrap gap-2">
                    {content.examples.map((example) => (
                      <span
                        key={example}
                        className="px-3 py-1 bg-white/80 border border-neutral-200 text-neutral-700 text-xs rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="ml-16">
                  <button
                    className={`inline-flex items-center gap-2 ${content.iconColor} font-medium text-sm transition-colors group-hover:gap-3`}
                  >
                    {content.cta}
                    <ArrowRight className="w-4 h-4 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
