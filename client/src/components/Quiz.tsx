/**
 * クイズコンポーネント
 * 選択問題、正誤問題、記述問題に対応
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false" | "text";
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  points?: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, totalPoints: number) => void;
  showResults?: boolean;
  allowRetry?: boolean;
}

export function Quiz({ questions, onComplete, showResults = true, allowRetry = true }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (answer: string | boolean) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);
    setShowExplanation({ ...showExplanation, [currentQuestion.id]: true });

    // 正解かどうかをチェック
    const isCorrect = answer === currentQuestion.correctAnswer;
    const points = currentQuestion.points || 1;
    
    // 関数型の更新を使用して、最新の状態を参照
    setScore((prevScore) => {
      return isCorrect ? prevScore + points : prevScore;
    });
    
    setTotalPoints((prevTotalPoints) => {
      const newTotalPoints = prevTotalPoints + points;
      
      // 最後の質問の場合、完了処理
      if (isLastQuestion) {
        setTimeout(() => {
          setIsCompleted(true);
          if (onComplete) {
            // 最新のスコアと合計ポイントを計算
            setScore((finalScore) => {
              onComplete(finalScore, newTotalPoints);
              return finalScore;
            });
          }
        }, 1500);
      }
      
      return newTotalPoints;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setShowExplanation({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setScore(0);
    setTotalPoints(0);
  };

  const getAnswerStatus = (questionId: string) => {
    const answer = answers[questionId];
    if (answer === undefined) return null;
    const question = questions.find((q) => q.id === questionId);
    if (!question) return null;
    return answer === question.correctAnswer;
  };

  if (isCompleted && showResults) {
    const percentage = Math.round((score / totalPoints) * 100);
    const isPassed = percentage >= 80;

    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl text-center">クイズ完了！</CardTitle>
          <CardDescription className="text-center">
            {questions.length}問中 {score}問正解
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2" style={{ color: isPassed ? "#22c55e" : "#ef4444" }}>
              {percentage}%
            </div>
            <Badge variant={isPassed ? "default" : "destructive"} className="text-lg px-4 py-2">
              {isPassed ? "合格！" : "もう一度挑戦しましょう"}
            </Badge>
          </div>

          {isPassed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">+5 XP 獲得！（ボーナス）</span>
              </div>
            </motion.div>
          )}

          {allowRetry && !isPassed && (
            <Button onClick={handleRetry} className="w-full" variant="outline">
              もう一度挑戦する
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">理解度チェック</CardTitle>
          <Badge variant="secondary">
            問題 {currentQuestionIndex + 1} / {questions.length}
          </Badge>
        </div>
        <CardDescription>{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 選択問題 */}
        {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showResult = showExplanation[currentQuestion.id];

              return (
                <motion.button
                  key={index}
                  onClick={() => !hasAnswered && handleAnswer(option)}
                  disabled={hasAnswered}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    !hasAnswered && "hover:border-primary hover:bg-accent cursor-pointer",
                    isSelected && !showResult && "border-primary bg-primary/10",
                    showResult && isSelected && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                    showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20",
                    showResult && !isSelected && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                    hasAnswered && "cursor-not-allowed"
                  )}
                  whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                  whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && isSelected && (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )
                    )}
                    {showResult && !isSelected && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* 正誤問題 */}
        {currentQuestion.type === "true_false" && (
          <div className="grid grid-cols-2 gap-4">
            {[true, false].map((value) => {
              const isSelected = answers[currentQuestion.id] === value;
              const isCorrect = value === currentQuestion.correctAnswer;
              const showResult = showExplanation[currentQuestion.id];

              return (
                <motion.button
                  key={String(value)}
                  onClick={() => !hasAnswered && handleAnswer(value)}
                  disabled={hasAnswered}
                  className={cn(
                    "p-6 rounded-lg border-2 transition-all font-semibold",
                    !hasAnswered && "hover:border-primary hover:bg-accent cursor-pointer",
                    isSelected && !showResult && "border-primary bg-primary/10",
                    showResult && isSelected && isCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                    showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-900/20",
                    hasAnswered && "cursor-not-allowed"
                  )}
                  whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                  whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{value ? "正しい" : "間違い"}</span>
                    {showResult && isSelected && (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* 解説 */}
        <AnimatePresence>
          {showExplanation[currentQuestion.id] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "p-4 rounded-lg border",
                getAnswerStatus(currentQuestion.id)
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
              )}
            >
              <div className="flex items-start gap-2">
                {getAnswerStatus(currentQuestion.id) ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="font-semibold mb-1">
                    {getAnswerStatus(currentQuestion.id) ? "正解！" : "不正解"}
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{currentQuestion.explanation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            前へ
          </Button>
          <div className="text-sm text-muted-foreground">
            {Object.keys(answers).length} / {questions.length} 回答済み
          </div>
          <Button
            onClick={handleNext}
            disabled={!hasAnswered || isLastQuestion}
          >
            次へ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
