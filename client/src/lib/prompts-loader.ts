/**
 * プロンプトデータの遅延ローダー
 * 大きなデータファイルを必要に応じて読み込むことで、初期ロード時間を短縮
 */

import type { Prompt } from "./prompts";

// データのキャッシュ
let promptsCache: Prompt[] | null = null;
let loadingPromise: Promise<Prompt[]> | null = null;

/**
 * プロンプトデータを遅延ロード
 * 初回呼び出し時にデータを読み込み、2回目以降はキャッシュから返す
 */
export async function loadPrompts(): Promise<Prompt[]> {
  // キャッシュがあれば即座に返す
  if (promptsCache) {
    return promptsCache;
  }

  // 既に読み込み中の場合は、そのPromiseを返す
  if (loadingPromise) {
    return loadingPromise;
  }

  // データを動的にインポート
  loadingPromise = import("./prompts-full").then((module) => {
    promptsCache = module.fullPrompts;
    return promptsCache;
  });

  return loadingPromise;
}

/**
 * プロンプトデータを同期的に取得（既に読み込まれている場合のみ）
 * 読み込まれていない場合はnullを返す
 */
export function getPromptsSync(): Prompt[] | null {
  return promptsCache;
}

/**
 * キャッシュをクリア（主にテスト用）
 */
export function clearPromptsCache(): void {
  promptsCache = null;
  loadingPromise = null;
}

/**
 * 特定のIDのプロンプトを取得（非同期）
 */
export async function getPromptById(id: string): Promise<Prompt | undefined> {
  const prompts = await loadPrompts();
  return prompts.find((p) => p.id === id);
}

/**
 * 特定のIDのプロンプトを取得（同期、既に読み込まれている場合のみ）
 */
export function getPromptByIdSync(id: string): Prompt | undefined {
  const prompts = getPromptsSync();
  if (!prompts) return undefined;
  return prompts.find((p) => p.id === id);
}
