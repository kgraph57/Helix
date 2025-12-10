/**
 * 実践のヒントコンポーネント
 * シンプルで読みやすい形式で実践のポイントを表示
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-lg">実践のヒント: {tip.title}</CardTitle>
        </div>
        <CardDescription>{tip.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ヒントリスト */}
        <ul className="space-y-2">
          {tip.tips.map((tipText, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
              <span className="text-sm text-foreground">{tipText}</span>
            </li>
          ))}
        </ul>

        {/* リソースリンク */}
        {tip.resources && tip.resources.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <p className="text-sm font-medium">参考リソース:</p>
            <div className="flex flex-wrap gap-2">
              {tip.resources.map((resource, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {resource.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
