/**
 * ゲーミフィケーション統計表示コンポーネント
 * Duolingo風の魅力的なデザイン
 */

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Award, Sparkles, Zap, Target } from "lucide-react";
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

  const levelColors: Record<number, { bg: string; text: string; border: string }> = {
    1: { bg: "from-blue-500/20 to-blue-600/10", text: "text-blue-600", border: "border-blue-500/30" },
    2: { bg: "from-purple-500/20 to-purple-600/10", text: "text-purple-600", border: "border-purple-500/30" },
    3: { bg: "from-green-500/20 to-green-600/10", text: "text-green-600", border: "border-green-500/30" },
    4: { bg: "from-orange-500/20 to-orange-600/10", text: "text-orange-600", border: "border-orange-500/30" },
    5: { bg: "from-yellow-500/20 to-yellow-600/10", text: "text-yellow-600", border: "border-yellow-500/30" },
  };

  const colors = levelColors[currentLevel] || levelColors[1];

  return (
    <div className="space-y-4">
      {/* メインのレベル表示カード - コンパクト版 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={cn(
          "relative overflow-hidden border-2",
          `bg-gradient-to-br ${colors.bg} ${colors.border}`
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              {/* 左側: レベル表示 */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* 円形のレベル表示 - 小さく */}
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-3 shadow-md",
                    `bg-gradient-to-br ${colors.bg} ${colors.border} ${colors.text}`
                  )}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      {currentLevel}
                    </motion.div>
                  </div>
                  {/* レベルバッジ - 小さく */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1 shadow-sm"
                  >
                    <Star className="w-3 h-3 fill-current" />
                  </motion.div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className={cn("text-lg font-bold", colors.text)}>
                      {levelNames[currentLevel]}
                    </h3>
                    {currentLevel >= 3 && (
                      <Sparkles className={cn("w-4 h-4", colors.text)} />
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{totalXP}</span>
                    <span className="text-sm text-muted-foreground">XP</span>
                  </div>
                </div>
              </div>

              {/* 右側: 次のレベルへの進捗 */}
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">次のレベルまで</div>
                <div className={cn("text-xl font-bold", colors.text)}>
                  {remainingXP > 0 ? remainingXP : "MAX"}
                </div>
                <div className="text-xs text-muted-foreground">XP必要</div>
              </div>
            </div>

            {/* 進捗バー - コンパクト */}
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {currentLevelXP} / {nextLevelXP === Infinity ? "∞" : nextLevelXP} XP
                </span>
                <span className={cn("font-semibold", colors.text)}>
                  {Math.round(progress * 100)}% 完了
                </span>
              </div>
              <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r",
                    currentLevel === 1 && "from-blue-500 to-blue-600",
                    currentLevel === 2 && "from-purple-500 to-purple-600",
                    currentLevel === 3 && "from-green-500 to-green-600",
                    currentLevel === 4 && "from-orange-500 to-orange-600",
                    currentLevel === 5 && "from-yellow-500 to-yellow-600"
                  )}
                />
                {/* 光るエフェクト */}
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 統計カード（3列） - コンパクト版 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 完了レッスン数 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-md transition-all duration-300 border hover:border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30"
                )}>
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {totalLessonsCompleted}
                  </div>
                  <div className="text-xs text-muted-foreground">レッスン完了</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 獲得バッジ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-md transition-all duration-300 border hover:border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30"
                )}>
                  <Award className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">
                    {totalBadges}
                  </div>
                  <div className="text-xs text-muted-foreground">バッジ獲得</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 学習速度 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-md transition-all duration-300 border hover:border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  "bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30"
                )}>
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">
                    {totalLessonsCompleted > 0 ? Math.round(totalXP / totalLessonsCompleted) : 0}
                  </div>
                  <div className="text-xs text-muted-foreground">平均XP/レッスン</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
