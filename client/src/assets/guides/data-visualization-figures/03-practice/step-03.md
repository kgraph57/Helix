# ステップ3: Figure Legendの書き方

## このステップの目的

明確で完全なFigure Legend（図の凡例）を作成する方法を学びます。良い凡例は、図を独立して理解できるようにします。

## Figure Legendの構成要素

### 必須要素

1. **図の説明**: 図が何を示しているか
2. **方法の説明**: データの収集方法や解析方法
3. **記号・略語の説明**: 使用した記号や略語の説明
4. **統計情報**: 使用した統計手法、p値の説明

### 推奨要素

- **サンプルサイズ**: 各群のn数
- **統計的検定**: 使用した検定方法
- **スケール**: 軸の単位やスケール

## 良い凡例の例

### 例1: ボックスプロット

```
Figure 1. Comparison of blood pressure among three treatment groups.
Data are presented as box plots showing median (line), interquartile range (box), 
and 1.5× interquartile range (whiskers). Outliers are shown as individual points.
Group A (n=50), Group B (n=48), Group C (n=52). 
*P < 0.05, **P < 0.01, ***P < 0.001 (Kruskal-Wallis test with post-hoc Dunn's test).
```

### 例2: 棒グラフ

```
Figure 2. Mean blood pressure changes from baseline.
Data are presented as mean ± standard deviation. 
Group A (n=50), Group B (n=48), Group C (n=52).
*P < 0.05 vs Group A (one-way ANOVA with post-hoc Tukey's test).
```

## AIツールを活用した凡例作成

**ChatGPT / Claude プロンプト例:**
```
以下の情報から、論文用のFigure Legendを作成してください。

図の種類: ボックスプロット
内容: 3つの治療群（A群、B群、C群）での血圧の比較
データ: 
- A群: n=50, 中央値=120, Q1=110, Q3=130
- B群: n=48, 中央値=135, Q1=125, Q3=145
- C群: n=52, 中央値=110, Q1=100, Q3=120
統計検定: Kruskal-Wallis検定、事後検定はDunn検定
p値: A vs B = 0.02, A vs C = 0.15, B vs C = 0.001

ジャーナルのスタイルに準拠した、明確で完全な凡例を作成してください。
```

## よくある質問

**Q: 凡例はどのくらいの長さが適切ですか？**
A: 通常は50-150語程度です。図を独立して理解できる程度の情報を含めます。

**Q: 略語は凡例で説明する必要がありますか？**
A: はい。論文で初めて使用する略語は、凡例または本文で説明する必要があります。

## 次のステップ

凡例の書き方が理解できたら、次は表の作成方法を学びます。

---

更新日: 2025年12月

