import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useKeyboardShortcuts() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: 検索にフォーカス
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Ctrl/Cmd + H: ホームに戻る
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        setLocation('/');
      }

      // Ctrl/Cmd + B: お気に入りページへ
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setLocation('/favorites');
      }

      // Ctrl/Cmd + G: ガイドページへ
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        setLocation('/guides');
      }

      // Ctrl/Cmd + /: ショートカットヘルプを表示
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // ショートカットヘルプモーダルを表示
        const event = new CustomEvent('show-shortcuts-help');
        window.dispatchEvent(event);
      }

      // ESC: モーダルを閉じる（汎用）
      if (e.key === 'Escape') {
        const event = new CustomEvent('close-modal');
        window.dispatchEvent(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setLocation]);
}
