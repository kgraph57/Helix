/**
 * Tipsデータの遅延ローダー
 */

import type { PromptTip } from "./tips";

// データのキャッシュ
let tipsCache: PromptTip[] | null = null;
let loadingPromise: Promise<PromptTip[]> | null = null;

/**
 * Tipsデータを遅延ロード
 */
export async function loadTips(): Promise<PromptTip[]> {
  if (tipsCache) {
    return tipsCache;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = import("./tips").then((module) => {
    tipsCache = module.tips;
    return tipsCache;
  });

  return loadingPromise;
}

/**
 * Tipsデータを同期的に取得（既に読み込まれている場合のみ）
 */
export function getTipsSync(): PromptTip[] | null {
  return tipsCache;
}

/**
 * キャッシュをクリア
 */
export function clearTipsCache(): void {
  tipsCache = null;
  loadingPromise = null;
}

/**
 * 特定のIDのTipを取得（非同期）
 */
export async function getTipById(id: string): Promise<PromptTip | undefined> {
  const tips = await loadTips();
  return tips.find((t) => t.id === id);
}

/**
 * 特定のIDのTipを取得（同期、既に読み込まれている場合のみ）
 */
export function getTipByIdSync(id: string): PromptTip | undefined {
  const tips = getTipsSync();
  if (!tips) return undefined;
  return tips.find((t) => t.id === id);
}
