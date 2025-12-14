import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  category?: string;
  title: string;
  description?: string;
}

// Linear.app風：ページヘッダーコンポーネント
export function PageHeader({ category, title, description }: PageHeaderProps) {
  return (
    <motion.div
      className="mb-8 md:mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {category && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
            {category}
          </span>
          <ArrowRight className="w-4 h-4 text-neutral-400" />
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
        {title}
      </h1>
      
      {description && (
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed tracking-[-0.01em]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
