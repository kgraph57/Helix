import { ArrowRight, GraduationCap, BookOpen, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { courses } from "@/pages/Courses";

const levelLabels: Record<number, { title: string; description: string; color: string; bgColor: string; borderColor: string }> = {
  1: {
    title: "レベル1: 基礎編（初心者向け）",
    description: "AIの基礎から学び始める方向け。基本概念、専門用語、実践的な使い方まで幅広くカバーします。",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  2: {
    title: "レベル2: 技術理解編（中級者向け）",
    description: "API、MCP、プログラミングなど、技術的な理解を深めるコース。実装や開発にも挑戦できます。",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50/50 dark:bg-cyan-950/20",
    borderColor: "border-cyan-200 dark:border-cyan-800"
  },
  3: {
    title: "レベル3: 実践編（上級者向け）",
    description: "深層学習、研究手法、論文執筆など、より高度な実践的なスキルを習得します。",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50/50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800"
  },
  4: {
    title: "レベル4: 専門編（エキスパート向け）",
    description: "マルチモーダルAI、エッジAI、システム構築など、最先端の技術を学びます。",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50/50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800"
  }
};

export function CoursesLevelSection() {
  const [, setLocation] = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // レベル別にコースをグループ化
  const coursesByLevel = courses.reduce((acc, course) => {
    if (!acc[course.level]) {
      acc[course.level] = [];
    }
    acc[course.level].push(course);
    return acc;
  }, {} as Record<number, typeof courses>);

  // レベル1から4まで順番に表示
  const levels = [1, 2, 3, 4] as const;

  // レベル別の進捗を計算（簡易版：レッスン数ベース）
  const getLevelStats = (level: number) => {
    const levelCourses = coursesByLevel[level] || [];
    const totalCourses = levelCourses.length;
    const totalLessons = levelCourses.reduce((sum, c) => sum + c.lessons, 0);
    
    // 実際のレッスンファイル数を確認（簡易版）
    let actualLessons = 0;
    levelCourses.forEach(course => {
      // レッスンファイルの存在をチェック（簡易実装）
      // 実際の実装では、APIやローカルストレージから進捗を取得
      actualLessons += course.lessons; // 仮の実装
    });
    
    return { totalCourses, totalLessons, actualLessons };
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-12 lg:py-16 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Linear.app風：カテゴリ + パンチライン + 説明文 */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={prefersReducedMotion ? {} : { duration: isMobile ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* カテゴリ/ラベル */}
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-blue-600" strokeWidth={2} />
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Learning Path
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>
          
          {/* パンチライン */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Structured learning by level
          </h2>
          
          {/* 説明文 */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed tracking-[-0.01em]">
            Start from the basics and progress to expert level. Each level builds on the previous one, ensuring a comprehensive learning journey.
          </p>
        </motion.div>

        {/* レベル別コースグリッド */}
        <div className="space-y-8 md:space-y-12">
          {levels.map((level, levelIndex) => {
            const levelInfo = levelLabels[level];
            const levelCourses = coursesByLevel[level] || [];
            const stats = getLevelStats(level);
            
            if (levelCourses.length === 0) return null;

            return (
              <motion.div
                key={level}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={prefersReducedMotion ? {} : { 
                  duration: isMobile ? 0.3 : 0.6, 
                  delay: isMobile ? 0 : levelIndex * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {/* レベルヘッダー */}
                <div className={`mb-6 p-6 rounded-2xl border ${levelInfo.bgColor} ${levelInfo.borderColor}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${levelInfo.color} ${levelInfo.bgColor} border ${levelInfo.borderColor}`}>
                          Level {level}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                          {levelInfo.title.split(':')[1]?.trim() || levelInfo.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {levelInfo.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-neutral-50">
                        {stats.totalCourses}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        courses
                      </div>
                      <div className="mt-2 text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                        {stats.totalLessons}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        lessons
                      </div>
                    </div>
                  </div>
                </div>

                {/* コースカードグリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {levelCourses.slice(0, 6).map((course, courseIndex) => (
                    <motion.div
                      key={course.id}
                      className="group relative rounded-xl p-5 bg-background transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.08)]"
                      style={{
                        outline: '1px solid rgba(0, 0, 0, 0.06)',
                        outlineOffset: '-1px',
                      }}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={prefersReducedMotion ? {} : { 
                        duration: isMobile ? 0.2 : 0.5, 
                        delay: isMobile ? 0 : courseIndex * 0.05,
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      whileHover={isMobile || prefersReducedMotion ? {} : { 
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.1)"
                      }}
                      onClick={() => setLocation(`/courses/${course.id}`)}
                    >
                      {/* レベルバッジ */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`px-2 py-0.5 rounded text-xs font-semibold ${levelInfo.color} ${levelInfo.bgColor} border ${levelInfo.borderColor}`}>
                          L{level}
                        </div>
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          {course.category}
                        </span>
                      </div>

                      {/* タイトル */}
                      <h4 className="text-base md:text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-50 tracking-[-0.01em] leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                        {course.title}
                      </h4>

                      {/* 説明 */}
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* フッター情報 */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{course.xpReward} XP</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        Start learning
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 「すべて見る」リンク */}
                {levelCourses.length > 6 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setLocation(`/courses?level=${level}`)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
                    >
                      View all {levelCourses.length} courses in Level {level}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 全体のCTA */}
        <motion.div
          className="mt-12 text-center"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => setLocation('/courses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg hover:shadow-xl"
          >
            Explore all courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
