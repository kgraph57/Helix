/**
 * 検索クエリにマッチするテキストをハイライト表示するためのユーティリティ
 */

/**
 * テキスト内の検索クエリにマッチする部分をハイライト用のマークアップで囲む
 */
export function highlightSearchQuery(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }

  // 検索クエリを単語に分割（空白で区切る）
  const queryWords = query
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // 正規表現の特殊文字をエスケープ

  if (queryWords.length === 0) {
    return text;
  }

  // すべての検索語にマッチする正規表現を作成（大文字小文字を区別しない）
  const regex = new RegExp(`(${queryWords.join('|')})`, 'gi');
  
  return text.replace(regex, '<mark class="bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 rounded px-0.5">$1</mark>');
}
