import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, CheckCircle2, Clock, Menu, X } from 'lucide-react';
import { marwGuideData } from '@/lib/marw-guide-data';
import { CodeBlock } from '@/components/CodeBlock';
import { updateSEO } from '@/lib/seo';

// Markdownファイルを直接インポート
import introMd from '@/assets/guides/ai-paper-writing/00-introduction.md?raw';
import stage1Md from '@/assets/guides/ai-paper-writing/marw_stage1.md?raw';
import stage2Md from '@/assets/guides/ai-paper-writing/marw_stage2.md?raw';
import stage3Md from '@/assets/guides/ai-paper-writing/marw_stage3.md?raw';
import stage4Md from '@/assets/guides/ai-paper-writing/marw_stage4.md?raw';
import stage5Md from '@/assets/guides/ai-paper-writing/marw_stage5.md?raw';
import stage6Md from '@/assets/guides/ai-paper-writing/marw_stage6.md?raw';
import stage7Md from '@/assets/guides/ai-paper-writing/marw_stage7.md?raw';

const markdownContent: Record<string, string> = {
  'intro': introMd,
  'stage1': stage1Md,
  'stage2': stage2Md,
  'stage3': stage3Md,
  'stage4': stage4Md,
  'stage5': stage5Md,
  'stage6': stage6Md,
  'stage7': stage7Md,
};

export default function MARWGuide() {
  const { stepId } = useParams<{ stepId: string }>();
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStepId, setCurrentStepId] = useState<string>(stepId || 'intro');
  const [markdown, setMarkdown] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // SEO設定
  useEffect(() => {
    updateSEO({
      title: "AI論文執筆ワークフロー | Medical Prompt Hub",
      description: "世界標準に準拠したAI駆動型論文執筆の7段階ワークフロー。ハーバード大学、JAMA、ICMJEのガイドラインに基づき、24個の実践的プロンプト例を提供。",
      path: `/guides/marw-complete${stepId ? `/${stepId}` : ''}`,
      keywords: "AI論文執筆,MARW,医学論文,研究ワークフロー,AI活用,プロンプト"
    });
  }, [stepId]);

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('marw-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse progress:', e);
      }
    }
  }, []);

  // 進捗をLocalStorageに保存
  useEffect(() => {
    localStorage.setItem('marw-progress', JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps]);

  // stepIdが変更されたら更新
  useEffect(() => {
    if (stepId) {
      setCurrentStepId(stepId);
    }
  }, [stepId]);

  // Markdownコンテンツを読み込み
  useEffect(() => {
    const content = markdownContent[currentStepId] || '';
    setMarkdown(content);
  }, [currentStepId]);

  const toggleComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const completedCount = completedSteps.size;
  const totalSteps = marwGuideData.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/guides')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                ガイド一覧に戻る
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`
            ${isSidebarOpen ? 'block' : 'hidden'} lg:block
            w-full lg:w-80 flex-shrink-0
          `}>
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  進捗状況
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">完了</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {completedCount} / {totalSteps}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  {marwGuideData.title}
                </h3>
                {marwGuideData.phases.map((phase) => (
                  <div key={phase.id} className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 mb-2">
                      {phase.title}
                    </h4>
                    {phase.steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStepId(step.id);
                          navigate(`/guides/marw-complete/${step.id}`);
                          setIsSidebarOpen(false);
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-md text-sm
                          flex items-center justify-between group
                          transition-colors
                          ${currentStepId === step.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        <span className="flex items-center space-x-2">
                          {completedSteps.has(step.id) ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="truncate">{step.title}</span>
                        </span>
                        <Clock className="h-3 w-3 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
              {/* Completion Toggle */}
              {currentStepId !== 'intro' && (
                <div className="mb-6 flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <Button
                    variant={completedSteps.has(currentStepId) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleComplete(currentStepId)}
                    className="flex items-center space-x-2"
                  >
                    {completedSteps.has(currentStepId) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>完了済み</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-4 w-4" />
                        <span>完了にする</span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Markdown Content */}
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <CodeBlock
                          language={match[1]}
                          code={String(children).replace(/\n$/, '')}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </article>

              {/* Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    const allSteps = marwGuideData.phases.flatMap(p => p.steps);
                    const currentIndex = allSteps.findIndex(s => s.id === currentStepId);
                    if (currentIndex > 0) {
                      const prevStep = allSteps[currentIndex - 1];
                      setCurrentStepId(prevStep.id);
                      navigate(`/guides/marw-complete/${prevStep.id}`);
                    }
                  }}
                  disabled={currentStepId === 'intro'}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  前のステップ
                </Button>
                <Button
                  onClick={() => {
                    const allSteps = marwGuideData.phases.flatMap(p => p.steps);
                    const currentIndex = allSteps.findIndex(s => s.id === currentStepId);
                    if (currentIndex < allSteps.length - 1) {
                      const nextStep = allSteps[currentIndex + 1];
                      setCurrentStepId(nextStep.id);
                      navigate(`/guides/marw-complete/${nextStep.id}`);
                    }
                  }}
                  disabled={currentStepId === 'stage7'}
                >
                  次のステップ
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
