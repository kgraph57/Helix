/**
 * プリロード戦略ユーティリティ
 * ユーザーが次にアクセスする可能性が高いリソースを事前に読み込む
 */

/**
 * データファイルをプリロード
 * ユーザーがホームページにアクセスした際に、よく使われるデータを事前に読み込む
 */
export function preloadDataFiles(): void {
  // アイドル時間を利用してデータをプリロード
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // プロンプトデータをプリロード（まだ読み込まれていない場合）
      import('./prompts-loader').then((module) => {
        module.loadPrompts().catch(() => {
          // エラーは無視（既に読み込まれている可能性がある）
        });
      });
    }, { timeout: 3000 });
  }
}

/**
 * 次のページのリソースをプリロード
 * ユーザーの行動パターンに基づいて、次のページのリソースを事前に読み込む
 */
export function preloadNextPage(path: string): void {
  // よく使われるページのリソースをプリロード
  const commonPaths = [
    '/tips',
    '/guides',
    '/courses',
  ];

  if (commonPaths.includes(path)) {
    // そのページで使用されるデータをプリロード
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (path === '/tips') {
          import('./tips-loader').then((module) => {
            module.loadTips().catch(() => {});
          });
        }
      }, { timeout: 2000 });
    }
  }
}

/**
 * リンクのホバー時にリソースをプリロード
 * ユーザーがリンクにホバーした際に、そのページのリソースを事前に読み込む
 */
export function preloadOnHover(href: string): void {
  // リンクのホバー時にプリロード
  if (href.startsWith('/prompts/')) {
    // プロンプト詳細ページの場合、データをプリロード
    import('./prompts-loader').then((module) => {
      module.loadPrompts().catch(() => {});
    });
  } else if (href.startsWith('/tips/')) {
    // Tips詳細ページの場合、データをプリロード
    import('./tips-loader').then((module) => {
      module.loadTips().catch(() => {});
    });
  }
}
