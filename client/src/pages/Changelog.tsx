/**
 * Changelog / 更新情報ページ
 * サービスの更新履歴を表示
 */

import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles, Bug, Settings, FileText, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";
import { motion } from "framer-motion";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "feature" | "fix" | "improvement" | "security";
  changes: string[];
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: "1.0.1",
    date: "2025-01-XX",
    type: "feature",
    changes: [
      "FAQ/ヘルプドキュメントページの追加",
      "お問い合わせフォームの実装",
      "SEO最適化（メタタグ、OGP、構造化データ）",
      "Google Analytics 4の統合",
      "Cookie同意管理の実装（GDPR対応）",
      "Sentry統合（エラートラッキング）",
      "オンボーディングモーダルの実装",
      "ホームページUX改善（おすすめプロンプト表示、ガイドセクション改善）",
      "テストカバレッジの向上",
      "論文読解ガイドの追加",
      "サイドバーにFAQ・お問い合わせボタンを追加",
    ],
  },
  {
    version: "1.0.0",
    date: "2024-XX-XX",
    type: "feature",
    changes: [
      "初回リリース",
      "100以上の専門プロンプトの提供",
      "10カテゴリのプロンプト分類",
      "ワークフローガイド機能",
      "症例報告完全版ガイド",
      "AI活用Tips（41個）",
      "お気に入り機能",
      "検索機能",
      "カテゴリ別フィルタリング",
      "レスポンシブデザイン対応",
    ],
  },
];

const typeIcons = {
  feature: Sparkles,
  fix: Bug,
  improvement: Settings,
  security: FileText,
};

const typeLabels = {
  feature: "新機能",
  fix: "バグ修正",
  improvement: "改善",
  security: "セキュリティ",
};

const typeColors = {
  feature: "default",
  fix: "destructive",
  improvement: "secondary",
  security: "outline",
} as const;

export default function Changelog() {
  useEffect(() => {
    updateSEO({
      title: "更新履歴 | Medical Prompt Hub",
      description: "Medical Prompt Hubの更新履歴とリリースノート。新機能、バグ修正、改善内容を確認できます。",
      path: "/changelog",
      keywords: "更新履歴,Changelog,リリースノート,新機能,バグ修正"
    });

    // 構造化データ（CollectionPage）を追加
    addStructuredData({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Medical Prompt Hub 更新履歴",
      "description": "Medical Prompt Hubの更新履歴",
      "url": `${BASE_URL}/changelog`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": changelogEntries.length,
        "itemListElement": changelogEntries.map((entry, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": `バージョン ${entry.version}`,
          "description": entry.changes.join(", ")
        }))
      }
    });
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Linear.app風：ページヘッダー */}
        <PageHeader
          category="Changelog"
          title="Changelog"
          description="サービスの更新内容とリリースノート"
        />

        {/* Changelog Entries */}
        <div className="space-y-8">
          {changelogEntries.map((entry, index) => {
            const Icon = typeIcons[entry.type];
            const label = typeLabels[entry.type];

            return (
              <motion.div
                key={entry.version}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-6 md:p-8 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg" />
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-neutral-900 dark:text-neutral-50 tracking-[-0.02em]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                        v{entry.version}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <Calendar className="w-4 h-4" />
                        {entry.date}
                      </div>
                    </div>
                  </div>
                  <Badge className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                    {label}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Future Updates */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" strokeWidth={2} />
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Roadmap
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Upcoming features
          </h2>
          <div className="space-y-4 text-base text-neutral-600 dark:text-neutral-400">
            <p>以下の機能を順次実装予定です：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>プロンプトの評価・フィードバック機能</li>
              <li>ユーザー投稿機能（コミュニティプロンプト）</li>
              <li>プロンプトのバージョン管理</li>
              <li>多言語対応（英語版）</li>
              <li>API提供</li>
            </ul>
            <p className="mt-6">
              ご要望やフィードバックは<Link href="/contact" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">お問い合わせフォーム</Link>からお願いいたします。
            </p>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
