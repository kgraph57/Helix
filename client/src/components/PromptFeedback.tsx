import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PromptFeedbackProps {
  promptId: string;
}

export function PromptFeedback({ promptId }: PromptFeedbackProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // ローカルストレージから既存のフィードバックを読み込む
  useEffect(() => {
    const savedFeedback = localStorage.getItem(`feedback_${promptId}`);
    if (savedFeedback) {
      const data = JSON.parse(savedFeedback);
      setFeedback(data.type);
      setSubmitted(true);
    }
  }, [promptId]);

  const handleFeedback = (type: 'positive' | 'negative') => {
    if (submitted) {
      toast.info("フィードバックは既に送信済みです");
      return;
    }

    setFeedback(type);
    
    if (type === 'negative') {
      setShowCommentBox(true);
    } else {
      submitFeedback(type, "");
    }
  };

  const submitFeedback = (type: 'positive' | 'negative', userComment: string) => {
    // ローカルストレージに保存
    const feedbackData = {
      type,
      comment: userComment,
      timestamp: new Date().toISOString(),
      promptId
    };
    
    localStorage.setItem(`feedback_${promptId}`, JSON.stringify(feedbackData));
    
    // 全体のフィードバック統計を更新
    const allFeedback = JSON.parse(localStorage.getItem('all_feedback') || '[]');
    allFeedback.push(feedbackData);
    localStorage.setItem('all_feedback', JSON.stringify(allFeedback));

    setSubmitted(true);
    setShowCommentBox(false);
    
    toast.success("フィードバックをありがとうございます！", {
      description: "今後のプロンプト改善に活用させていただきます。"
    });
  };

  const handleCommentSubmit = () => {
    if (feedback) {
      submitFeedback(feedback, comment);
    }
  };

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-green-800 dark:text-green-300">
            <ThumbsUp className="w-4 h-4" />
            <span>フィードバックをありがとうございました！</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-400">
            このプロンプトは役に立ちましたか？
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback('positive')}
              className={`h-8 px-3 ${
                feedback === 'positive' 
                  ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400' 
                  : 'border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              はい
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeedback('negative')}
              className={`h-8 px-3 ${
                feedback === 'negative' 
                  ? 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400' 
                  : 'border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              いいえ
            </Button>
          </div>
        </div>

        {showCommentBox && (
          <div className="space-y-2 pt-2 border-t border-blue-200 dark:border-blue-900/50">
            <div className="flex items-center gap-2 text-xs text-blue-800 dark:text-blue-300">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>改善のためのご意見をお聞かせください（任意）</span>
            </div>
            <Textarea
              placeholder="例：もっと具体的な例が欲しい、出力形式を変更してほしい、など"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px] text-sm border-blue-300 focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCommentBox(false)}
                className="h-8 text-xs"
              >
                キャンセル
              </Button>
              <Button
                size="sm"
                onClick={handleCommentSubmit}
                className="h-8 text-xs bg-blue-600 hover:bg-blue-700"
              >
                送信
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-blue-700 dark:text-blue-400">
          💡 フィードバックは今後のプロンプト改善に活用させていただきます
        </p>
      </CardContent>
    </Card>
  );
}
