import { Stethoscope, GraduationCap, Zap, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Stethoscope,
    title: "Purpose-built for medical AI",
    description: "Designed specifically for healthcare professionals. Streamline diagnosis, research, and patient care workflows.",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    leftContent: {
      title: "Expert Prompt Library",
      items: [
        "100+ curated medical prompts",
        "Tested in real clinical settings",
        "Regularly updated by professionals"
      ]
    },
    rightContent: {
      title: "Smart Categorization",
      items: [
        "Organized by medical specialty",
        "Easy search and filtering",
        "Tag-based navigation"
      ]
    }
  },
  {
    icon: GraduationCap,
    title: "Designed to move fast",
    description: "Optimized for speed and efficiency. Create medical documents, analyze data, and learn AI skills in seconds.",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    leftContent: {
      title: "Instant Access",
      items: [
        "Copy-paste ready templates",
        "No setup required",
        "Works with any AI model"
      ]
    },
    rightContent: {
      title: "Learning Paths",
      items: [
        "Structured courses",
        "Step-by-step guides",
        "Practical tips"
      ]
    }
  },
  {
    icon: Zap,
    title: "Crafted to perfection",
    description: "100+ expert prompts curated by medical professionals. Every template is tested and refined for real-world use.",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    leftContent: {
      title: "Quality Assurance",
      items: [
        "Reviewed by medical experts",
        "Real-world tested",
        "Continuously improved"
      ]
    },
    rightContent: {
      title: "Community Driven",
      items: [
        "Feedback from professionals",
        "Regular updates",
        "Best practices shared"
      ]
    }
  },
];

export function FeatureOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 md:py-12 lg:py-16 bg-white dark:bg-neutral-950 overflow-hidden"
    >
      {/* 背景装飾 */}
      <motion.div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl"></div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Linear風：カルーセルコンテナ */}
        <div 
          ref={containerRef}
          className="relative"
        >
          {/* スクロール可能なコンテナ */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-6 md:gap-8 lg:gap-12 min-w-max">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[500px] xl:w-[600px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <motion.div 
                      className="relative group bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-neutral-300/70 dark:hover:border-neutral-600/70 transition-all duration-300 h-full overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        y: -4,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                      }}
                      style={{
                        willChange: "transform, box-shadow"
                      }}
                    >
                      {/* ホバー時のグラデーション背景 */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03), transparent 60%)",
                        }}
                      />
                      <div className="relative z-10">
                      {/* カテゴリ/ラベル（Linear.app風） */}
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-4 h-4 ${feature.iconColor}`} strokeWidth={2} />
                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
                          Features
                        </span>
                      </div>
                      
                      {/* パンチライン（大きなタイトル） */}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                        {feature.title}
                      </h3>
                      
                      {/* 説明文 */}
                      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-[-0.01em] mb-4">
                        {feature.description}
                      </p>
                      
                      {/* CTAボタン（Linear.app風） */}
                      <motion.a
                        href="#prompts"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 group/cta"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                      </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
