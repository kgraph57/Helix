import { useState, useEffect, useCallback } from 'react';

const SEARCH_HISTORY_KEY = 'medical-prompt-search-history';
const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  // localStorageから検索履歴を読み込む
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, []);

  // 検索履歴に追加
  const addToHistory = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;

    setHistory((prev) => {
      // 重複を削除し、新しい検索を先頭に追加
      const filtered = prev.filter(item => item !== trimmed);
      const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      
      // localStorageに保存
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
      
      return updated;
    });
  }, []);

  // 検索履歴をクリア
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  }, []);

  // 特定の検索履歴を削除
  const removeFromHistory = useCallback((query: string) => {
    setHistory((prev) => {
      const updated = prev.filter(item => item !== query);
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to update search history:', error);
      }
      return updated;
    });
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
}
