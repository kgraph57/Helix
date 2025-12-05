import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, Check, ExternalLink } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { fullPrompts } from "@/lib/prompts-full";
import { cn } from "@/lib/utils";

// 記事データの型定義
type GuideSection = {
  title: string;
  content: React.ReactNode;
  relatedPromptId?: string;
};

type GuideData = {
  id: string;
  title: string;
  subtitle: string;
  sections: GuideSection[];
};

// 記事データ（本来は別ファイルやCMSから取得するが、今回はここにハードコード）
const guidesData: Record<string, GuideData> = {
  "case-report-workflow": {
    id: "case-report-workflow",
    title: "症例報告作成ワークフロー",
    subtitle: "AIを活用して「400m走」のように最短距離で完走する",
    sections: [
      {
        title: "はじめに：症例報告は「400m走」である",
        content: (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              多くの若手医師にとって、初めての症例報告は「終わりの見えないマラソン」のように感じられるかもしれません。
              しかし、適切な手順とツールがあれば、それは「400m走」のような、短期間で集中して走り切れる競技に変わります。
            </p>
            <p>
              このガイドでは、Medical Prompt Hubのプロンプトを実際の執筆フローのどのタイミングで使うか、
              具体的なステップバイステップで解説します。
            </p>
          </div>
        )
      },
      {
        title: "Phase 1: 素材の準備とCAREチェック (Start Dash)",
        content: (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              まずは手元にあるカルテ情報を整理します。いきなり書き始めるのではなく、
              「何が足りないか」を最初に把握することが重要です。
            </p>
            <p>
              ここで使うのが <strong>CAREチェックリスト</strong> です。
              AIに現状の情報を投げると、ガイドライン上不足している視点（例：患者の主観的体験、タイムラインの明記など）を指摘してくれます。
            </p>
          </div>
        ),
        relatedPromptId: "res-check-care"
      },
      {
        title: "Phase 2: 症例提示の執筆 (Case Presentation)",
        content: (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              不足情報を補ったら、英語でのCase Presentationセクションを作成します。
              日本語の経過要約を入力するだけで、医学英語として自然な表現に変換されます。
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-200 dark:border-yellow-800 text-sm">
              <strong>Point:</strong> 数値データ（検査値）や固有名詞（薬剤名）は、AIが誤変換する可能性があるため、必ず人間がダブルチェックしてください。
            </div>
          </div>
        ),
        relatedPromptId: "case-presentation"
      },
      {
        title: "Phase 3 & 4: 考察の構成と執筆 (Discussion)",
        content: (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              考察（Discussion）は論文の心臓部です。「なぜこの症例が重要なのか？」を論理的に説明する必要があります。
            </p>
            <p>
              まずは <strong>PubMed検索クエリ</strong> で類似症例を探し、
              <strong>Introduction構成案</strong> プロンプトを応用して、Discussionのパラグラフ構成（要約→比較→機序→結論）を作ります。
            </p>
          </div>
        ),
        relatedPromptId: "res-intro-flow"
      },
      {
        title: "Phase 5: 投稿準備 (Submission)",
        content: (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              最後に、エディターへの「ラブレター」であるカバーレターを作成します。
              あなたの症例がいかにユニークで、そのジャーナルの読者にとって有益かをアピールしましょう。
            </p>
          </div>
        ),
        relatedPromptId: "res-cover-letter"
      }
    ]
  }
};

// プロンプト埋め込み用コンポーネント
function EmbeddedPrompt({ promptId }: { promptId: string }) {
  const prompt = fullPrompts.find(p => p.id === promptId);
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="my-6 border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            使用プロンプト: {prompt.title}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleCopy}>
              {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
              {copied ? "Copied" : "Copy Template"}
            </Button>
            <Link href={`/prompts/${prompt.id}`}>
              <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                Try it Now
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {prompt.description}
        </p>
        <div className="bg-white dark:bg-gray-950 p-3 rounded border text-xs font-mono text-gray-500 overflow-hidden h-20 relative">
          {prompt.template}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function GuideDetail() {
  const [match, params] = useRoute("/guides/:id");
  const guideId = params?.id;
  const guide = guideId ? guidesData[guideId] : null;

  if (!guide) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900">Guide Not Found</h2>
          <Link href="/guides">
            <Button className="mt-4" variant="outline">Back to Guides</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Link href="/guides" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Guides
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <div className="mb-8 border-b pb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
              {guide.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
              {guide.subtitle}
            </p>
          </div>

          <div className="space-y-12">
            {guide.sections.map((section, index) => (
              <section key={index} className="relative">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  {section.title}
                </h2>
                <div className="text-lg leading-relaxed">
                  {section.content}
                </div>
                {section.relatedPromptId && (
                  <EmbeddedPrompt promptId={section.relatedPromptId} />
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">おわりに：AIは「共著者」</h3>
            <p className="text-gray-700 dark:text-gray-300">
              AIは執筆を代行するだけでなく、思考の整理や品質管理（ガイドラインチェック）のパートナーとなります。
              このフローを一度体験すれば、次からはもっと速く、自信を持って「完走」できるはずです。
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
}
