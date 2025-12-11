import { Activity, FileText, BarChart3, GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const useCases = [
  {
    icon: Activity,
    title: "救急外来での診断支援",
    scene: "複雑な症状を持つ患者の鑑別診断をAIがサポート",
    feature: "Prompts（鑑別診断）",
    effect: "診断時間を30%短縮",
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: FileText,
    title: "症例報告の作成",
    scene: "症例報告の構成から執筆までをステップバイステップでガイド",
    feature: "Guides（症例報告ワークフロー）",
    effect: "作成時間を50%削減",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "研究データの統計解析",
    scene: "統計解析コードの生成から結果の解釈までをサポート",
    feature: "Prompts（統計解析）",
    effect: "解析時間を40%短縮",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: GraduationCap,
    title: "AI活用スキルの習得",
    scene: "AIの基礎から実践まで、体系的に学習",
    feature: "Courses（AI基礎コース）",
    effect: "2週間で実務レベルに到達",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export function UseCaseSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-gradient-to-b from-neutral-50 to-white">
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
            実際の医療現場での活用シーン
          </h2>
          <p className="text-sm md:text-base text-neutral-600 max-w-3xl mx-auto">
            日々の診療、研究、学習において、AIがどのように医療従事者をサポートするかをご紹介します
          </p>
        </div>

        {/* ユースケースカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.title}
                className={`bg-white rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* アイコン */}
                <div className={`w-12 h-12 rounded-lg ${useCase.bgColor} ${useCase.iconColor} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* タイトル */}
                <h3 className="text-base font-semibold mb-3 text-neutral-900">
                  {useCase.title}
                </h3>

                {/* シーン */}
                <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                  {useCase.scene}
                </p>

                {/* 使用機能 */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                    {useCase.feature}
                  </span>
                </div>

                {/* 効果 */}
                <div className="pt-3 border-t border-neutral-200">
                  <p className="text-sm font-medium text-primary-600">
                    ✓ {useCase.effect}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 補足メッセージ */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-neutral-500">
            ※ 効果は実際の使用状況により異なります。AIは診断・治療の補助ツールであり、最終判断は必ず医療従事者が行ってください。
          </p>
        </div>
      </div>
    </section>
  );
}
