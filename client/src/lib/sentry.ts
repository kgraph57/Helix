/**
 * Sentry統合
 * エラートラッキングの本番環境対応
 * 
 * 使用方法:
 * 1. @sentry/reactをインストール: pnpm add @sentry/react
 * 2. 環境変数VITE_SENTRY_DSNを設定
 * 3. main.tsxでinitSentry()を呼び出す
 */

// Sentryがインストールされている場合のみ使用
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Sentry: any = null;
let sentryLoaded = false;

// 動的にSentryを読み込む（インストールされていない場合でもエラーにならない）
async function loadSentry() {
  // テスト環境やSentryがインストールされていない場合はスキップ
  if (typeof window === "undefined" || import.meta.env.VITEST || import.meta.env.MODE === "test") {
    return false;
  }

  if (sentryLoaded) {
    return Sentry !== null;
  }

  try {
    // 動的インポート（Sentryがインストールされていない場合はエラーをキャッチ）
    // 文字列として動的に構築してViteの静的解析を回避
    const sentryPackage = "@sentry/react";
    // @ts-expect-error - Sentry may not be installed, dynamic import
    const sentryModule = await import(sentryPackage);
    Sentry = sentryModule;
    sentryLoaded = true;
    return true;
  } catch (error) {
    // Sentryがインストールされていない場合は警告のみ（エラーにしない）
    sentryLoaded = true; // 再試行しないようにマーク
    // 開発環境では警告を表示しない（ノイズを減らす）
    return false;
  }
}

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

/**
 * Sentryを初期化
 */
export async function initSentry(): Promise<void> {
  // DSNが設定されていない場合は初期化しない
  if (!SENTRY_DSN) {
    return;
  }

  // 開発環境では初期化しない（オプション）
  if (import.meta.env.DEV && import.meta.env.VITE_SENTRY_ENABLE_DEV !== "true") {
    return;
  }

  const loaded = await loadSentry();
  if (!loaded || !Sentry) {
    return;
  }

  try {
    Sentry.init({
      dsn: SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 本番環境では10%をサンプリング
      // Session Replay
      replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 本番環境では10%をサンプリング
      replaysOnErrorSampleRate: 1.0, // エラー時は100%記録
      // 機密情報をマスク
      beforeSend(event, hint) {
        // 個人情報が含まれる可能性のあるフィールドを削除
        if (event.request) {
          // URLからクエリパラメータを削除（個人情報が含まれる可能性）
          if (event.request.url) {
            try {
              const url = new URL(event.request.url);
              url.search = "";
              event.request.url = url.toString();
            } catch {
              // URL解析に失敗した場合はそのまま
            }
          }
        }
        return event;
      },
    });
  } catch (error) {
    console.error("Failed to initialize Sentry:", error);
  }
}

/**
 * エラーをSentryに送信
 */
export async function captureError(error: Error, context?: Record<string, unknown>): Promise<void> {
  if (!Sentry) {
    // Sentryが利用できない場合はフォールバック
    console.error("Error (Sentry not available):", error, context);
    return;
  }

  try {
    Sentry.captureException(error, {
      contexts: {
        custom: context || {},
      },
    });
  } catch (err) {
    console.error("Failed to capture error in Sentry:", err);
  }
}

/**
 * メッセージをSentryに送信
 */
export async function captureMessage(message: string, level: "info" | "warning" | "error" = "info"): Promise<void> {
  if (!Sentry) {
    return;
  }

  try {
    Sentry.captureMessage(message, level);
  } catch (error) {
    console.error("Failed to capture message in Sentry:", error);
  }
}

/**
 * ユーザーコンテキストを設定
 */
export async function setUser(userId: string, email?: string, username?: string): Promise<void> {
  if (!Sentry) {
    return;
  }

  try {
    Sentry.setUser({
      id: userId,
      email,
      username,
    });
  } catch (error) {
    console.error("Failed to set user in Sentry:", error);
  }
}

/**
 * ユーザーコンテキストをクリア
 */
export async function clearUser(): Promise<void> {
  if (!Sentry) {
    return;
  }

  try {
    Sentry.setUser(null);
  } catch (error) {
    console.error("Failed to clear user in Sentry:", error);
  }
}
