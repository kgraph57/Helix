/**
 * Sentryのモック（テスト環境用）
 * @sentry/reactがインストールされていない場合でもテストが実行できるように
 */

import { vi } from "vitest";

// Sentryがインストールされていない場合のモック
export const mockSentry = {
  init: vi.fn(),
  captureException: vi.fn(),
  captureMessage: vi.fn(),
  setUser: vi.fn(),
  browserTracingIntegration: vi.fn(() => ({})),
  replayIntegration: vi.fn(() => ({})),
};

// 動的インポートをモック
// @ts-ignore - @sentry/react may not be installed
vi.mock("@sentry/react", async () => {
  try {
    // 実際のSentryがインストールされている場合はそれを使用
    // @ts-ignore
    return await import("@sentry/react");
  } catch {
    // インストールされていない場合はモックを返す
    return mockSentry;
  }
});
