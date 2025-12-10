
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    iconSrc: "/medicalprompthub/icons/stethoscope.png",
    title: "診断支援",
    description: "100以上の実践的なプロンプトで、鑑別診断や症例分析をサポート。複雑な症状を持つ患者の診断プロセスを効率化します。",
  },
  {
    iconSrc: "/medicalprompthub/icons/graduation-cap.png",
    title: "学習支援",
    description: "体系的なコースとTipsで、AIの効果的な活用方法を学習。基礎から実践まで、ステップバイステップで習得できます。",
  },
  {
    iconSrc: "/medicalprompthub/icons/zap.png",
    title: "業務効率化",
    description: "症例報告、論文執筆、統計解析などの業務を効率化。時間のかかる作業をAIがサポートし、患者との対話に集中できます。",
  },
];

export function FeatureOverviewSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-8 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* セクションヘッダー */}
        <div
          className={`text-center mb-6 md:mb-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl md:text-h2 font-semibold mb-4 text-neutral-900">
            医療従事者の業務を変革する3つの価値
          </h2>
          <p className="text-base md:text-body text-neutral-600 max-w-3xl mx-auto">
            AIを活用することで、診断の精度向上、学習の効率化、業務の自動化を実現します
          </p>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            return (
              <div
                key={feature.title}
                className={`bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-4">
                  <img src={feature.iconSrc} alt={feature.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg md:text-h3 font-semibold mb-3 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-body text-neutral-600 leading-relaxed">
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
