import { useMemo } from "react";
import { FileText, Layers, BookOpen, Users } from "lucide-react";
import { categories } from "@/lib/prompts";
import type { Prompt } from "@/lib/prompts";

interface StatsBannerSectionProps {
  prompts: Prompt[];
}

export function StatsBannerSection({ prompts }: StatsBannerSectionProps) {
  const stats = useMemo(() => {
    const totalPrompts = prompts.length;
    const totalCategories = categories.filter(cat => 
      prompts.some(p => p.category === cat.id)
    ).length;
    const totalTags = new Set(
      prompts.flatMap(p => p.tags || [])
    ).size;

    return {
      totalPrompts,
      totalCategories,
      totalTags,
      // 追加の統計情報（将来拡張用）
      avgPromptsPerCategory: totalCategories > 0 
        ? Math.round(totalPrompts / totalCategories) 
        : 0,
    };
  }, [prompts]);

  const statItems = [
    {
      icon: FileText,
      label: "Prompts",
      value: stats.totalPrompts,
      suffix: "",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: Layers,
      label: "Categories",
      value: stats.totalCategories,
      suffix: "",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      icon: BookOpen,
      label: "Tags",
      value: stats.totalTags,
      suffix: "",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      icon: Users,
      label: "Healthcare Professionals",
      value: "1000+",
      suffix: "",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${item.bgColor} flex items-center justify-center mb-3 md:mb-4`}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
                </div>
                <div className="mb-1">
                  <span className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {item.value}
                  </span>
                  {item.suffix && (
                    <span className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 ml-1">
                      {item.suffix}
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
