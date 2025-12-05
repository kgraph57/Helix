import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, CheckCircle2, Copy, Database, FileText, Lightbulb, PenTool, Search, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function GuidePaperWriting() {
  const [activeTab, setActiveTab] = useState("step1");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard");
  };

  const steps = [
    {
      id: "step1",
      title: "Step 1: ネタ探し (Topic/Idea Search)",
      icon: Search,
      description: "「ネタ（研究テーマ）× シャリ（論理的展開）= 論文」。良いネタだけでは不十分です。",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              FINER基準：テーマ選定の羅針盤
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Feasible (実行可能か)</span>
                  <p className="text-sm text-muted-foreground">現実的に実施可能な研究か？時間、資金、症例数は十分か？</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Interesting (興味深いか)</span>
                  <p className="text-sm text-muted-foreground">自分や読者にとって興味深いテーマか？</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Novel (新規性はあるか)</span>
                  <p className="text-sm text-muted-foreground">新しい知見やアプローチがあるか？過去の研究の焼き直しではないか？</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Ethical (倫理的か)</span>
                  <p className="text-sm text-muted-foreground">倫理的・道徳的に問題がないか？IRB承認は得られるか？</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold">Relevant (妥当性があるか)</span>
                  <p className="text-sm text-muted-foreground">臨床的に意味のある研究か？将来の医療に貢献するか？</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">よくあるトラブルと解決策</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">先行研究がある</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">切り口を変えてみる！対象患者、評価項目、解析手法を変えるだけで新規性が生まれます。</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">症例数が少ない</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">少なくても論文になります！詳細な症例報告やケースシリーズとして価値を出せます。多施設共同研究も視野に。</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">流行に乗れていない</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">学会抄録集を見てトレンドを把握しましょう。ただし、流行を追うだけでなく、普遍的な臨床疑問も重要です。</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Prompt: FINER基準チェック
              </h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard("私の研究テーマ案は「[テーマ]」です。このテーマをFINER基準（Feasible, Interesting, Novel, Ethical, Relevant）に基づいて評価し、改善点を提案してください。")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground font-mono bg-background p-2 rounded border">
              私の研究テーマ案は「[テーマ]」です。このテーマをFINER基準（Feasible, Interesting, Novel, Ethical, Relevant）に基づいて評価し、改善点を提案してください。
            </p>
          </div>
        </div>
      )
    },
    {
      id: "step2",
      title: "Step 2: データ収集・解析 (Data Collection & Analysis)",
      icon: Database,
      description: "項目選びが最重要。不足すると手戻り、多すぎると疲弊します。",
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Database className="w-5 h-5" />
                データ収集の鉄則
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">先行研究を参考に:</span>
                  項目選びはここが全て。独自に考えると必ず抜け漏れが出ます。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">入力形式の統一:</span>
                  性別はM/F、数値は単位なしで統一。後でクリーニングする手間を省きます。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">Pilot Study:</span>
                  50例程度で一旦解析してみる。傾向が見えればGo、ダメなら修正。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">バックアップ:</span>
                  iCloud、外付けHDDなど複数箇所に。個人情報保護も忘れずに。
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                統計解析のコツ
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">ソフトは何でもOK:</span>
                  JMP, EZR(無料), SPSSなど。使いやすいものを選びましょう。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">習うより慣れろ:</span>
                  まずは動かしてみる。エラーが出たらAIやネットで検索すれば解決します。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">出力形式:</span>
                  Table用はExcel、Figure用はPowerPoint（高解像度設定）に出力。
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Prompt: データ収集項目リスト作成
              </h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard("「[研究テーマ]」に関する臨床研究を計画しています。先行研究を参考に、データ収集シートに含めるべき必須項目（患者背景、検査値、アウトカムなど）をリストアップしてください。")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground font-mono bg-background p-2 rounded border">
              「[研究テーマ]」に関する臨床研究を計画しています。先行研究を参考に、データ収集シートに含めるべき必須項目（患者背景、検査値、アウトカムなど）をリストアップしてください。
            </p>
          </div>
        </div>
      )
    },
    {
      id: "step3",
      title: "Step 3: 論文執筆 (Paper Writing)",
      icon: PenTool,
      description: "論文には「型」があります。MethodsとResultsを最優先に書きましょう。",
      content: (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-4 text-center">論文執筆の推奨順序</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
              <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border w-full md:w-auto text-center">
                <span className="font-bold block mb-1 text-blue-600">1. Methods & Results</span>
                <span className="text-xs text-muted-foreground">最優先・ペアで書く</span>
              </div>
              <ArrowLeft className="hidden md:block w-4 h-4 rotate-180 text-muted-foreground" />
              <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border w-full md:w-auto text-center">
                <span className="font-bold block mb-1 text-green-600">2. Intro & Conclusion</span>
                <span className="text-xs text-muted-foreground">同時に書く</span>
              </div>
              <ArrowLeft className="hidden md:block w-4 h-4 rotate-180 text-muted-foreground" />
              <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border w-full md:w-auto text-center">
                <span className="font-bold block mb-1">3. Discussion</span>
                <span className="text-xs text-muted-foreground">既報との比較</span>
              </div>
              <ArrowLeft className="hidden md:block w-4 h-4 rotate-180 text-muted-foreground" />
              <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm border w-full md:w-auto text-center">
                <span className="font-bold block mb-1">4. Abstract & Title</span>
                <span className="text-xs text-muted-foreground">最後に要約</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Methods & Results (The Core)</h4>
              <p className="text-sm text-muted-foreground">
                これらは1対1で対応します。Methodsに書いたことは必ずResultsで結果を示し、Resultsにある結果は必ずMethodsで方法を説明します。
                考察は一切含めず、淡々と事実のみを記述します。
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Introduction & Conclusion (The Frame)</h4>
              <p className="text-sm text-muted-foreground">
                Introの最後で提示した「問い（Research Question）」に対する「答え」をConclusionで単刀直入に述べます。
                この整合性が論文の背骨となります。
              </p>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Prompt: Methodsセクションドラフト
              </h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard("以下の研究デザイン情報を基に、医学論文のMethodsセクションのドラフトを英語で作成してください。\n\n[研究デザイン情報]")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground font-mono bg-background p-2 rounded border">
              以下の研究デザイン情報を基に、医学論文のMethodsセクションのドラフトを英語で作成してください。
              <br/>
              [研究デザイン情報]
            </p>
          </div>
        </div>
      )
    },
    {
      id: "step4",
      title: "Step 4: ジャーナル投稿・査読 (Submission & Review)",
      icon: Send,
      description: "投稿ボタンを押すまでが執筆です。査読対応こそが論文の質を高めます。",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">投稿前の最終チェック</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>ハゲタカジャーナルではありませんか？</li>
              <li>COI（利益相反）申告書は準備しましたか？</li>
              <li>患者同意書や倫理委員会承認書は手元にありますか？</li>
              <li>図表の解像度や形式は規定通りですか？</li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">査読プロセスの現実</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-100 dark:border-red-800">
                <span className="font-bold text-red-800 dark:text-red-300 block mb-1">Reject (却下)</span>
                <p className="text-xs text-muted-foreground">
                  最初はこれが多いです（約46%）。落ち込まず、次のジャーナルへ。
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-100 dark:border-yellow-800">
                <span className="font-bold text-yellow-800 dark:text-yellow-300 block mb-1">Major Revision</span>
                <p className="text-xs text-muted-foreground">
                  第一関門突破！大幅な修正が必要ですが、チャンスです。
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border border-green-100 dark:border-green-800">
                <span className="font-bold text-green-800 dark:text-green-300 block mb-1">Accept (採択)</span>
                <p className="text-xs text-muted-foreground">
                  一発採択は稀（約5%）。修正を経て勝ち取るものです。
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              ※データ出典: ScholarOne Manuscript (162誌, 32,796編の解析)
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Prompt: 査読コメントへの回答作成
              </h4>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard("査読者から以下の指摘を受けました。これに対する礼儀正しく、かつ論理的な回答案（Rebuttal）を英語で作成してください。\n\n[査読コメント]")}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground font-mono bg-background p-2 rounded border">
              査読者から以下の指摘を受けました。これに対する礼儀正しく、かつ論理的な回答案（Rebuttal）を英語で作成してください。
              <br/>
              [査読コメント]
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8">
        <Link href="/guides">
          <Button variant="ghost" className="mb-4 pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">論文執筆の4ステップ</h1>
            <p className="text-muted-foreground mt-1">
              ネタ探しから投稿まで、忙しい臨床医のための実践的ロードマップ
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="flex flex-col">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveTab(step.id)}
                        className={`flex items-center gap-3 p-4 text-sm font-medium transition-colors text-left border-l-2 ${
                          activeTab === step.id
                            ? "bg-muted border-primary text-primary"
                            : "border-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-2">{step.title}</span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id} className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    {step.content}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
