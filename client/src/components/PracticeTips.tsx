/**
 * 実践のヒントコンポーネント
 * シンプルで読みやすい形式で実践のポイントを表示
 */

import { Lightbulb, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PracticeTip {
  id: string;
  title: string;
  description: string;
  tips: string[];
  resources?: { label: string; url: string }[];
}

interface PracticeTipsProps {
  tip: PracticeTip;
}

export function PracticeTips({ tip }: PracticeTipsProps) {
  return (
    <div className="my-8 py-6 border-l-4 border-l-blue-500 pl-6 bg-blue-50/30 dark:bg-blue-900/10">
      {/* タイトル */}
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-foreground">実践のヒント: {tip.title}</h3>
      </div>

      {/* 説明 */}
      <p className="text-sm text-muted-foreground mb-4">{tip.description}</p>

      {/* ヒントリスト */}
      <ul className="space-y-2 mb-4">
        {tip.tips.map((tipText, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
            <span className="text-sm text-foreground leading-relaxed">{tipText}</span>
          </li>
        ))}
      </ul>

      {/* リソースリンク */}
      {tip.resources && tip.resources.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-border/50">
          <p className="text-sm font-medium">参考リソース:</p>
          <div className="flex flex-wrap gap-2">
            {tip.resources.map((resource, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => window.open(resource.url, "_blank")}
                className="text-xs"
              >
                {resource.label}
                <ExternalLink className="ml-1 w-3 h-3" />
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
