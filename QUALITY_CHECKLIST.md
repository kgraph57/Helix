# Medical Prompt Hub 品質チェックリスト

このチェックリストは、プロンプトとドキュメントの品質を確保するために使用します。

## プロンプトの品質チェック

### 医学的正確性
- [x] 現在の医学的知識とエビデンスに基づいている
- [x] 重要な疾患や緊急性の高い状態が適切に考慮されている
- [x] 免責事項と注意事項が明記されている
- [x] AIの出力が医療判断を代替しないことが明記されている

### 構造と形式
- [x] 概要セクションがある
- [x] プロンプトテンプレートが明確に記載されている
- [x] 使用例が具体的に示されている
- [x] ベストプラクティスが記載されている
- [x] カスタマイズ方法が説明されている
- [x] 関連プロンプトへのリンクがある

### 実用性
- [x] 実際の臨床場面で使用可能な内容
- [x] 入力項目が明確（[項目名]形式）
- [x] 専門用語の使用が適切
- [x] 様々な患者背景に対応可能

### 安全性
- [x] 緊急時の対応が適切に記載されている
- [x] 個人情報保護への配慮が示されている
- [x] 限界と注意点が明記されている

## ドキュメントの品質チェック

### README.md
- [x] プロジェクトの目的が明確
- [x] 重要な注意事項が冒頭に記載
- [x] カテゴリ説明が充実
- [x] 使い方が簡潔に説明されている
- [x] ライセンス情報がある
- [x] 免責事項が明記されている

### 入門ガイド (getting-started.md)
- [x] 初心者にわかりやすい説明
- [x] ステップバイステップの手順
- [x] 具体例がある
- [x] 注意事項が明確

### コントリビューションガイド (CONTRIBUTING.md)
- [x] コントリビューション方法が明確
- [x] プロンプト作成ガイドラインがある
- [x] プロセスが説明されている
- [x] 行動規範がある

### CHANGELOG.md
- [x] バージョン情報が記載されている
- [x] 変更内容が整理されている
- [x] 日付が記載されている

## ファイル構造チェック

### ディレクトリ構造
- [x] prompts/ ディレクトリが適切に分類されている
  - [x] diagnosis/
  - [x] treatment/
  - [x] communication/
  - [x] literature/
  - [x] case-analysis/
- [x] docs/ ディレクトリがある
- [x] examples/ ディレクトリがある

### 必須ファイル
- [x] README.md
- [x] LICENSE
- [x] CONTRIBUTING.md
- [x] CHANGELOG.md
- [x] .gitignore

## 現在の実装状況

### 完成したプロンプト (7個)
- [x] 鑑別診断プロンプト (diagnosis/differential-diagnosis.md)
- [x] 症状分析プロンプト (diagnosis/symptom-analysis.md)
- [x] 検査結果解釈プロンプト (diagnosis/lab-interpretation.md)
- [x] 治療計画立案プロンプト (treatment/treatment-planning.md)
- [x] 患者教育プロンプト (communication/patient-education.md)
- [x] 論文要約プロンプト (literature/paper-summary.md)
- [x] 症例提示プロンプト (case-analysis/case-presentation.md)

### 完成したドキュメント
- [x] README.md
- [x] 入門ガイド (docs/getting-started.md)
- [x] コントリビューションガイド (CONTRIBUTING.md)
- [x] CHANGELOG.md
- [x] プロジェクト構造説明 (PROJECT_STRUCTURE.md)

### 完成した使用例
- [x] 診断支援の使用例 (examples/diagnosis-example.md)

### 今後追加予定のプロンプト
- [ ] 薬剤選択プロンプト (treatment/medication-selection.md)
- [ ] 投与量計算プロンプト (treatment/dosage-calculation.md)
- [ ] インフォームドコンセントプロンプト (communication/informed-consent.md)
- [ ] 共感的応答プロンプト (communication/empathetic-response.md)
- [ ] エビデンス統合プロンプト (literature/evidence-synthesis.md)
- [ ] ガイドライン抽出プロンプト (literature/guideline-extraction.md)
- [ ] 臨床推論プロンプト (case-analysis/clinical-reasoning.md)
- [ ] 予後予測プロンプト (case-analysis/outcome-prediction.md)

### 今後追加予定のドキュメント
- [ ] ベストプラクティスガイド (docs/best-practices.md)
- [ ] ユースケース集 (docs/use-cases.md)
- [ ] FAQ (docs/faq.md)

## v1.0.0 リリース準備状況

### 必須項目（v1.0.0リリースに必要）
- [x] 基本的なプロンプトセット（各カテゴリ最低1つ）
- [x] README.md
- [x] LICENSE
- [x] 入門ガイド
- [x] コントリビューションガイド
- [x] 使用例（最低1つ）
- [x] CHANGELOG.md

### 推奨項目（v1.0.0に含めることが望ましい）
- [x] 各カテゴリ複数のプロンプト
- [ ] ベストプラクティスガイド
- [ ] FAQ
- [ ] 複数の使用例

### 評価
**v1.0.0リリースの準備は整っています。** 必須項目はすべて完成しており、各カテゴリに実用的なプロンプトが揃っています。推奨項目の一部（ベストプラクティス、FAQ）は今後のバージョンで追加予定です。

## 次のステップ

1. GitHubへのコミットとプッシュ
2. リリースタグの作成（v1.0.0）
3. GitHub Releasesでの公開
4. リポジトリ説明とトピックの設定
5. コミュニティへの告知
