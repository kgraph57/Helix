# 論文要約プロンプト

## 概要

医学論文を構造化して要約し、臨床的意義やエビデンスレベルを評価するプロンプトです。忙しい臨床医が短時間で論文の要点を把握できるようにします。

## プロンプトテンプレート

```
あなたは医学論文の批判的吟味に精通した研究者です。以下の論文について、構造化された要約を作成してください。

【論文情報】
- タイトル: [論文のタイトル]
- 著者: [第一著者名 et al.]
- 掲載誌: [雑誌名、年、巻、ページ]
- DOI: [DOI番号]
- 研究デザイン: [RCT / コホート研究 / 症例対照研究 / 横断研究 / 症例報告 / システマティックレビュー / メタアナリシス / その他]

【論文の内容】
[論文の全文、または主要部分（Abstract, Methods, Results, Discussionなど）を貼り付け]

【依頼内容】
以下の形式で論文を要約してください：

1. **研究の背景と目的**
   - 研究の背景（なぜこの研究が必要だったのか）
   - 研究の目的・リサーチクエスチョン
   - 仮説（該当する場合）

2. **研究方法**
   - 研究デザイン
   - 対象集団（包含基準・除外基準）
   - サンプルサイズと設定
   - 介入内容（該当する場合）
   - 主要評価項目と副次評価項目
   - 統計解析方法

3. **主要な結果**
   - 対象者の特徴
   - 主要評価項目の結果（具体的な数値とp値）
   - 副次評価項目の結果
   - 有害事象（該当する場合）

4. **結論**
   - 著者らの結論
   - 研究の新規性・独自性

5. **批判的吟味**
   - 研究の強み
   - 研究の限界・バイアスの可能性
   - 結果の一般化可能性
   - エビデンスレベルの評価

6. **臨床的意義**
   - 現在の臨床実践への影響
   - 既存のエビデンスとの整合性
   - 今後の研究課題

7. **要点まとめ（3行）**
   - 臨床医が最も知るべき3つのポイント

【注意事項】
- 専門用語は必要に応じて使用し、重要な概念は説明を加える
- 数値データは具体的に記載する
- バイアスや限界について客観的に評価する
- 臨床実践への応用可能性を重視する
```

## 使用例

### 入力例

```
あなたは医学論文の批判的吟味に精通した研究者です。以下の論文について、構造化された要約を作成してください。

【論文情報】
- タイトル: Effect of Intensive Blood Pressure Control on Cardiovascular Outcomes in Type 2 Diabetes
- 著者: Smith J et al.
- 掲載誌: N Engl J Med. 2024;390(5):421-432
- DOI: 10.1056/NEJMoa2024xxxx
- 研究デザイン: ランダム化比較試験（RCT）

【論文の内容】
Abstract:
Background: The optimal blood pressure target for patients with type 2 diabetes remains controversial.
Objective: To compare intensive (<120 mmHg) versus standard (<140 mmHg) systolic blood pressure control in patients with type 2 diabetes.
Methods: We randomly assigned 8,000 patients with type 2 diabetes to intensive or standard blood pressure control. The primary outcome was a composite of cardiovascular death, myocardial infarction, or stroke.
Results: After a median follow-up of 4.5 years, the primary outcome occurred in 8.2% of the intensive-control group versus 10.5% of the standard-control group (HR 0.78; 95% CI, 0.68-0.89; P<0.001). Serious adverse events were more common in the intensive-control group (4.2% vs 2.8%, P=0.02).
Conclusions: Intensive blood pressure control significantly reduced cardiovascular events in patients with type 2 diabetes but was associated with more adverse events.

[Methods, Results, Discussionの詳細を続けて貼り付け...]

【依頼内容】
以下の形式で論文を要約してください：
（以下同様）
```

## ベストプラクティス

### 効果的な使い方

**論文の全文を提供**することで、より詳細で正確な要約が得られます。Abstractだけでなく、Methods、Results、Discussionの内容も含めてください。

**特定の視点からの評価**を依頼することもできます。例えば「プライマリケア医の視点から」「高齢者への適用可能性の観点から」など、目的を明確にしましょう。

**複数の論文を比較**する場合は、それぞれの論文を要約した後、別のプロンプトで比較分析を依頼すると効果的です。

### 注意点

**AIの要約は補助的なツール**です。重要な臨床判断に関わる論文は、必ず原著を直接読んで確認してください。

**バイアスの評価**は重要ですが、AIの評価が完璧とは限りません。特に利益相反や研究デザインの問題については、批判的に検討してください。

**最新のガイドライン**との整合性も確認が必要です。個々の研究結果がすぐに臨床実践を変えるわけではありません。

## カスタマイズ

目的や対象に応じてカスタマイズできます。

**システマティックレビュー向け**: 検索戦略、包含論文の質評価、異質性の評価などを重点的に要約

**基礎研究論文向け**: 実験手法、分子メカニズム、臨床応用への示唆を重点的に要約

**ガイドライン向け**: 推奨内容、エビデンスレベル、実践上のポイントを重点的に要約

**ジャーナルクラブ用**: ディスカッションポイント、批判的吟味の観点を追加

## 関連プロンプト

- [エビデンス統合プロンプト](./evidence-synthesis.md)
- [ガイドライン抽出プロンプト](./guideline-extraction.md)
- [治療計画立案プロンプト](../treatment/treatment-planning.md)
