# Zennの記事スタイル詳細分析

## 重要なポイント

### 1. コンテンツエリアの幅と余白
- **最大幅**: 約680px（記事本文）
- **左右の余白**: 十分なpadding（推定40-48px）
- **背景**: 白（または薄いグレー）のカード
- **外側の余白**: コンテナとの間に十分なスペース

### 2. タイポグラフィ
- **本文フォントサイズ**: 16px
- **行間（line-height）**: 1.8〜2.0（非常にゆったり）
- **段落間**: 24px〜32px（大きめ）
- **見出しH2**: 28px〜32px、上余白48px、下余白24px
- **見出しH3**: 24px、上余白32px、下余白16px

### 3. 文字の折り返し
- **word-break**: keep-all または normal（日本語は自然に折り返し）
- **overflow-wrap**: break-word（英単語が長い場合のみ折り返し）
- **white-space**: normal

### 4. リストのスタイル
- **リスト項目間**: 8px〜12px
- **リストマーカー**: 標準的なbullet、適度な左インデント

### 5. コードブロック
- **背景色**: 薄いグレー（#f6f6f6程度）
- **padding**: 16px〜24px
- **border-radius**: 8px
- **フォント**: monospace
- **余白**: 上下24px

### 6. 引用（blockquote）
- **左ボーダー**: 4px、青またはグレー
- **左padding**: 16px
- **背景**: 薄いグレー（オプション）
- **イタリック**: なし（日本語記事では通常フォント）

### 7. テーブル
- **ボーダー**: 1px solid、薄いグレー
- **セル内padding**: 12px〜16px
- **ヘッダー背景**: 薄いグレー

### 8. 画像・埋め込み
- **最大幅**: 100%
- **上下余白**: 24px〜32px
- **border-radius**: 8px（オプション）

## 実装すべきCSS

```css
.article-content {
  max-width: 680px;
  margin: 0 auto;
  padding: 48px 40px;
  background: white;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.9;
  color: #333;
}

.article-content p {
  margin-top: 24px;
  margin-bottom: 24px;
}

.article-content h2 {
  font-size: 28px;
  font-weight: 700;
  margin-top: 48px;
  margin-bottom: 24px;
  line-height: 1.4;
}

.article-content h3 {
  font-size: 24px;
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 16px;
  line-height: 1.4;
}

.article-content ul,
.article-content ol {
  margin-top: 24px;
  margin-bottom: 24px;
  padding-left: 24px;
}

.article-content li {
  margin-top: 8px;
  margin-bottom: 8px;
}

.article-content code {
  background: #f6f6f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Consolas', 'Monaco', monospace;
}

.article-content pre {
  background: #f6f6f6;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 24px;
  margin-bottom: 24px;
}

.article-content blockquote {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  margin-top: 24px;
  margin-bottom: 24px;
  color: #666;
}

.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  margin-bottom: 24px;
}

.article-content th,
.article-content td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.article-content th {
  background: #f6f6f6;
  font-weight: 600;
}

/* 文字のはみ出し防止 */
.article-content * {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.article-content img {
  max-width: 100%;
  height: auto;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
}
```

## レイアウト構造

```html
<div class="page-container">
  <!-- 左サイドバー（固定） -->
  <aside class="sidebar">
    <!-- 目次 -->
  </aside>
  
  <!-- メインコンテンツ（スクロール可能） -->
  <main class="main-content">
    <article class="article-content">
      <!-- Markdownコンテンツ -->
    </article>
  </main>
</div>
```

## 重要な注意点

1. **ScrollAreaを使わない**: 通常のページスクロールを使用
2. **サイドバーをposition: sticky**で固定
3. **コンテンツエリアの幅を680pxに制限**
4. **十分な余白を確保**（padding: 48px 40px）
5. **行間をゆったりと**（line-height: 1.9）
6. **段落間を広く**（margin: 24px）
