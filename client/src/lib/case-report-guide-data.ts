export interface Step {
  id: string;
  number: number;
  title: string;
  duration: string;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  steps: Step[];
}

export interface CaseReportGuide {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  phases: Phase[];
}

export const caseReportGuideData: CaseReportGuide = {
  id: "case-report-complete",
  title: "【完全版】症例報告執筆ガイド：構想から投稿まで",
  description: "2025年最新のAI活用により、従来の90%の時間を削減する革新的ワークフロー。Claude 3.5 Sonnet、Elicit、NotebookLMを駆使した5ステップで、世界水準の症例報告を完成させます。",
  totalSteps: 5,
  phases: [
    {
      id: "workflow",
      number: 1,
      title: "AACR Method - AI加速症例報告執筆法",
      titleEn: "AI-Accelerated Case Report Method",
      steps: [
        {
          id: "step-01",
          number: 1,
          title: "ステップ1: 症例情報の収集と構造化",
          duration: "1.5時間"
        },
        {
          id: "step-02",
          number: 2,
          title: "ステップ2: AI駆動型文献レビューと新規性の特定",
          duration: "3時間"
        },
        {
          id: "step-03",
          number: 3,
          title: "ステップ3: 執筆戦略の立案とプロンプト設計",
          duration: "2時間"
        },
        {
          id: "step-04",
          number: 4,
          title: "ステップ4: AIによる執筆とファクトチェック",
          duration: "3時間"
        },
        {
          id: "step-05",
          number: 5,
          title: "ステップ5: 最終化と投稿準備",
          duration: "1時間"
        }
      ]
    }
  ]
};
