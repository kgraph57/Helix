import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { memo } from "react";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface QuickAccessSectionProps {
  prompts: Prompt[];
}

export const QuickAccessSection = memo(function QuickAccessSection({ prompts }: QuickAccessSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="py-12 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-h2 font-semibold mb-6 text-neutral-900">
          よく使われるプロンプト
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => setLocation(`/prompts/${prompt.id}`)}
              className="group p-6 bg-white rounded-lg border border-neutral-200 transition-all duration-200 text-left hover:border-primary-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-caption font-medium uppercase tracking-wide text-primary-600">
                  {prompt.category}
                </span>
                <ArrowRight className="w-4 h-4 transition-all duration-200 text-neutral-400" />
              </div>
              <h3 className="text-body font-semibold mb-2 text-neutral-900">
                {prompt.title}
              </h3>
              <p className="text-caption line-clamp-2 text-neutral-600">
                {prompt.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
});
