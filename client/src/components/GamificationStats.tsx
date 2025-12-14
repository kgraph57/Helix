/**
 * ゲーミフィケーション統計表示コンポーネント
 * 世界最高水準のWebデザイン基準に基づいた最適化版
 * 
 * 設計原則:
 * - 8pxグリッドシステム
 * - 適切な情報密度
 * - 明確な視覚的階層
 * - スキャン可能なデザイン
 */

import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Zap, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GamificationStatsProps {
  totalXP: number;
  currentLevel: number;
  totalLessonsCompleted: number;
  totalBadges?: number;
}

/**
 * レベル計算（フロントエンド用）
 */
function calculateLevel(totalXP: number): number {
  if (totalXP < 100) return 1;
  if (totalXP < 300) return 2;
  if (totalXP < 600) return 3;
  if (totalXP < 1000) return 4;
  return 5;
}

/**
 * 次のレベルまでのXPを計算
 */
function getXPForNextLevel(currentLevel: number): number {
  const levelThresholds: Record<number, number> = {
    1: 100,
    2: 300,
    3: 600,
    4: 1000,
    5: Infinity,
  };
  return levelThresholds[currentLevel] || Infinity;
}

/**
 * XP進捗を計算
 */
function getXPProgress(totalXP: number) {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const previousLevelXP = currentLevel === 1 ? 0 : getXPForNextLevel(currentLevel - 1);
  const currentLevelXP = totalXP - previousLevelXP;
  const levelRange = nextLevelXP - previousLevelXP;
  const progress = levelRange === Infinity ? 1 : currentLevelXP / levelRange;

  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    progress: Math.min(1, Math.max(0, progress)),
    remainingXP: levelRange === Infinity ? 0 : levelRange - currentLevelXP,
  };
}

export function GamificationStats({
  totalXP,
  currentLevel,
  totalLessonsCompleted,
  totalBadges = 0,
}: GamificationStatsProps) {
  const { currentLevelXP, nextLevelXP, progress, remainingXP } = getXPProgress(totalXP);
  const levelNames: Record<number, string> = {
    1: "初心者",
    2: "初級者",
    3: "中級者",
    4: "上級者",
    5: "エキスパート",
  };

  const levelColors: Record<number, { 
    bg: string; 
    text: string; 
    border: string;
    progress: string;
  }> = {
    1: { 
      bg: "from-blue-500/10 to-blue-600/5", 
      text: "text-blue-600", 
      border: "border-blue-500/20",
      progress: "from-blue-500 to-blue-600"
    },
    2: { 
      bg: "from-blue-500/10 to-blue-600/5", 
      text: "text-blue-600", 
      border: "border-blue-500/20",
      progress: "from-blue-500 to-blue-600"
    },
    3: { 
      bg: "from-green-500/10 to-green-600/5", 
      text: "text-green-600", 
      border: "border-green-500/20",
      progress: "from-green-500 to-green-600"
    },
    4: { 
      bg: "from-orange-500/10 to-orange-600/5", 
      text: "text-orange-600", 
      border: "border-orange-500/20",
      progress: "from-orange-500 to-orange-600"
    },
    5: { 
      bg: "from-yellow-500/10 to-yellow-600/5", 
      text: "text-yellow-600", 
      border: "border-yellow-500/20",
      progress: "from-yellow-500 to-yellow-600"
    },
  };

  const colors = levelColors[currentLevel] || levelColors[1];

  return (
    <div className="space-y-3">
      {/* メインカード: レベル・XP・進捗（高さ約120px） */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={cn(
          "relative overflow-hidden border",
          `bg-gradient-to-br ${colors.bg} ${colors.border}`
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              {/* 左側: レベル表示 */}
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className={cn(
                    "w-14 h-10 lg:h-11 rounded-full flex items-center justify-center text-xl font-bold border-2 shadow-sm",
                    `bg-gradient-to-br ${colors.bg} ${colors.border} ${colors.text}`
                  )}>
                    {currentLevel}
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground rounded-full p-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className={cn("text-base font-semibold truncate", colors.text)}>
                      {levelNames[currentLevel]}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold leading-none">{totalXP}</span>
                    <span className="text-xs text-muted-foreground">XP</span>
                  </div>
                </div>
              </div>

              {/* 右側: 次のレベルまでの進捗 */}
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] text-muted-foreground mb-0.5">次のレベルまで</div>
                <div className={cn("text-lg font-bold leading-none", colors.text)}>
                  {remainingXP > 0 ? remainingXP : "MAX"}
                </div>
                <div className="text-[10px] text-muted-foreground">XP必要</div>
              </div>
            </div>

            {/* 進捗バー（コンパクト） */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-muted-foreground">
                  {currentLevelXP} / {nextLevelXP === Infinity ? "∞" : nextLevelXP}
                </span>
                <span className={cn("text-[10px] font-semibold", colors.text)}>
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div className="relative h-2 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r",
                    colors.progress
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 統計カード（3列、高さ約80px） */}
      <div className="grid grid-cols-3 gap-2">
        {/* 完了レッスン数 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-sm transition-all duration-200 border h-full">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-green-500/15 to-green-600/10 border border-green-500/20"
                )}>
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-xl font-bold text-green-600 leading-none">
                  {totalLessonsCompleted}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">
                  レッスン完了
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 獲得バッジ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="hover:shadow-sm transition-all duration-200 border h-full">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-yellow-500/15 to-yellow-600/10 border border-yellow-500/20"
                )}>
                  <Award className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="text-xl font-bold text-yellow-600 leading-none">
                  {totalBadges}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">
                  バッジ獲得
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 学習速度 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-sm transition-all duration-200 border h-full">
            <CardContent className="p-3">
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-blue-500/15 to-blue-600/10 border border-blue-500/20"
                )}>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-blue-600 leading-none">
                  {totalLessonsCompleted > 0 ? Math.round(totalXP / totalLessonsCompleted) : 0}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">
                  平均XP
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
