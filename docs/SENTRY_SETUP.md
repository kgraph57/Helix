# Sentry統合セットアップガイド

## 概要

Sentryは、本番環境でのエラー追跡とモニタリングを提供します。このドキュメントでは、Sentryのセットアップ方法を説明します。

## セットアップ手順

### 1. Sentryパッケージのインストール

```bash
pnpm add @sentry/react
```

### 2. Sentryプロジェクトの作成

1. [Sentry](https://sentry.io/)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成（Reactを選択）
3. DSN（Data Source Name）を取得

### 3. 環境変数の設定

`.env`ファイルまたは環境変数に以下を追加：

```bash
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### 4. 開発環境でのテスト（オプション）

開発環境でもSentryを有効にしたい場合：

```bash
VITE_SENTRY_ENABLE_DEV=true
```

## 機能

- **エラー追跡**: 未処理のエラー、Promise拒否、React Error Boundaryのエラーを自動的に追跡
- **パフォーマンス監視**: ページ読み込み時間、APIレスポンス時間を監視
- **セッションリプレイ**: エラー発生時のユーザー操作を記録（プライバシー保護あり）
- **ユーザーコンテキスト**: エラー発生時のユーザー情報を記録

## 実装済み機能

- ✅ Sentry初期化（`client/src/lib/sentry.ts`）
- ✅ エラートラッキング統合（`client/src/lib/errorTracking.ts`）
- ✅ ErrorBoundary統合（`client/src/components/ErrorBoundary.tsx`）
- ✅ グローバルエラーハンドラー統合（`client/src/main.tsx`）

## 注意事項

- Sentryがインストールされていない場合でも、アプリケーションは正常に動作します（フォールバック機能あり）
- 個人情報が含まれる可能性のあるデータは自動的にマスクされます
- 本番環境では、パフォーマンス監視とセッションリプレイは10%のサンプリングレートで実行されます
