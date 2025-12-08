/**
 * エラー追跡ユーティリティ
 * フロントエンドのエラーを収集・記録
 * Sentryが利用可能な場合はSentryに送信、そうでない場合はフォールバック
 */

import { captureError as sentryCaptureError } from "./sentry";

interface ErrorContext {
  url?: string;
  userAgent?: string;
  timestamp?: string;
  userId?: string;
  correlationId?: string;
  [key: string]: unknown;
}

class ErrorTracker {
  private errorQueue: Array<{
    error: Error;
    context: ErrorContext;
    timestamp: string;
  }> = [];
  private readonly maxQueueSize = 50;
  private readonly flushInterval = 30000; // 30秒

  constructor() {
    // 定期的にエラーを送信（実装時）
    if (typeof window !== "undefined") {
      setInterval(() => this.flush(), this.flushInterval);
      
      // ページアンロード時にエラーを送信
      window.addEventListener("beforeunload", () => {
        this.flush();
      });
    }
  }

  /**
   * エラーを記録
   */
  captureError(error: Error, context?: ErrorContext): void {
    const errorData = {
      error,
      context: {
        ...context,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    };

    // 開発環境ではコンソールに出力
    if (import.meta.env.DEV) {
      console.error("Error captured:", error, errorData.context);
    }

    // エラーキューに追加
    this.errorQueue.push(errorData);

    // キューサイズを制限
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // 本番環境では即座に送信（実装時）
    if (import.meta.env.PROD) {
      this.sendError(errorData);
    }
  }

  /**
   * エラーを送信（Sentryに送信、利用できない場合はフォールバック）
   */
  private async sendError(errorData: {
    error: Error;
    context: ErrorContext;
    timestamp: string;
  }): Promise<void> {
    // Sentryに送信を試みる
    await sentryCaptureError(errorData.error, errorData.context);

    // 開発環境ではコンソールにも出力
    if (import.meta.env.DEV) {
      console.error("[Error Tracking]", errorData);
    }
  }

  /**
   * エラーキューをフラッシュ
   */
  private async flush(): Promise<void> {
    if (this.errorQueue.length === 0) return;

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    // エラーを一括送信
    await Promise.all(errors.map((errorData) => this.sendError(errorData)));
  }

  /**
   * ユーザーコンテキストを設定
   */
  setUser(userId: string): void {
    // 将来的にSentry等で使用
  }

  /**
   * 相関IDを設定
   */
  setCorrelationId(correlationId: string): void {
    // 将来的にSentry等で使用
  }
}

// シングルトンインスタンス
export const errorTracker = new ErrorTracker();

/**
 * グローバルエラーハンドラーを設定
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window === "undefined") return;

  // 未処理のエラーをキャッチ
  window.addEventListener("error", (event) => {
    errorTracker.captureError(
      event.error || new Error(event.message),
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: "unhandled_error",
      }
    );
  });

  // 未処理のPromise拒否をキャッチ
  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason));

    errorTracker.captureError(error, {
      type: "unhandled_promise_rejection",
    });
  });
}
