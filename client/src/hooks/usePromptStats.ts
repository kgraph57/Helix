import { useState, useEffect } from 'react';

interface PromptUsage {
  promptId: string;
  count: number;
  lastUsed: string;
}

export function usePromptStats() {
  const [usage, setUsage] = useState<PromptUsage[]>([]);

  useEffect(() => {
    // ローカルストレージから使用統計を読み込む
    const savedUsage = localStorage.getItem('prompt_usage');
    if (savedUsage) {
      setUsage(JSON.parse(savedUsage));
    }
  }, []);

  const trackPromptUsage = (promptId: string) => {
    const existingIndex = usage.findIndex(u => u.promptId === promptId);
    let newUsage: PromptUsage[];

    if (existingIndex >= 0) {
      newUsage = [...usage];
      newUsage[existingIndex] = {
        promptId,
        count: newUsage[existingIndex].count + 1,
        lastUsed: new Date().toISOString()
      };
    } else {
      newUsage = [...usage, {
        promptId,
        count: 1,
        lastUsed: new Date().toISOString()
      }];
    }

    setUsage(newUsage);
    localStorage.setItem('prompt_usage', JSON.stringify(newUsage));
  };

  const getTopPrompts = (limit: number = 10): PromptUsage[] => {
    return [...usage]
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  const getPromptUsageCount = (promptId: string): number => {
    const found = usage.find(u => u.promptId === promptId);
    return found ? found.count : 0;
  };

  return {
    usage,
    trackPromptUsage,
    getTopPrompts,
    getPromptUsageCount
  };
}
