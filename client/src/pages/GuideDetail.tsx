import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, CheckCircle2, Copy, ExternalLink, FileText, Lightbulb, ListTodo, Mail, Search, Send } from "lucide-react";
import { useState } from "react";
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
  }
];

function PromptCard({ promptId }: { promptId: string }) {
  const prompt = fullPrompts.find(p => p.id === promptId);
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

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
        <Link href={`/prompt/${prompt.id}`}>
          <Button variant="outline" size="sm" className="w-full text-xs h-7">
            Try this prompt
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function GuideDetail() {
  const [match, params] = useRoute("/guide/:id");
  const guide = guides.find(g => g.id === params?.id);

  if (!match || !guide) {
    return <div>Guide not found</div>;
  }

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
      </div>

      <Separator />

      {/* Content */}
      <div className="space-y-12">
        {guide.steps.map((step, index) => (
          <div key={index} className="relative pl-8 md:pl-12 border-l border-border/50 pb-12 last:pb-0">
            {/* Timeline Icon */}
            <div className="absolute -left-3 top-0 bg-background p-1 rounded-full border border-border">
              <step.icon className="h-4 w-4 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {step.title}
              </h2>
              <div className="text-muted-foreground leading-relaxed">
                {step.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-muted/30 p-8 rounded-xl text-center space-y-4 mt-12">
        <h3 className="text-xl font-semibold">Ready to start your research?</h3>
        <p className="text-muted-foreground">
          このガイドで紹介したプロンプトを使って、最初のステップ「素材集め」から始めましょう。
        </p>
        <Link href="/prompt/res-timeline-builder">
          <Button size="lg" className="gap-2">
            Start Step 1
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
