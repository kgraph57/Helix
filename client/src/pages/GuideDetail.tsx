import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, CheckCircle2, Copy, ExternalLink, FileText, Lightbulb, ListTodo, Mail, Search, Send, Map, CheckSquare, Square } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { fullPrompts } from "../lib/prompts-full";

// ガイドデータの定義
const guides = [
  {
    id: "case-report-workflow",
    title: "【完全版】初めての症例報告：準備から投稿までの10ステップ",
    description: "「何から始めればいいかわからない」を解決。カルテ整理、英語化、指導医への相談、投稿までをシェルパのように案内します。",
    category: "Research",
    readTime: "15 min read",
    steps: [
      {
        title: "Introduction: なぜ症例報告を書くのか？ (Why Case Reports Matter)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              「忙しい臨床の合間を縫って、なぜわざわざ論文を書くのか？」
              そう思うかもしれません。しかし、症例報告には医学的にも、あなた自身のキャリアにとっても、計り知れない価値があります。
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <span className="text-lg">🌍</span> 医学への貢献
                </h4>
                <p className="text-sm text-muted-foreground">
                  未知の副作用、新しい治療効果、稀な病態...。
                  医学の進歩は常に「たった1人の症例」の報告から始まります。
                  あなたの報告が、地球の裏側の患者さんを救うヒントになるかもしれません。
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                  <span className="text-lg">📈</span> 医師としての成長
                </h4>
                <p className="text-sm text-muted-foreground">
                  1つの症例を徹底的に調べ上げ、論理的に考察することで、
                  病態生理の理解が深まり、臨床能力が飛躍的に向上します。
                  「書くこと」は「深く考えること」そのものです。
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              そして何より、症例報告はあなたの医師としての「生きた証（業績）」となり、キャリアの第一歩となります。
              このガイドは、その第一歩を全力でサポートするために作られました。
            </p>
          </div>
        )
      },
      {
        title: "Map: 症例報告の全体像 (The Anatomy of a Case Report)",
        icon: Map,
        content: (
          <div className="space-y-6">
            <p>
              執筆を始める前に、ゴールの形（論文の構成）を頭に入れておきましょう。
              症例報告は、一般的な原著論文（IMRAD形式）とは少し異なる、独特の構成を持っています。
            </p>
            
            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
              <div className="bg-muted/50 p-4 border-b">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Standard Case Report Structure
                </h4>
              </div>
              <div className="p-6 space-y-6">
                {/* Title & Abstract */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">1</span>
                    <h5 className="font-medium">Title & Abstract</h5>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    読者が最初に（そして唯一）読む部分。検索されやすいキーワードを含め、症例のユニークさを簡潔に伝えます。
                  </p>
                </div>

                {/* Introduction */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">2</span>
                    <h5 className="font-medium">Introduction</h5>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    「なぜこの症例を報告するのか？」を説明します。
                    <br/>
                    1. 疾患の一般的な説明（既知の事実）
                    <br/>
                    2. 今回の症例の何が新しい/重要なのか（Knowledge Gap）
                    <br/>
                    3. この報告の目的
                  </p>
                </div>

                {/* Case Presentation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">3</span>
                    <h5 className="font-medium">Case Presentation (The Core)</h5>
                  </div>
                  <div className="pl-8 grid gap-2 md:grid-cols-2">
                    <div className="bg-muted/30 p-3 rounded text-sm">
                      <span className="font-medium block mb-1">Patient Info</span>
                      年齢、性別、主訴、既往歴
                    </div>
                    <div className="bg-muted/30 p-3 rounded text-sm">
                      <span className="font-medium block mb-1">History</span>
                      現病歴、身体所見
                    </div>
                    <div className="bg-muted/30 p-3 rounded text-sm">
                      <span className="font-medium block mb-1">Diagnosis</span>
                      検査結果、画像所見、鑑別診断
                    </div>
                    <div className="bg-muted/30 p-3 rounded text-sm">
                      <span className="font-medium block mb-1">Intervention</span>
                      治療内容、経過、転帰
                    </div>
                  </div>
                </div>

                {/* Discussion */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">4</span>
                    <h5 className="font-medium">Discussion</h5>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    今回の症例から得られた知見を、過去の文献と比較しながら論じます。
                    <br/>
                    ・類似症例との比較
                    <br/>
                    ・病態生理の考察
                    <br/>
                    ・診断・治療への示唆（Take-home message）
                  </p>
                </div>

                {/* Conclusion */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">5</span>
                    <h5 className="font-medium">Conclusion</h5>
                  </div>
                  <p className="text-sm text-muted-foreground pl-8">
                    最も伝えたいメッセージを1-2文でまとめます。
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              この「地図」を常に意識しながら、各ステップを進めていきましょう。
              それでは、実際の準備（Step 0）に入ります。
            </p>
          </div>
        )
      },
      {
        title: "Step 0: マインドセットと準備 (Before You Start)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              症例報告は、あなたの経験した貴重な症例を医学界の共有財産にする重要な活動です。
              初めて書くときは「完璧な論文」を目指す必要はありません。まずは「形にする」ことを目標にしましょう。
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">準備するものリスト</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>カルテID（個人情報は厳重に管理）</li>
                <li>画像データ（CT/MRI/病理など、匿名化必須）</li>
                <li>患者さんの同意書（病院の書式を確認し、必ず取得する）</li>
                <li>投稿規定（Target JournalのAuthor Guidelines）</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              AIはあなたの「秘書」であり「翻訳家」ですが、最終的な責任者はあなた自身です。
              患者さんのプライバシー保護と、事実の正確性には常に注意を払いましょう。
            </p>
          </div>
        )
      },
      {
        title: "Step 1: 素材集めとタイムライン作成 (Gathering Info)",
        icon: ListTodo,
        content: (
          <div className="space-y-4">
            <p>
              まずはカルテから情報を抜き出し、時系列に並べることから始めます。
              「何を書けばいいかわからない」という悩みは、情報が整理されていないことが原因です。
            </p>
            <p>
              以下のプロンプトを使って、バラバラのメモを整理されたタイムライン表に変換しましょう。
            </p>
            <PromptCard promptId="res-timeline-builder" />
          </div>
        )
      },
      {
        title: "Step 2: 英語化の壁を越える (English Translation)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              日本語で整理した経過を、英語の医学論文調に変換します。
              DeepLなどの一般的な翻訳ツールでは直訳すぎて不自然になることがありますが、
              専用のプロンプトを使えば、"The patient presented with..." のような医学特有の言い回しを適用できます。
            </p>
            <PromptCard promptId="case-presentation" />
          </div>
        )
      },
      {
        title: "Step 3: 文献検索と管理 (Literature Search)",
        icon: Search,
        content: (
          <div className="space-y-4">
            <p>
              あなたの症例の「新規性」や「教育的価値」を主張するためには、過去の類似症例との比較が不可欠です。
              PubMedで効率的に検索し、文献管理ツール（ZoteroやEndNote）で管理しましょう。
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <PromptCard promptId="res-pubmed-query" />
              <PromptCard promptId="res-bibtex-gen" />
            </div>
          </div>
        )
      },
      {
        title: "Step 4: 考察の構成 (Discussion Structure)",
        icon: BookOpen,
        content: (
          <div className="space-y-4">
            <p>
              Discussionは感想文ではありません。「なぜこの症例が重要か」を論理的に説明する場所です。
              以下のテンプレートを使って、論理の骨組み（構成案）を作成しましょう。
            </p>
            <PromptCard promptId="res-intro-flow" />
            <p className="text-sm text-muted-foreground mt-2">
              ※このプロンプトはIntroduction用ですが、Discussionの構成（要約→既知の事実→今回の知見→意義→限界→結論）にも応用できます。
            </p>
          </div>
        )
      },
      {
        title: "Step 5: 指導医への相談 (Consulting Mentor)",
        icon: Mail,
        content: (
          <div className="space-y-4">
            <p>
              ドラフトができたら、必ず指導医に見てもらいましょう。
              「忙しそうで声をかけづらい」という場合は、要点をまとめたメールで依頼するのがスムーズです。
            </p>
            <PromptCard promptId="com-mentor-email" />
          </div>
        )
      },
      {
        title: "Step 6: ジャーナル選定 (Journal Selection)",
        icon: ExternalLink,
        content: (
          <div className="space-y-4">
            <p>
              どの雑誌に投稿するかで、採択率や読者層が変わります。
              症例報告専門誌（Case Reports誌）や、各領域の専門誌から、適切な投稿先を選びましょう。
            </p>
            <PromptCard promptId="res-journal-finder" />
          </div>
        )
      },
      {
        title: "Step 7: 投稿規定チェックとフォーマット (Formatting)",
        icon: CheckCircle2,
        content: (
          <div className="space-y-4">
            <p>
              ジャーナルの規定（Author Guidelines）を守ることは、査読を受けるための最低条件です。
              CAREガイドラインに準拠しているかどうかもチェックしましょう。
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <PromptCard promptId="res-check-care" />
              <PromptCard promptId="res-ref-format-convert" />
            </div>
          </div>
        )
      },
      {
        title: "Step 8: カバーレター作成 (Cover Letter)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              エディターへの手紙（Cover Letter）は、あなたの論文の「セールスレター」です。
              なぜこの症例を掲載すべきなのか、熱意を持って伝えましょう。
            </p>
            <PromptCard promptId="res-cover-letter" />
          </div>
        )
      },
      {
        title: "Step 9: 投稿と査読対応 (Submission & Review)",
        icon: Send,
        content: (
          <div className="space-y-4">
            <p>
              投稿後、査読者からコメント（Revision）が返ってくることがあります。
              これは「不合格」ではなく「より良くするための提案」です。感情的にならず、論理的かつ礼儀正しく対応しましょう。
            </p>
            <PromptCard promptId="res-reviewer-response" />
          </div>
        )
      }
    ]
  },
  {
    id: "statistical-analysis-guide",
    title: "【初心者向け】医学統計解析ガイド：Python/Rで始めるデータ解析",
    description: "「統計ソフトの使い方がわからない」を解決。データの準備から、Python/Rを使った解析コードの生成、結果の解釈までをサポートします。",
    category: "Research",
    readTime: "10 min read",
    steps: [
      {
        title: "Introduction: 統計解析の壁を越える (Overcoming the Statistics Barrier)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              「P値って何？」「どの検定を使えばいいの？」
              多くの医師にとって、統計解析は研究の最大のハードルです。しかし、現代ではAIが強力なパートナーとなります。
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <span className="text-lg">🤖</span> AI時代の統計解析
              </h4>
              <p className="text-sm text-muted-foreground">
                複雑な数式を覚える必要はありません。
                「何を比較したいか（目的）」と「どんなデータか（構造）」を明確にすれば、
                AIが適切な解析コードを書いてくれます。
                あなたの役割は、医学的な仮説を立てることと、結果を正しく解釈することです。
              </p>
            </div>
          </div>
        )
      },
      {
        title: "Step 1: データの準備とクリーニング (Data Preparation)",
        icon: ListTodo,
        content: (
          <div className="space-y-4">
            <p>
              解析の8割はデータ整理（Data Cleaning）で決まります。
              Excelでデータを入力する際は、以下のルールを守りましょう。
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>1行1症例、1列1変数にする（Tidy Data）</li>
              <li>空白セルを作らない（欠損値は空欄ではなくNAなど統一）</li>
              <li>全角文字を使わず、半角英数のみにする</li>
              <li>単位や記号（%, mg/dL）をセルに入れない</li>
            </ul>
          </div>
        )
      },
      {
        title: "Step 2: 解析コードの生成 (Code Generation)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              データが整ったら、解析コードを作成します。
              Python（pandas/scipy）またはR（tidyverse/tableone）のコードを生成できます。
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Pythonで解析する場合</h4>
                <p className="text-xs text-muted-foreground">汎用性が高く、機械学習への応用も容易です。</p>
                <PromptCard promptId="res-stats-python" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Rで解析する場合</h4>
                <p className="text-xs text-muted-foreground">医学統計に特化したパッケージが豊富です。</p>
                <PromptCard promptId="res-stats-r" />
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Step 3: 結果の解釈と記述 (Interpretation & Writing)",
        icon: Search,
        content: (
          <div className="space-y-4">
            <p>
              出力された結果（P値、信頼区間、オッズ比など）を読み解き、論文のResultsセクションに記述します。
              単に「有意差があった」だけでなく、その臨床的な意味（Clinical Significance）を考えることが重要です。
            </p>
            <PromptCard promptId="res-stat-interpretation" />
          </div>
        )
      }
    ]
  },
  {
    id: "conference-presentation-guide",
    title: "【完全版】学会発表ガイド：抄録からスライド、発表原稿まで",
    description: "「スライド作りが苦手」「発表で緊張する」を克服。抄録作成、スライド構成、原稿作成、質疑応答対策までをトータルサポートします。",
    category: "Research",
    readTime: "12 min read",
    steps: [
      {
        title: "Introduction: 良い発表とは何か？ (What Makes a Great Presentation)",
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <p>
              学会発表の目的は「知識をひけらかすこと」ではありません。「聴衆に新しい知見を持ち帰ってもらうこと」です。
              良い発表には、明確なストーリーと、視覚的にわかりやすいスライドが不可欠です。
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 flex items-center gap-2">
                <span className="text-lg">🎤</span> プレゼンテーションの3要素
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Content (内容)</strong>: 論理的で新規性があるか</li>
                <li><strong>Design (視覚)</strong>: 見やすく、直感的に理解できるか</li>
                <li><strong>Delivery (伝達)</strong>: 声の大きさ、抑揚、アイコンタクト</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        title: "Step 1: 抄録（Abstract）の作成 (Abstract Writing)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              まずは学会にエントリーするための抄録を作成します。
              限られた文字数の中で、研究の魅力を最大限に伝える必要があります。
            </p>
            <PromptCard promptId="res-abstract-generator" />
          </div>
        )
      },
      {
        title: "Step 2: スライド構成の設計 (Slide Structure)",
        icon: Map,
        content: (
          <div className="space-y-4">
            <p>
              いきなりPowerPointを開いてはいけません。まずは紙とペン（またはAI）で全体の構成を練りましょう。
              1枚のスライドには1つのメッセージ（One Slide, One Message）が原則です。
            </p>
            <PromptCard promptId="res-slide-structure" />
          </div>
        )
      },
      {
        title: "Step 3: スライドの中身を作る (Slide Content)",
        icon: ListTodo,
        content: (
          <div className="space-y-4">
            <p>
              スライドに文字を詰め込みすぎていませんか？
              聴衆は「読む」のではなく「見る」ために来ています。箇条書きは短く、図表を大きく使いましょう。
            </p>
            <PromptCard promptId="res-slide-content" />
          </div>
        )
      },
      {
        title: "Step 4: 発表原稿の作成 (Script Writing)",
        icon: FileText,
        content: (
          <div className="space-y-4">
            <p>
              スライドをそのまま読み上げるのはNGです。
              話し言葉で、スライドを補足するような原稿を作成しましょう。時間は厳守です（1分あたり300文字程度が目安）。
            </p>
            <PromptCard promptId="res-presentation-script" />
          </div>
        )
      },
      {
        title: "Step 5: 質疑応答対策 (Q&A Preparation)",
        icon: CheckCircle2,
        content: (
          <div className="space-y-4">
            <p>
              発表で最も緊張するのが質疑応答です。
              しかし、来る質問はある程度予測できます。事前に回答を用意しておけば、落ち着いて対応できます。
            </p>
            <PromptCard promptId="res-qa-prep" />
          </div>
        )
      }
    ]
  }
];

function PromptCard({ promptId }: { promptId: string }) {
  const prompt = fullPrompts.find(p => p.id === promptId);
  const [copied, setCopied] = useState(false);

  if (!prompt) {
    // デバッグ用：プロンプトが見つからない場合の表示
    return (
      <Card className="bg-red-50 border-red-200 border-dashed">
        <CardContent className="p-4 text-red-500 text-sm">
          Prompt not found: {promptId}
        </CardContent>
      </Card>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-muted/50 border-dashed">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            {prompt.title}
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
            {copied ? <CheckCircle2 className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
          </Button>
        </div>
        <CardDescription className="text-xs line-clamp-1">
          {prompt.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <Link href={`/prompts/${prompt.id}`}>
          <Button variant="outline" size="sm" className="w-full text-xs h-7">
            Try this prompt
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:id");
  const guide = guides.find(g => g.id === params?.id);
  
  // Progress tracking state
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    if (guide) {
      const savedProgress = localStorage.getItem(`guide-progress-${guide.id}`);
      if (savedProgress) {
        try {
          setCompletedSteps(JSON.parse(savedProgress));
        } catch (e) {
          console.error("Failed to parse progress", e);
        }
      }
    }
  }, [guide]);

  // Toggle step completion
  const toggleStep = (index: number) => {
    if (!guide) return;
    
    const newCompletedSteps = completedSteps.includes(index)
      ? completedSteps.filter(i => i !== index)
      : [...completedSteps, index];
    
    setCompletedSteps(newCompletedSteps);
    localStorage.setItem(`guide-progress-${guide.id}`, JSON.stringify(newCompletedSteps));
  };

  if (!match || !guide) {
    return <div>Guide not found</div>;
  }

  const progressPercentage = Math.round((completedSteps.length / guide.steps.length) * 100);

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/guides">
          <Button variant="ghost" size="sm" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Guides
          </Button>
        </Link>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
              {guide.category}
            </span>
            <span>•</span>
            <span>{guide.readTime}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{guide.title}</h1>
          <p className="text-lg text-muted-foreground">{guide.description}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercentage}% Completed</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Content */}
      <div className="space-y-12">
        {guide.steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          
          return (
            <div key={index} className={`relative pl-8 md:pl-12 border-l ${isCompleted ? 'border-primary' : 'border-border/50'} pb-12 last:pb-0 transition-colors duration-300`}>
              {/* Timeline Icon */}
              <div className={`absolute -left-3 top-0 p-1 rounded-full border transition-colors duration-300 ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-border text-primary'}`}>
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h2 className={`text-xl font-semibold flex items-center gap-2 ${isCompleted ? 'text-primary' : ''}`}>
                    {step.title}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`shrink-0 gap-2 ${isCompleted ? 'text-primary hover:text-primary/80' : 'text-muted-foreground'}`}
                    onClick={() => toggleStep(index)}
                  >
                    {isCompleted ? (
                      <>
                        <CheckSquare className="h-4 w-4" />
                        Done
                      </>
                    ) : (
                      <>
                        <Square className="h-4 w-4" />
                        Mark as Done
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-muted-foreground leading-relaxed">
                  {step.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="bg-muted/30 p-8 rounded-xl text-center space-y-4 mt-12">
        <h3 className="text-xl font-semibold">Ready to start your research?</h3>
        <p className="text-muted-foreground">
          このガイドで紹介したプロンプトを使って、最初のステップ「素材集め」から始めましょう。
        </p>
        <Link href="/prompts/res-timeline-builder">
          <Button size="lg" className="gap-2">
            Start Step 1
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
