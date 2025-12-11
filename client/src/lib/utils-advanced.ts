/**
 * 高度なユーティリティ関数
 * パフォーマンス、メモ化、デバウンス、スロットルなど
 */

/**
 * デバウンス関数
 * 連続して呼び出される関数を、最後の呼び出しから一定時間後に実行
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * スロットル関数
 * 関数の実行頻度を制限（一定時間内に最大1回）
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * メモ化関数
 * 同じ引数での関数呼び出し結果をキャッシュ
 */
export function memoize<Args extends any[], Return>(
  func: (...args: Args) => Return,
  getKey?: (...args: Args) => string
): (...args: Args) => Return {
  const cache = new Map<string, Return>();

  return function memoizedFunction(...args: Args): Return {
    const key = getKey ? getKey(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * 遅延実行関数
 * 指定した時間後に関数を実行
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * リトライ関数
 * 失敗した関数を指定回数まで再試行
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs * attempt); // 指数バックオフ
      }
    }
  }

  throw lastError!;
}

/**
 * パイプ関数
 * 複数の関数を順番に適用
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}

/**
 * コンポーズ関数
 * 複数の関数を右から左に適用
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * 安全なJSONパース
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * 深いコピー
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * オブジェクトのキーを取得（型安全）
 */
export function keys<T extends Record<string, any>>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

/**
 * オブジェクトの値を取得（型安全）
 */
export function values<T extends Record<string, any>>(obj: T): Array<T[keyof T]> {
  return Object.values(obj);
}
