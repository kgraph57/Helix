import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { usePromptStats } from "@/hooks/usePromptStats";
import { fullPrompts } from "@/lib/prompts-full";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export function PopularPromptsRanking() {
  const { getTopPrompts } = usePromptStats();
  const topUsage = getTopPrompts(5);

  if (topUsage.length === 0) {
    return null;
  }

  const topPrompts = topUsage
    .map(usage => {
      const prompt = fullPrompts.find(p => p.id === usage.promptId);
      return prompt ? { ...prompt, usageCount: usage.count } : null;
    })
    .filter(Boolean);

  if (topPrompts.length === 0) {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-orange-900 dark:text-orange-400 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          あなたがよく使うプロンプト TOP 5
        </CardTitle>
        <CardDescription className="text-xs text-orange-700 dark:text-orange-400">
          使用回数に基づくランキング
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {topPrompts.map((prompt, index) => (
          <Link key={prompt!.id} href={`/prompts/${prompt!.id}`}>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-orange-900/20 transition-colors cursor-pointer">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <span className="text-xs font-bold text-orange-700 dark:text-orange-400">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-300 truncate">
                  {prompt!.title}
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-400">
                  使用回数: {prompt!.usageCount}回
                </p>
              </div>
              <Badge variant="outline" className="flex-shrink-0 text-xs border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-400">
                {prompt!.category}
              </Badge>
            </div>
          </Link>
        ))}
        <p className="text-xs text-orange-700 dark:text-orange-400 mt-3">
          💡 Tip: よく使うプロンプトはお気に入りに登録すると便利です
        </p>
      </CardContent>
    </Card>
  );
}
