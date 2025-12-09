import { GraduationCap } from "lucide-react";
import { useLocation } from "wouter";
import { memo } from "react";

interface Stats {
  totalXP: number;
  currentLevel: number;
  nextLevelXP: number;
  totalLessonsCompleted: number;
  averageXP: number;
}

interface LearningProgressSectionProps {
  stats: Stats;
}

export const LearningProgressSection = memo(function LearningProgressSection({ stats }: LearningProgressSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {stats.totalXP > 0 ? (
          // 進捗がある場合
          <>
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-h2 font-semibold mb-2 text-neutral-900">
                学習の進捗
              </h2>
              <p className="text-sm md:text-body text-neutral-600">
                継続的な学習で、AIスキルを向上させましょう
              </p>
            </div>
            
            <div className="rounded-xl md:rounded-2xl p-4 md:p-8 border bg-neutral-50 border-neutral-200">
              {/* レベルと進捗バー */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6 md:mb-8">
                {/* レベルアイコン */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {stats.currentLevel}
                    </span>
                  </div>
                  <p className="text-xs md:text-caption text-center mt-2 text-neutral-600">
                    レベル {stats.currentLevel}
                  </p>
                </div>
                
                {/* 進捗バー */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm md:text-body font-semibold text-neutral-900">
                      経験値
                    </span>
                    <span className="text-xs md:text-caption text-neutral-600">
                      {stats.totalXP} / {stats.nextLevelXP} XP
                    </span>
                  </div>
                  <div className="h-2 md:h-3 rounded-full overflow-hidden bg-neutral-200">
                    <div 
                      className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-primary-500 to-primary-600"
                      style={{ width: `${(stats.totalXP / stats.nextLevelXP) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs md:text-caption mt-2 text-neutral-500">
                    次のレベルまで {stats.nextLevelXP - stats.totalXP} XP
                  </p>
                </div>
              </div>
              
              {/* 統計 */}
              <div className="grid grid-cols-3 gap-2 md:gap-6">
                <div className="text-center p-2 md:p-4 bg-white rounded-lg border border-neutral-200">
                  <p className="text-xl md:text-3xl font-bold mb-1 text-neutral-900">
                    {stats.totalLessonsCompleted}
                  </p>
                  <p className="text-xs md:text-caption text-neutral-600">
                    レッスン完了
                  </p>
                </div>
                <div className="text-center p-2 md:p-4 bg-white rounded-lg border border-neutral-200">
                  <p className="text-xl md:text-3xl font-bold mb-1 text-neutral-900">
                    0
                  </p>
                  <p className="text-xs md:text-caption text-neutral-600">
                    バッジ獲得
                  </p>
                </div>
                <div className="text-center p-2 md:p-4 bg-white rounded-lg border border-neutral-200">
                  <p className="text-xl md:text-3xl font-bold mb-1 text-neutral-900">
                    {stats.averageXP}
                  </p>
                  <p className="text-xs md:text-caption text-neutral-600">
                    平均XP
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          // 進捗がない場合（初回訪問者）
          <div className="text-center py-8 md:py-12 px-4 md:px-6 rounded-xl md:rounded-2xl border bg-neutral-50 border-neutral-200">
            <GraduationCap className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-primary-500" />
            <h2 className="text-xl md:text-h2 font-semibold mb-3 text-neutral-900">
              AIスキルを体系的に学ぶ
            </h2>
            <p className="text-sm md:text-body mb-6 max-w-xl mx-auto text-neutral-600">
              プロンプトエンジニアリングの基礎から実践まで、
              ステップバイステップで学べるコースを用意しています
            </p>
            <button
              onClick={() => setLocation('/courses')}
              className="btn-primary text-sm md:text-base"
            >
              学習を始める
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
