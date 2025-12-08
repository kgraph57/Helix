/**
 * 実践演習コンポーネント
 * AI体験、評価、計画作成などの演習を提供
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ExternalLink, Lightbulb, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: "ai_chat" | "evaluation" | "planning" | "reflection";
  steps: string[];
  resources?: { label: string; url: string }[];
  questions?: { question: string; placeholder?: string }[];
  onComplete?: (result: ExerciseResult) => void;
}

export interface ExerciseResult {
  exerciseId: string;
  answers?: Record<string, string>;
  completed: boolean;
  timestamp: Date;
}

interface PracticeExerciseProps {
  exercise: Exercise;
  onComplete?: (result: ExerciseResult) => void;
}

export function PracticeExercise({ exercise, onComplete }: PracticeExerciseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleComplete = () => {
    const result: ExerciseResult = {
      exerciseId: exercise.id,
      answers,
      completed: true,
      timestamp: new Date(),
    };
    setIsCompleted(true);
    if (onComplete) {
      onComplete(result);
    }
    if (exercise.onComplete) {
      exercise.onComplete(result);
    }
  };

  const handleNext = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const getIcon = () => {
    switch (exercise.type) {
      case "ai_chat":
        return <MessageSquare className="w-5 h-5" />;
      case "evaluation":
        return <CheckCircle2 className="w-5 h-5" />;
      case "planning":
        return <Target className="w-5 h-5" />;
      case "reflection":
        return <Lightbulb className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  if (isCompleted) {
    return (
      <Card className="border-2 border-green-500">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            演習完了！
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">+3 XP 獲得！</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            おめでとうございます！この演習を完了しました。次のステップに進みましょう。
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <CardTitle className="text-xl">実践演習: {exercise.title}</CardTitle>
        </div>
        <CardDescription>{exercise.description}</CardDescription>
        <Badge variant="secondary" className="w-fit mt-2">
          ステップ {currentStep + 1} / {exercise.steps.length}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 現在のステップ */}
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">ステップ {currentStep + 1}</h4>
            <p className="text-sm">{exercise.steps[currentStep]}</p>
          </div>

          {/* リソースリンク */}
          {exercise.resources && exercise.resources.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">参考リソース:</p>
              <div className="flex flex-wrap gap-2">
                {exercise.resources.map((resource, index) => (
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

          {/* 質問フォーム */}
          {exercise.questions && exercise.questions.length > 0 && (
            <div className="space-y-4">
              {exercise.questions.map((q, index) => {
                const questionId = `q${index}`;
                return (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium">
                      {q.question}
                    </label>
                    <Textarea
                      value={answers[questionId] || ""}
                      onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                      placeholder={q.placeholder || "回答を入力してください"}
                      className="min-h-[100px]"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* AIチャットタイプの演習 */}
          {exercise.type === "ai_chat" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold mb-2">AIツールを開いて質問してみましょう</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    以下のいずれかのAIツールを開いて、質問をしてみてください：
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
                        ChatGPT <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                        Claude <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
                        Gemini <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            前へ
          </Button>
          <div className="text-xs text-muted-foreground">
            {currentStep + 1} / {exercise.steps.length}
          </div>
          <Button
            onClick={handleNext}
            disabled={exercise.questions && exercise.questions.some((_, i) => !answers[`q${i}`]?.trim())}
          >
            {currentStep === exercise.steps.length - 1 ? "完了" : "次へ"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
