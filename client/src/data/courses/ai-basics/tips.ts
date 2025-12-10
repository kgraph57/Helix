/**
 * レッスン1「AIとは何か」の実践のヒントデータ
 */

import { PracticeTip } from "@/components/PracticeTips";

export const lesson1Tips: PracticeTip[] = [
  {
    id: "ai-basics-1-tip1",
    title: "AIに質問してみる",
    description: "実際にAIツールを使って、AIについて質問してみましょう",
    tips: [
      "ChatGPT、Claude、Geminiなどのいずれかを開いてみましょう",
      "「AIとは何か、医療従事者向けに分かりやすく説明してください」と質問してみましょう",
      "AIの回答を読んで、分かりやすさ、正確性、実用性を評価してみましょう",
      "自分の言葉でAIの説明をまとめてみましょう",
    ],
    resources: [
      { label: "ChatGPT", url: "https://chat.openai.com" },
      { label: "Claude", url: "https://claude.ai" },
      { label: "Gemini", url: "https://gemini.google.com" },
    ],
  },
  {
    id: "ai-basics-1-tip2",
    title: "自分の業務での活用を考える",
    description: "自分の専門分野や業務で、AIをどう活用できるか考えてみましょう",
    tips: [
      "現在の業務で時間がかかっていることをリストアップしてみましょう",
      "AIで改善できそうなことを特定してみましょう（例: 診断書の作成、症例報告書の執筆、文献検索）",
      "具体的な活用方法を考えてみましょう（例: ChatGPTを使って診断書のドラフトを作成し、医師が確認・修正する）",
      "小さなことから始めて、徐々に活用範囲を広げていきましょう",
    ],
  },
  {
    id: "ai-basics-1-tip3",
    title: "AIの回答を批判的に評価する",
    description: "AIの回答を批判的に評価し、正しい情報を見極める力を養います",
    tips: [
      "AIに医療関連の質問をしてみましょう",
      "AIの回答を読んで、正確性を確認しましょう（必要に応じて文献を参照）",
      "間違っている点や不十分な点を特定しましょう",
      "AIの回答は「参考情報」として扱い、必ず自分で確認しましょう",
      "最新の研究結果や臨床ガイドラインと照らし合わせることが重要です",
    ],
  },
];
