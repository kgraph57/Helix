import { Stethoscope, GraduationCap, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Stethoscope,
    title: "診断支援",
    description: "100以上の実践的なプロンプトで、鑑別診断や症例分析をサポート。複雑な症状を持つ患者の診断プロセスを効率化します。",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: GraduationCap,
    title: "学習支援",
    description: "体系的なコースとTipsで、AIの効果的な活用方法を学習。基礎から実践まで、ステップバイステップで習得できます。",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Zap,
    title: "業務効率化",
    description: "症例報告、論文執筆、統計解析などの業務を効率化。時間のかかる作業をAIがサポートし、患者との対話に集中できます。",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

export function FeatureOverviewSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-neutral-50">
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
            医療従事者の業務を変革する3つの価値
          </h2>
          <p className="text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            AIを活用することで、診断の精度向上、学習の効率化、業務の自動化を実現します
          </p>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`bg-white rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} ${feature.iconColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
