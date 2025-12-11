/**
 * アクセシビリティユーティリティ
 * ARIA属性、キーボードナビゲーション、スクリーンリーダー対応
 */

/**
 * フォーカス可能な要素を取得
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
}

/**
 * フォーカストラップ（モーダル内でフォーカスを閉じ込める）
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * スクリーンリーダーにアナウンス
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // アナウンス後に要素を削除
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * キーボードショートカットのハンドラー
 */
export function createKeyboardShortcut(
  key: string,
  handler: (e: KeyboardEvent) => void,
  options?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
  }
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    const matchesKey = e.key === key || e.code === key;
    const matchesCtrl = options?.ctrl ? e.ctrlKey : !e.ctrlKey;
    const matchesShift = options?.shift ? e.shiftKey : !e.shiftKey;
    const matchesAlt = options?.alt ? e.altKey : !e.altKey;
    const matchesMeta = options?.meta ? e.metaKey : !e.metaKey;

    if (matchesKey && matchesCtrl && matchesShift && matchesAlt && matchesMeta) {
      e.preventDefault();
      handler(e);
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * スキップリンクを追加（ページのメインコンテンツに直接ジャンプ）
 */
export function addSkipLink(targetId: string = 'main-content'): void {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = 'メインコンテンツにスキップ';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
  `;
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * フォーカス可視化の改善
 */
export function enhanceFocusStyles(): void {
  const style = document.createElement('style');
  style.textContent = `
    *:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
      border-radius: 4px;
    }
    .skip-link:focus {
      top: 0 !important;
    }
  `;
  document.head.appendChild(style);
}
