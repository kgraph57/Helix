/**
 * レッスン1「AIとは何か」のクイズデータ
 */

import { QuizQuestion } from "@/components/Quiz";

export const lesson1Quizzes: QuizQuestion[] = [
  {
    id: "ai-basics-1-q1",
    question: "AIとは何ですか？",
    type: "multiple_choice",
    options: [
      "人間の知能を完全に再現する技術",
      "人間の知能を模倣する技術",
      "コンピュータの計算能力を向上させる技術",
      "ロボットを動かす技術"
    ],
    correctAnswer: "人間の知能を模倣する技術",
    explanation: "AIは人間の知能を「模倣」するものであり、「再現」するものではありません。現在のAIは特定のタスクに特化した「弱いAI」が主流です。",
    points: 1,
  },
  {
    id: "ai-basics-1-q2",
    question: "AIの強みは何ですか？",
    type: "multiple_choice",
    options: [
      "感情や直感を持っている",
      "24時間休まず動作できる",
      "創造性がある",
      "すべてのタスクに対応できる"
    ],
    correctAnswer: "24時間休まず動作できる",
    explanation: "AIは感情を持たず、創造性も限定的ですが、24時間休まず高速に処理できる点が強みです。現在のAIは特定のタスクに特化した「弱いAI」が主流で、すべてのタスクに対応できるわけではありません。",
    points: 1,
  },
  {
    id: "ai-basics-1-q3",
    question: "医療現場でAIが最も効果的に活用されているのは？",
    type: "multiple_choice",
    options: [
      "画像診断支援",
      "患者との対話",
      "手術の自動化",
      "薬の処方"
    ],
    correctAnswer: "画像診断支援",
    explanation: "現在、画像診断支援（X線、CT、MRIの読影）でAIが最も効果的に活用されています。患者との対話や手術の自動化はまだ研究段階です。薬の処方も医師の判断が必要です。",
    points: 1,
  },
  {
    id: "ai-basics-1-q4",
    question: "AIは人間の医師を完全に代替できる",
    type: "true_false",
    correctAnswer: false,
    explanation: "AIは人間の医師を「代替」するものではなく、「支援ツール」です。最終的な判断は医師が行う必要があり、AIの提案を盲信してはいけません。常に批判的に評価することが重要です。",
    points: 1,
  },
  {
    id: "ai-basics-1-q5",
    question: "現在のAIのほとんどは「弱いAI」である",
    type: "true_false",
    correctAnswer: true,
    explanation: "現在のAIのほとんどは「弱いAI（Narrow AI）」で、特定のタスクに特化しています。「強いAI（General AI）」はまだ実現していません。",
    points: 1,
  },
];

export const lesson2Quizzes: QuizQuestion[] = [
  {
    id: "ai-basics-2-q1",
    question: "AIという言葉が初めて使われたのはいつですか？",
    type: "multiple_choice",
    options: [
      "1950年",
      "1956年",
      "1980年",
      "2000年"
    ],
    correctAnswer: "1956年",
    explanation: "1956年のダートマス会議で、ジョン・マッカーシーが「Artificial Intelligence」という用語を提案し、AI研究の正式な始まりとなりました。",
    points: 1,
  },
  {
    id: "ai-basics-2-q2",
    question: "1980年代に主流だったAIシステムは？",
    type: "multiple_choice",
    options: [
      "ディープラーニング",
      "エキスパートシステム",
      "大規模言語モデル",
      "機械学習"
    ],
    correctAnswer: "エキスパートシステム",
    explanation: "1980年代はエキスパートシステムの時代でした。特定の分野の専門知識をコンピュータに組み込んだシステムで、医療診断支援などに使われました。",
    points: 1,
  },
  {
    id: "ai-basics-2-q3",
    question: "2020年代のAIの特徴は？",
    type: "multiple_choice",
    options: [
      "エキスパートシステム",
      "機械学習",
      "生成AI（大規模言語モデル）",
      "画像認識のみ"
    ],
    correctAnswer: "生成AI（大規模言語モデル）",
    explanation: "2020年代は生成AI（大規模言語モデル）の時代です。2022年のChatGPTの登場により、一般ユーザーにもAIが身近になりました。",
    points: 1,
  },
];

export const lesson3Quizzes: QuizQuestion[] = [
  {
    id: "ai-basics-3-q1",
    question: "現在のAIが最も得意なのは？",
    type: "multiple_choice",
    options: [
      "感情を理解する",
      "大量のデータを高速処理する",
      "創造的な作品を作る",
      "すべてのタスクに対応する"
    ],
    correctAnswer: "大量のデータを高速処理する",
    explanation: "現在のAIは大量のデータを高速処理することが得意です。感情の理解や創造性は限定的で、すべてのタスクに対応できるわけではありません。",
    points: 1,
  },
  {
    id: "ai-basics-3-q2",
    question: "医療現場でAIを使う際の注意点は？",
    type: "multiple_choice",
    options: [
      "AIの提案を盲信する",
      "AIの回答を必ず医師が確認する",
      "患者情報をそのままAIに入力する",
      "AIに完全に任せる"
    ],
    correctAnswer: "AIの回答を必ず医師が確認する",
    explanation: "AIの回答は必ず医師が確認する必要があります。AIは完璧ではなく、間違った情報を生成することもあります。患者情報の取り扱いにも注意が必要です。",
    points: 1,
  },
  {
    id: "ai-basics-3-q3",
    question: "AIは医療現場で様々な活用が進んでいる",
    type: "true_false",
    correctAnswer: true,
    explanation: "AIは医療現場で様々な活用が進んでいます。画像診断支援、文書作成支援、研究支援など、多くの分野でAIが活用されています。",
    points: 1,
  },
];
