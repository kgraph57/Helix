/**
 * レッスン詳細ページ
 * スライド形式でレッスンコンテンツを表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Target } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Quiz } from "@/components/Quiz";
import { PracticeExercise, ExerciseResult } from "@/components/PracticeExercise";
import { lesson1Quizzes, lesson2Quizzes, lesson3Quizzes } from "@/data/courses/ai-basics/quizzes";
import { lesson1Exercises } from "@/data/courses/ai-basics/exercises";
import { useGamification } from "@/hooks/useGamification";

// レッスンコンテンツ（Markdownファイルから読み込み）
import lesson1Md from "@/data/courses/ai-basics/lesson-1.md?raw";
import lesson2Md from "@/data/courses/ai-basics/lesson-2.md?raw";
import lesson3Md from "@/data/courses/ai-basics/lesson-3.md?raw";

const lessonContent: Record<string, string> = {
  "ai-basics-1": lesson1Md,
  "ai-basics-2": lesson2Md,
  "ai-basics-3": lesson3Md,
};

// クイズデータ
const quizzesData: Record<string, typeof lesson1Quizzes> = {
  "ai-basics-1": lesson1Quizzes,
  "ai-basics-2": lesson2Quizzes,
  "ai-basics-3": lesson3Quizzes,
};

// 演習データ
const exercisesData: Record<string, typeof lesson1Exercises> = {
  "ai-basics-1": lesson1Exercises,
  "ai-basics-2": [],
  "ai-basics-3": [],
};

export default function LessonDetail() {
  const [match, params] = useRoute("/courses/:courseId/lessons/:lessonId");
  const [, setLocation] = useLocation();
  const courseId = match ? params.courseId : null;
  const lessonId = match ? params.lessonId : null;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { addXP } = useGamification();

  // クイズと演習データを取得
  const quizzes = lessonId ? quizzesData[lessonId] || [] : [];
  const exercises = lessonId ? exercisesData[lessonId] || [] : [];

  // レッスンコンテンツを取得
  const content = lessonId ? lessonContent[lessonId] || "" : "";
  
  // Markdownをスライドに分割（## で区切る）
  const slides = content
    ? content.split(/\n(?=## )/).filter(slide => slide.trim())
    : [];

  const totalSlides = slides.length;
  const progress = totalSlides > 0 ? Math.round(((currentSlide + 1) / totalSlides) * 100) : 0;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // 最後のスライドで完了
      setCompleted(true);
      // TODO: 進捗を保存、XPを追加
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleQuizComplete = (score: number, totalPoints: number) => {
    const percentage = Math.round((score / totalPoints) * 100);
    if (percentage >= 80) {
      addXP(5, "クイズ80%以上正解");
    }
    setShowQuiz(false);
  };

  const handleExerciseComplete = (result: ExerciseResult) => {
    addXP(3, "実践演習完了");
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setShowExercise(false);
    }
  };

  const handleComplete = () => {
    // レッスン完了を記録
    addXP(10, "レッスン完了");
    // ローカルストレージに進捗を保存
    const progressKey = `lesson-progress-${lessonId}`;
    localStorage.setItem(progressKey, JSON.stringify({ completed: true, completedAt: new Date().toISOString() }));
    
    // コースの進捗も更新
    const courseProgressKey = `course-progress-${courseId}`;
    const courseProgress = JSON.parse(localStorage.getItem(courseProgressKey) || "{}");
    const completedLessons = courseProgress.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(courseProgressKey, JSON.stringify({
        ...courseProgress,
        completedLessons,
        lastUpdated: new Date().toISOString(),
      }));
    }
    
    setLocation(`/courses/${courseId}`);
  };

  // スライドにクイズや演習のマーカーがあるかチェック
  const checkForInteractiveElements = (slideContent: string) => {
    if (slideContent.includes("[QUIZ]") && quizzes.length > 0) {
      return "quiz";
    }
    if (slideContent.includes("[EXERCISE]") && exercises.length > 0) {
      return "exercise";
    }
    return null;
  };

  if (!courseId || !lessonId || !content) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
          <p className="text-muted-foreground mb-6">The lesson you are looking for does not exist.</p>
          <Button onClick={() => setLocation(`/courses/${courseId || ""}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pb-24">
        {/* ヘッダー */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation(`/courses/${courseId}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
              </Button>
              <div className="text-sm text-muted-foreground">
                Slide {currentSlide + 1} / {totalSlides}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* スライドコンテンツ */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {completed ? (
            <Card className="text-center py-12">
              <CardContent className="space-y-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold">レッスン完了！</h2>
                <p className="text-muted-foreground">
                  おめでとうございます！このレッスンを完了しました。
                </p>
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-semibold">+10 XP 獲得</span>
                </div>
                <div className="flex gap-4 justify-center pt-4">
                  <Button variant="outline" onClick={() => setLocation(`/courses/${courseId}`)}>
                    Course Overview
                  </Button>
                  <Button onClick={handleComplete}>
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* クイズ表示 */}
              {showQuiz && quizzes.length > 0 ? (
                <Quiz
                  questions={quizzes}
                  onComplete={handleQuizComplete}
                  showResults={true}
                  allowRetry={true}
                />
              ) : showExercise && exercises.length > 0 ? (
                <PracticeExercise
                  exercise={exercises[currentExerciseIndex]}
                  onComplete={handleExerciseComplete}
                />
              ) : (
                <Card className="min-h-[60vh]">
                  <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1 className="text-3xl font-bold mb-4 text-foreground" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground border-b pb-2" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-4 text-foreground leading-relaxed" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="text-foreground" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong className="font-bold text-foreground" {...props} />
                          ),
                          code: ({ node, ...props }) => (
                            <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props} />
                          ),
                        }}
                      >
                        {slides[currentSlide]?.replace(/\[QUIZ\]/g, "").replace(/\[EXERCISE\]/g, "") || ""}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* インタラクティブ要素へのアクセスボタン */}
              {!showQuiz && !showExercise && (
                <div className="mt-6 space-y-3">
                  {quizzes.length > 0 && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowQuiz(true)}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      理解度チェック（クイズ）
                    </Button>
                  )}
                  {exercises.length > 0 && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowExercise(true)}
                    >
                      <Target className="mr-2 h-4 w-4" />
                      実践演習
                    </Button>
                  )}
                </div>
              )}

              {/* クイズ/演習から戻るボタン */}
              {(showQuiz || showExercise) && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowQuiz(false);
                      setShowExercise(false);
                      setCurrentExerciseIndex(0);
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    レッスンに戻る
                  </Button>
                </div>
              )}
            </>
          )}

          {/* ナビゲーションボタン */}
          {!completed && (
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentSlide === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentSlide >= totalSlides - 1}
              >
                {currentSlide >= totalSlides - 1 ? "Complete" : "Next"}
                {currentSlide < totalSlides - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
