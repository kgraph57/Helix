import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPromptById, loadPrompts } from "@/lib/prompts-loader";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowLeft, Bookmark, Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { CollapsibleWarning } from "@/components/CollapsibleWarning";
import { ShareButtons } from "@/components/ShareButtons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { usePromptStats } from "@/hooks/usePromptStats";
import { Link, useRoute, useLocation } from "wouter";
import { trackPromptCopy, trackPromptView } from "@/lib/analytics";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";
import type { Prompt } from "@/lib/prompts";

export default function PromptDetail() {
  const [match, params] = useRoute("/prompts/:id");
  const [, setLocation] = useLocation();
  const promptId = match ? params.id : null;
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // プロンプトデータの遅延ロード
  useEffect(() => {
    if (!promptId) return;
    
    loadPrompts().then((loadedPrompts) => {
      setPrompts(loadedPrompts);
      const foundPrompt = loadedPrompts.find((p) => p.id === promptId);
      setPrompt(foundPrompt);
      setIsLoading(false);
    });
  }, [promptId]);
  
  // 前後のプロンプトを取得
  const currentIndex = promptId ? prompts.findIndex((p) => p.id === promptId) : -1;
  const prevPrompt = currentIndex > 0 ? prompts[currentIndex - 1] : null;
  const nextPrompt = currentIndex < prompts.length - 1 ? prompts[currentIndex + 1] : null;
  
  // スワイプジェスチャーで前後のプロンプトに移動
  useSwipeGesture({
    onSwipeLeft: () => {
      if (nextPrompt) {
        setLocation(`/prompts/${nextPrompt.id}`);
        toast.success(`次のプロンプト: ${nextPrompt.title}`);
      }
    },
    onSwipeRight: () => {
      if (prevPrompt) {
        setLocation(`/prompts/${prevPrompt.id}`);
        toast.success(`前のプロンプト: ${prevPrompt.title}`);
      }
    },
    threshold: 100
  });

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { trackPromptUsage } = usePromptStats();

  const isFavorite = (id: string) => favorites.includes(id);

  // SEO設定とプロンプト閲覧を追跡
  useEffect(() => {
    if (prompt) {
      // SEO最適化
      updateSEO({
        title: `${prompt.title} | Helix`,
        description: prompt.description || `${prompt.title}のプロンプト。医療従事者がAIを効果的に活用するための実践的なプロンプトです。`,
        path: `/prompts/${prompt.id}`,
        keywords: `${prompt.title},${prompt.category},医療,AI,プロンプト,${prompt.tags?.join(',') || ''}`,
        ogImage: prompt.image ? `${BASE_URL}${prompt.image}` : undefined
      });

      // 構造化データ（Article）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": prompt.title,
        "description": prompt.description || `${prompt.title}のプロンプト`,
        "author": {
          "@type": "Organization",
          "name": "Helix"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Helix",
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/og-image-new.png`
          }
        },
        "datePublished": prompt.createdAt || new Date().toISOString(),
        "dateModified": prompt.updatedAt || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/prompts/${prompt.id}`
        }
      });

      trackPromptView(prompt.id, prompt.title);
    }
  }, [prompt]);

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </Layout>
    );
  }

  if (!prompt) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">プロンプトが見つかりません</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (key: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const generatePrompt = () => {
    let content = prompt.template;
    prompt.inputs.forEach((input) => {
      const value = inputValues[input.key] || `[${input.label}]`;
      content = content.replace(new RegExp(`{{${input.key}}}`, "g"), value);
    });
    return content;
  };

  const handleCopy = async () => {
    const content = generatePrompt();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      
      // 高リスクプロンプトの場合は追加の警告を表示
      if (prompt.riskLevel === 'high') {
        toast.warning("⚠️ 重要：AIの出力は参考情報です。必ず臨床判断とファクトチェックを行ってください。", {
          duration: 5000,
        });
      } else {
        toast.success("クリップボードにコピーしました");
      }
      
      // GA4にコピーイベントを送信
      trackPromptCopy(prompt.id, prompt.title);
      // 使用統計を記録
      trackPromptUsage(prompt.id);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("コピーに失敗しました");
    }
  };

  const handleReset = () => {
    setInputValues({});
    toast.info("入力をリセットしました");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヘッダー - AIスタートアップ風 */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <Link href={`/category/${prompt.category}`}>
              <Button variant="ghost" size="icon" className="rounded-lg h-9 w-9 hover:bg-accent/50 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                      {prompt.title}
                    </h1>
                {prompt.riskLevel === 'high' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                        <AlertTriangle className="w-3 h-3 mr-1.5" />
                    高リスク
                  </span>
                )}
                {prompt.riskLevel === 'medium' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                    中リスク
                  </span>
                )}
              </div>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    {prompt.description}
                  </p>
            </div>
                <div className="flex items-center gap-1 flex-shrink-0">
              <ShareButtons 
                title={prompt.title}
                url={window.location.href}
                description={prompt.description}
              />
                  <Tooltip>
                    <TooltipTrigger asChild>
              <Button
                        variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(prompt.id)}
                className={cn(
                          "h-9 w-9 text-muted-foreground transition-all duration-200 rounded-lg",
                          isFavorite(prompt.id) 
                            ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20" 
                            : "hover:text-foreground hover:bg-accent/50"
                        )}
                        aria-label={isFavorite(prompt.id) ? "お気に入りから削除" : "お気に入りに追加"}
              >
                        <Bookmark className={cn(
                          "w-4 h-4 transition-all",
                          isFavorite(prompt.id) ? "fill-current" : ""
                        )} />
              </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{isFavorite(prompt.id) ? "お気に入りから削除" : "お気に入りに追加"}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 入力フォームとプロンプトプレビューを横並び（デスクトップ） - AIスタートアップ風 */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* 入力フォームエリア（左） */}
          <Card 
            className="flex-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.08)] bg-background backdrop-blur-sm"
            style={{
              outline: '1px solid rgba(0, 0, 0, 0.06)',
              outlineOffset: '-1px',
            }}
          >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground">入力項目</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                    <RefreshCw className="w-4 h-4 mr-2" /> リセット
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ScrollArea className="h-[450px] lg:h-[550px] pr-4">
                  <div className="space-y-4">
                    {prompt.inputs.map((input) => (
                      <div key={input.key} className="space-y-2">
                        <Label htmlFor={input.key} className="text-sm font-medium text-foreground">
                          {input.label}
                        </Label>
                        {input.type === "textarea" ? (
                          <Textarea
                            id={input.key}
                            placeholder={input.placeholder}
                            value={inputValues[input.key] || ""}
                            onChange={(e) => handleInputChange(input.key, e.target.value)}
                            className="min-h-[140px] resize-y transition-all"
                          />
                        ) : input.type === "select" ? (
                          <Select
                            value={inputValues[input.key] || ""}
                            onValueChange={(value) => handleInputChange(input.key, value)}
                          >
                            <SelectTrigger id={input.key} className="border-border/50 focus:border-primary/50">
                              <SelectValue placeholder={input.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {input.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={input.key}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={inputValues[input.key] || ""}
                            onChange={(e) => handleInputChange(input.key, e.target.value)}
                            className="transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

          {/* プロンプト出力エリア（右） */}
          <Card 
            className="flex-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.08)] bg-background backdrop-blur-sm"
            style={{
              outline: '1px solid rgba(0, 0, 0, 0.06)',
              outlineOffset: '-1px',
            }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  プロンプトプレビュー
                </CardTitle>
                <Button 
                  onClick={handleCopy} 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-all",
                    copied && "text-green-600 dark:text-green-400"
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" /> コピー完了
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> コピー
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ScrollArea className="h-[450px] lg:h-[550px]">
                <div className="relative group">
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-background p-5 rounded-xl leading-relaxed shadow-inner">
                  {generatePrompt()}
                </pre>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

          {/* 警告メッセージ（折りたたみ式）- AIスタートアップ風 */}
          {prompt.warningMessage && (
            <div className="mt-6">
              <CollapsibleWarning message={prompt.warningMessage} defaultOpen={false} />
            </div>
          )}
      </main>
    </div>
  );
}
