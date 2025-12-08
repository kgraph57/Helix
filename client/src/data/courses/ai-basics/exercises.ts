/**
 * レッスン1「AIとは何か」の実践演習データ
 */

import { Exercise } from "@/components/PracticeExercise";

export const lesson1Exercises: Exercise[] = [
  {
    id: "ai-basics-1-ex1",
    title: "AIに質問してみる",
    description: "実際にAIツールを使って、AIについて質問してみましょう",
    type: "ai_chat",
    steps: [
      "AIツール（ChatGPT、Claude、Geminiのいずれか）を開く",
      "以下の質問をAIにしてみる：「AIとは何か、医療従事者向けに分かりやすく説明してください」",
      "AIの回答を読んで、分かりやすさ、正確性、実用性を評価する",
      "自分の言葉でAIの説明をまとめる"
    ],
    resources: [
      { label: "ChatGPT", url: "https://chat.openai.com" },
      { label: "Claude", url: "https://claude.ai" },
      { label: "Gemini", url: "https://gemini.google.com" },
    ],
    questions: [
      {
        question: "AIの回答を評価してください（分かりやすさ、正確性、実用性）",
        placeholder: "例: 分かりやすかったが、医療現場での具体例が少なかった...",
      },
      {
        question: "自分が説明するならどう言いますか？",
        placeholder: "自分の言葉でAIとは何かを説明してください",
      },
    ],
  },
  {
    id: "ai-basics-1-ex2",
    title: "自分の業務での活用を考える",
    description: "自分の専門分野や業務で、AIをどう活用できるか考えてみましょう",
    type: "planning",
    steps: [
      "現在の業務で時間がかかっていることをリストアップする",
      "AIで改善できそうなことを特定する",
      "具体的な活用方法を考える",
      "活用計画を作成する"
    ],
    questions: [
      {
        question: "現在の業務で時間がかかっていることは何ですか？",
        placeholder: "例: 診断書の作成、症例報告書の執筆、文献検索...",
      },
      {
        question: "AIで改善できそうなことは何ですか？",
        placeholder: "例: 診断書のドラフト作成、症例報告書の執筆支援...",
      },
      {
        question: "具体的な活用方法を教えてください",
        placeholder: "例: ChatGPTを使って診断書のドラフトを作成し、医師が確認・修正する...",
      },
    ],
  },
  {
    id: "ai-basics-1-ex3",
    title: "AIの回答を評価する",
    description: "AIの回答を批判的に評価し、正しい情報を見極める力を養います",
    type: "evaluation",
    steps: [
      "AIに医療関連の質問をしてみる",
      "AIの回答を読む",
      "回答の正確性を確認する（必要に応じて文献を参照）",
      "間違っている点や不十分な点を特定する",
      "改善案を考える"
    ],
    questions: [
      {
        question: "AIの回答で正しいと思った点は何ですか？",
        placeholder: "例: 基本的な概念の説明は正確だった...",
      },
      {
        question: "AIの回答で間違っている、または不十分だと思った点は何ですか？",
        placeholder: "例: 最新の研究結果が反映されていなかった...",
      },
      {
        question: "AIの回答をどう改善できますか？",
        placeholder: "例: より具体的な例を追加する、最新の文献を参照する...",
      },
    ],
  },
];
