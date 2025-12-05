import { Prompt } from "./prompts";

// 既存のプロンプト定義（prompts.tsの内容を含む）
export const fullPrompts: Prompt[] = [
  // 診断支援
  {
    id: "diagnosis-differential",
    title: "Differential Diagnosis Generator",
    description: "主訴と現病歴から鑑別診断リストを作成し、見逃しを防ぎます。",
    category: "diagnosis",
    template: `あなたは熟練した総合診療医です。以下の症例情報に基づき、鑑別診断リストを作成してください。

# 症例情報
- 主訴: [主訴を入力]
- 現病歴: [現病歴を入力]
- 既往歴: [既往歴を入力]
- バイタルサイン: [バイタルサインを入力]

# 出力形式
1. **Critical (見逃してはいけない疾患)**: 3つ
2. **Common (頻度の高い疾患)**: 3つ
3. **Rare (稀だが考慮すべき疾患)**: 2つ

各疾患について、この症例で疑う根拠と、除外するために必要な追加検査を簡潔に記載してください。`,
    inputs: [
      { key: 'case_info', label: '症例情報', placeholder: '主訴、現病歴、既往歴、バイタルサインなどを入力', type: 'textarea' }
    ]
  },
  {
    id: "diagnosis-symptom-analysis",
    title: "Symptom Analysis (OPQRST)",
    description: "症状をOPQRST法に基づいて分析し、問診の不足点を指摘します。",
    category: "diagnosis",
    template: `以下の症状について、OPQRST法（Onset, Palliative/Provocative, Quality, Region/Radiation, Severity, Time）に基づいて分析してください。
また、診断を絞り込むために追加で聴取すべき問診事項を3つ挙げてください。

# 症状記述
[患者の症状や言葉を入力]`,
    inputs: [
      { key: 'symptom', label: '症状記述', placeholder: '例: 昨晩から急に右下腹部が痛くなり、歩くと響く感じがします。', type: 'textarea' }
    ]
  },
  {
    id: "diagnosis-lab-interpretation",
    title: "Lab Result Interpretation",
    description: "異常な検査結果の解釈と、次に考えるべき病態を提示します。",
    category: "diagnosis",
    template: `以下の検査結果の異常値について、考えられる病態生理学的メカニズムと、鑑別すべき疾患を挙げてください。

# 検査結果
[異常な検査項目と数値を入力]
# 患者背景
[年齢、性別、主訴など]`,
    inputs: [
      { key: 'lab_results', label: '検査結果', placeholder: '例: Na 125, K 5.8, Cre 2.1', type: 'textarea' },
      { key: 'patient_info', label: '患者背景', placeholder: '例: 70歳男性、全身倦怠感', type: 'text' }
    ]
  },

  // 治療計画
  {
    id: "treatment-planning",
    title: "Evidence-Based Treatment Plan",
    description: "最新のガイドラインに基づいた治療計画のオプションを提示します。",
    category: "treatment",
    template: `以下の診断に対する標準的な治療計画を、最新のガイドライン（UpToDateや学会ガイドライン）に基づいて提示してください。

# 診断名
[診断名を入力]
# 患者背景
[年齢、合併症、アレルギーなど]

# 出力要件
1. 第一選択薬（投与量・期間含む）
2. 代替治療（第一選択が使えない場合）
3. 非薬物療法
4. フォローアップ計画`,
    inputs: [
      { key: 'diagnosis', label: '診断名', placeholder: '例: 市中肺炎（中等症）', type: 'text' },
      { key: 'patient_context', label: '患者背景', placeholder: '例: 65歳女性、ペニシリンアレルギーあり', type: 'text' }
    ]
  },

  // 書類作成
  {
    id: "doc-referral-letter",
    title: "Referral Letter Generator",
    description: "紹介先の診療科や目的に合わせた、失礼のない紹介状（診療情報提供書）を作成します。",
    category: "documentation",
    template: `以下の情報を基に、[紹介先診療科]宛の診療情報提供書（紹介状）を作成してください。
丁寧で専門的な文体にしてください。

# 患者情報
- 氏名: [患者氏名] (年齢/性別)
- 診断名/主訴: [診断名]

# 紹介目的
[紹介の目的（例：精査加療、手術依頼）]

# 経過要約
[これまでの経過、検査結果、治療内容]

# 現在の処方
[処方薬リスト]`,
    inputs: [
      { key: 'target_dept', label: '紹介先診療科', placeholder: '例: 循環器内科 御机下', type: 'text' },
      { key: 'patient_name', label: '患者情報', placeholder: '例: 山田太郎 殿 (72歳男性)', type: 'text' },
      { key: 'purpose', label: '紹介目的', placeholder: '例: 労作性狭心症の疑いのため、冠動脈造影をお願い申し上げます。', type: 'textarea' },
      { key: 'history', label: '経過要約', placeholder: '経過を入力...', type: 'textarea' }
    ]
  },
  {
    id: "doc-discharge-summary",
    title: "Discharge Summary Helper",
    description: "入院経過を要約し、退院サマリーの「入院後経過」欄を作成します。",
    category: "documentation",
    template: `以下の入院中の出来事を時系列で整理し、退院サマリーの「入院後経過」セクションとしてまとめてください。
簡潔かつ医学的に正確な表現を使用してください。

# 入院中の経過メモ
[日付ごとのイベント、検査、治療変更などを入力]`,
    inputs: [
      { key: 'course', label: '経過メモ', placeholder: '例: \nX月X日 入院。抗菌薬開始。\nX月Y日 解熱傾向。食事開始。\nX月Z日 退院決定。', type: 'textarea' }
    ]
  },

  // 薬剤・処方
  {
    id: "med-renal-dosing",
    title: "Renal Dosing Adjustment",
    description: "腎機能（eGFR/CCr）に応じた薬剤の投与量調節を提案します。",
    category: "medication",
    template: `以下の患者における[薬剤名]の適切な投与設計を教えてください。
腎機能に応じた減量基準（添付文書やSanford Guideなど）を参照してください。

# 患者情報
- 年齢/性別: [年齢/性別]
- 血清クレアチニン: [Cre値] mg/dL
- 推定eGFR/CCr: [eGFRまたはCCr]

# 対象薬剤
[薬剤名]`,
    inputs: [
      { key: 'drug_name', label: '薬剤名', placeholder: '例: レボフロキサシン', type: 'text' },
      { key: 'renal_function', label: '腎機能データ', placeholder: '例: Cre 2.5, eGFR 22', type: 'text' }
    ]
  },
  {
    id: "med-interaction-check",
    title: "Drug Interaction Checker",
    description: "処方薬リスト内の相互作用をチェックし、注意すべき組み合わせを指摘します。",
    category: "medication",
    template: `以下の薬剤リストに含まれる薬物相互作用をチェックしてください。
特に「併用禁忌」と「併用注意」を明確に区別し、臨床的にどのような影響が出るか（例：血中濃度上昇、QT延長など）を説明してください。

# 薬剤リスト
[薬剤名を入力（カンマ区切りまたは改行）]`,
    inputs: [
      { key: 'drug_list', label: '薬剤リスト', placeholder: '例: ワーファリン, アスピリン, クラリスロマイシン', type: 'textarea' }
    ]
  },

  // 患者コミュニケーション
  {
    id: "comm-patient-education",
    title: "Patient Education Material",
    description: "専門用語を使わずに、患者さんに病気や治療を説明するための文章を作成します。",
    category: "communication",
    template: `以下の医学的情報を、医学知識のない一般の方（または高齢者/子供）にもわかるように、専門用語を使わずに噛み砕いて説明してください。
不安を煽らず、かつ重要な注意点は明確に伝わるようにしてください。

# 説明したい内容
[診断名や治療法、生活指導の内容]
# 対象
[例：高齢の患者さん、小学生の子供を持つ親]`,
    inputs: [
      { key: 'topic', label: '説明内容', placeholder: '例: 慢性腎臓病の食事療法（減塩とカリウム制限）', type: 'textarea' },
      { key: 'target', label: '対象患者', placeholder: '例: 80代女性とその家族', type: 'text' }
    ]
  },
  {
    id: "comm-bad-news",
    title: "Breaking Bad News (SPIKES)",
    description: "SPIKESプロトコルに基づき、悪い知らせを伝える際の会話シミュレーションを行います。",
    category: "communication",
    template: `以下の「悪い知らせ」を患者さんに伝えるための準備をSPIKESプロトコルに基づいて行いたいです。
特に「Knowledge（情報の伝え方）」と「Empathy（共感）」のフェーズで、具体的にどのような言葉をかけるべきか、会話例を3パターン作成してください。

# 悪い知らせの内容
[例：癌の再発、治療の中止など]
# 患者さんの状況
[理解度、家族背景など]`,
    inputs: [
      { key: 'news', label: '悪い知らせ', placeholder: '例: 膵臓癌の肝転移が見つかり、手術適応外であること', type: 'textarea' },
      { key: 'patient_context', label: '患者状況', placeholder: '例: 60代男性、治ると信じていた', type: 'text' }
    ]
  },

  // 医学文献
  {
    id: "lit-paper-summary",
    title: "Paper Abstract Summary",
    description: "論文の抄録（Abstract）を構造化して要約し、臨床的意義を抽出します。",
    category: "literature",
    template: `以下の論文Abstractを日本語で要約してください。
以下のフォーマットに従って出力してください。

1. **背景 (Background)**: 何が課題だったのか
2. **方法 (Methods)**: どのような研究デザインか（PICO）
3. **結果 (Results)**: 主要な数字と統計学的有意差
4. **結論 (Conclusion)**: 著者らの主張
5. **臨床的意義 (Clinical Implication)**: 明日の診療にどう役立つか

# Abstract
[Abstractのテキストを貼り付け]`,
    inputs: [
      { key: 'abstract', label: 'Abstract本文', placeholder: 'Paste abstract here...', type: 'textarea' }
    ]
  },

  // 研究・学会
  {
    id: "res-english-proofread",
    title: "Academic English Proofreading",
    description: "医学論文の英語を、学術的に自然で洗練された表現に校正します。",
    category: "research",
    template: `以下の英語の文章を、医学論文（Academic Medical Writing）として自然で洗練された表現に校正してください。
意味を変えずに、よりフォーマルで明確な言い回しがあれば提案してください。
修正箇所とその理由も簡潔に説明してください。

# 原文
[校正したい英文]`,
    inputs: [
      { key: 'text', label: '英文ドラフト', placeholder: '例: We used 30 mice for this experiment.', type: 'textarea' }
    ]
  },
  {
    id: "res-abstract-generator",
    title: "Conference Abstract Generator",
    description: "研究結果のメモから、学会発表用の抄録（Abstract）案を作成します。",
    category: "research",
    template: `以下の研究データを基に、学会発表用の抄録（Abstract）を作成してください。
構成は【目的】【方法】【結果】【結論】の4部構成とし、文字数は[文字数制限]程度に収めてください。

# 研究データ
[研究の背景、方法、主な結果データ、結論のメモ]`,
    inputs: [
      { key: 'data', label: '研究データ', placeholder: '研究の要点を入力...', type: 'textarea' },
      { key: 'limit', label: '文字数制限', placeholder: '例: 日本語800文字 または 英語250語', type: 'text' }
    ]
  },

  // 症例分析
  {
    id: "case-presentation",
    title: "Case Presentation Writer",
    description: "日本語の経過メモから、英語論文の「Case Presentation」セクションを作成します。",
    category: "case-analysis",
    template: `以下の症例経過（日本語）を、英語の医学論文の「Case Presentation」セクションとして翻訳・執筆してください。
時系列を明確にし、医学的に適切な用語（"presented with...", "revealed...", "was admitted for..."など）を使用してください。

# 症例経過
[日本語での経過メモ]`,
    inputs: [
      { key: 'case_note', label: '症例経過', placeholder: '例: 50歳男性。3日前からの胸痛で救急搬送。心電図でST上昇あり...', type: 'textarea' }
    ]
  },

  // 教育・学習
  {
    id: "edu-anatomy-physiology",
    title: "Anatomy & Physiology Explainer",
    description: "複雑な解剖や生理学のメカニズムを、医学生や研修医向けにわかりやすく解説します。",
    category: "education",
    template: `以下の解剖学的構造または生理学的メカニズムについて、医学生に教えるようにわかりやすく解説してください。
重要な機能、臨床的な関連性（病気との関わり）、覚えるべきポイントを含めてください。

# トピック
[解説してほしいトピック]`,
    inputs: [
      { key: 'topic', label: 'トピック', placeholder: '例: レニン・アンジオテンシン・アルドステロン系', type: 'text' }
    ]
  },

  // 管理・運営
  {
    id: "admin-incident-report",
    title: "Incident Report Helper",
    description: "インシデントレポートの記述を、客観的かつ再発防止に役立つ形式で整理します。",
    category: "administrative",
    template: `以下のインシデント（ヒヤリハット）の状況を、客観的な事実（5W1H）に基づいて整理し、報告書向けの文章を作成してください。
主観的な言い訳や感情的な表現を排除し、事実関係と原因分析、対応内容を明確に分けてください。

# 状況
[インシデントの状況メモ]`,
    inputs: [
      { key: 'situation', label: '状況メモ', placeholder: '例: 点滴の準備中に、隣の患者さんの名前と間違えそうになった...', type: 'textarea' }
    ]
  },
  // 研究支援（高度）
  {
    id: "res-cq-pico",
    title: "Clinical Question to PICO",
    description: "漠然とした臨床上の疑問を、研究可能なPICO形式（Patient, Intervention, Comparison, Outcome）に構造化します。",
    category: "research",
    template: `以下の臨床的な疑問（Clinical Question）を、研究デザインの基礎となるPICO形式に構造化してください。
また、それぞれの要素について、具体的な定義（包含基準・除外基準など）の案も提示してください。

# 臨床的な疑問
[疑問の内容を入力]

# 出力形式
- **P (Patient)**: 対象患者
- **I (Intervention/Exposure)**: 介入または曝露要因
- **C (Comparison)**: 比較対照
- **O (Outcome)**: 主要評価項目と副次評価項目`,
    inputs: [
      { key: 'question', label: '臨床的な疑問', placeholder: '例: 高齢者の心不全で、β遮断薬は本当に予後を改善するのか？', type: 'textarea' }
    ]
  },
  {
    id: "res-pubmed-query",
    title: "PubMed Search Query Builder",
    description: "PICOに基づき、PubMedで効率的に文献を検索するための検索式（MeSH termsを含む）を作成します。",
    category: "research",
    template: `以下の研究テーマ（PICO）に基づいて、PubMedで使用するための最適な検索クエリを作成してください。
適切なMeSH Termsとキーワードを組み合わせ、論理演算子（AND, OR）を正しく使用してください。

# 研究テーマ (PICO)
[PICOの内容を入力]

# 出力
1. **検索クエリ**: コピーしてそのまま使える検索式
2. **解説**: 使用したMeSH Termsとその選定理由`,
    inputs: [
      { key: 'pico', label: 'PICO', placeholder: '例: P: Heart Failure, I: SGLT2 inhibitors, O: Mortality', type: 'textarea' }
    ]
  },
  {
    id: "res-gap-analysis",
    title: "Research Gap Analysis",
    description: "先行研究の要約から、まだ解明されていない点（Research Gap）を特定し、新規性のある研究テーマを提案します。",
    category: "research",
    template: `以下の先行研究の要約リストを読み、現在の知見における「ギャップ（未解明な点）」を特定してください。
そのギャップを埋めるための、新規性のある研究テーマのアイデアを3つ提案してください。

# 先行研究の要約
[先行研究の要約リストを入力]`,
    inputs: [
      { key: 'summaries', label: '先行研究', placeholder: '先行研究1: ...\n先行研究2: ...', type: 'textarea' }
    ]
  },
  {
    id: "res-intro-flow",
    title: "Introduction Structure Builder",
    description: "論文のIntroductionセクションの論理構成（パラグラフごとのトピック）を設計します。",
    category: "research",
    template: `以下の研究テーマについて、論文のIntroduction（緒言）の構成案を作成してください。
一般的な「漏斗型（Broad to Narrow）」の構造に従い、各パラグラフで何を述べるべきかを箇条書きで示してください。

1. **背景（何がわかっているか）**
2. **問題点（何がわかっていないか/Gap）**
3. **研究の目的（本研究で何を明らかにするか）**

# 研究テーマ
[研究のタイトルまたは概要]`,
    inputs: [
      { key: 'topic', label: '研究テーマ', placeholder: '例: 敗血症性ショックにおけるビタミンC投与の効果', type: 'text' }
    ]
  },
  {
    id: "res-cover-letter",
    title: "Cover Letter Generator",
    description: "論文投稿時にエディターへ送るカバーレターを作成します。研究の新規性と重要性をアピールします。",
    category: "research",
    template: `以下の論文情報に基づき、ジャーナルエディター宛のカバーレター（Cover Letter）を作成してください。
この研究がなぜ重要で、なぜこのジャーナルの読者にとって興味深いのかを強調してください。

# 論文情報
- タイトル: [論文タイトル]
- 投稿先ジャーナル: [ジャーナル名]
- 研究の要点（Key Findings）: [主な結果]
- 新規性（Novelty）: [この研究の新しい点]`,
    inputs: [
      { key: 'title', label: '論文タイトル', placeholder: 'Title...', type: 'text' },
      { key: 'journal', label: 'ジャーナル名', placeholder: 'Journal Name...', type: 'text' },
      { key: 'findings', label: '研究の要点', placeholder: 'Key findings...', type: 'textarea' }
    ]
  },
  {
    id: "res-reviewer-response",
    title: "Response to Reviewers",
    description: "査読者からのコメントに対する、礼儀正しく論理的な回答レター（Rebuttal Letter）のドラフトを作成します。",
    category: "research",
    template: `査読者からの以下のコメントに対して、回答（Response）のドラフトを作成してください。
まず査読者の指摘に感謝を示し、指摘に同意する場合は修正内容を、同意できない場合はその理由を論理的かつ丁寧に説明してください。

# 査読コメント
[査読者のコメント]
# こちらの回答方針
[修正したのか、反論するのか、その内容]`,
    inputs: [
      { key: 'comment', label: '査読コメント', placeholder: 'Reviewer says: The sample size is too small...', type: 'textarea' },
      { key: 'strategy', label: '回答方針', placeholder: '例: サンプルサイズは小さいが、パイロット研究としては十分であると説明したい。', type: 'textarea' }
    ]
  },
  {
    id: "res-check-care",
    title: "CARE Checklist Assistant",
    description: "症例報告がCAREガイドライン（報告基準）を満たしているかチェックし、不足項目を指摘します。",
    category: "research",
    template: `以下の症例報告のドラフトを、CAREガイドライン（Case Report Guidelines）に基づいてチェックしてください。
特に以下の項目が含まれているか確認し、不足している場合は具体的に何を追記すべきか指摘してください。

1. **Patient Information**: 患者背景、主訴
2. **Clinical Findings**: 身体所見
3. **Timeline**: 経過の時系列
4. **Diagnostic Assessment**: 診断根拠、鑑別診断
5. **Therapeutic Intervention**: 治療内容
6. **Follow-up and Outcomes**: 転帰
7. **Patient Perspective**: 患者の視点・体験（もしあれば）

# 症例報告ドラフト
[ドラフトを入力]`,
    inputs: [
      { key: 'draft', label: 'ドラフト', placeholder: 'Paste your draft here...', type: 'textarea' }
    ]
  },
  // 統計解析コード生成
  {
    id: "res-stats-python",
    title: "Python Stats Code Generator",
    description: "pandas, scipy, statsmodelsを使用した統計解析用のPythonコードを生成します。",
    category: "research",
    template: `以下のデータ解析を行いたいので、Pythonコード（pandas, scipy, statsmodelsなどを使用）を作成してください。
データフレームの変数名は \`df\` と仮定し、必要なライブラリのインポートも含めてください。

# 解析したい内容
[解析の目的と手法]
# データの構造
[カラム名やデータの型]`,
    inputs: [
      { key: 'analysis', label: '解析内容', placeholder: '例: 2群間（介入群vs対照群）の血圧の平均値をt検定で比較したい。', type: 'textarea' },
      { key: 'data_structure', label: 'データ構造', placeholder: '例: カラムは "group" (0/1) と "bp_systolic" (数値)', type: 'text' }
    ]
  },
  {
    id: "res-stats-r",
    title: "R Stats Code Generator",
    description: "tidyverse, tableone, survivalなどを使用した統計解析用のRコードを生成します。",
    category: "research",
    template: `以下のデータ解析を行いたいので、Rコード（tidyverse, tableone, survivalなどを使用）を作成してください。
データフレーム名は \`data\` と仮定し、コメントで各ステップの説明を加えてください。

# 解析したい内容
[解析の目的と手法]
# データの構造
[カラム名やデータの型]`,
    inputs: [
      { key: 'analysis', label: '解析内容', placeholder: '例: 患者背景表（Table 1）を作成したい。検定も含める。', type: 'textarea' },
      { key: 'data_structure', label: 'データ構造', placeholder: '例: age, sex, bmi, outcomeなどのカラムがある', type: 'text' }
    ]
  },

  // 文献管理・フォーマット
  {
    id: "res-ref-format-convert",
    title: "Reference Formatter",
    description: "引用文献リストを指定されたジャーナルのスタイル（Vancouver, APAなど）に整形します。",
    category: "research",
    template: `以下の文献リストを、[指定スタイル]のフォーマットに整形してください。
ジャーナル名の省略形や、著者名の表記順序（姓・名）などに注意してください。

# 指定スタイル
[例: Vancouver Style, APA Style, New England Journal of Medicine Style]

# 元の文献リスト
[文献リストを入力]`,
    inputs: [
      { key: 'style', label: 'スタイル', placeholder: '例: Vancouver Style', type: 'text' },
      { key: 'references', label: '文献リスト', placeholder: 'Paste references here...', type: 'textarea' }
    ]
  },
  {
    id: "res-bibtex-gen",
    title: "BibTeX Generator",
    description: "論文情報からBibTeX形式の引用データを作成し、文献管理ソフトへのインポートを支援します。",
    category: "research",
    template: `以下の論文情報から、BibTeX形式のエントリーを作成してください。
文献管理ソフト（EndNote, Zotero, Mendeleyなど）にインポート可能な形式にしてください。

# 論文情報
[タイトル、著者、ジャーナル名、年、巻、号、ページなど]`,
    inputs: [
      { key: 'info', label: '論文情報', placeholder: '例: "Deep learning for..." by Smith et al., Nature Medicine 2024', type: 'textarea' }
    ]
  },

  // ガイドラインチェック
  {
    id: "res-check-consort",
    title: "CONSORT Checklist (RCT)",
    description: "ランダム化比較試験（RCT）の報告がCONSORT声明に準拠しているかチェックします。",
    category: "research",
    template: `以下のRCT論文のドラフトを、CONSORT 2010声明に基づいてチェックしてください。
特に以下の必須項目が記述されているか確認し、不足を指摘してください。

1. **Randomisation**: ランダム化の方法と割り付けの隠蔽
2. **Blinding**: 盲検化の対象と方法
3. **Sample size**: サンプルサイズ計算の根拠
4. **Outcomes**: 主要評価項目と副次評価項目の定義
5. **Flow diagram**: 患者フロー（除外理由など）の記述

# 論文ドラフト
[ドラフトを入力]`,
    inputs: [
      { key: 'draft', label: 'ドラフト', placeholder: 'Paste RCT draft here...', type: 'textarea' }
    ]
  },
  {
    id: "res-check-strobe",
    title: "STROBE Checklist (Observational)",
    description: "観察研究（コホート、症例対照、横断研究）の報告がSTROBE声明に準拠しているかチェックします。",
    category: "research",
    template: `以下の観察研究のドラフトを、STROBE声明に基づいてチェックしてください。
特に以下の項目について、記述が十分か確認してください。

1. **Study Design**: 研究デザインの明確な記述
2. **Setting**: 研究の場所と期間
3. **Participants**: 適格基準と除外基準
4. **Variables**: 変数の定義と測定方法
5. **Bias**: バイアスの対処方法
6. **Study Size**: サンプルサイズの決定方法

# 論文ドラフト
[ドラフトを入力]`,
    inputs: [
      { key: 'draft', label: 'ドラフト', placeholder: 'Paste observational study draft here...', type: 'textarea' }
    ]
  },
  {
    id: "res-workflow-planner",
    title: "Research Project Planner",
    description: "研究プロジェクトの全体計画（タスク分解とスケジュール）を立案し、ガントチャート用のコードを生成します。",
    category: "research",
    template: `以下の研究テーマについて、プロジェクトの全体計画を立案してください。
開始日から目標期限までの間に必要なタスクを洗い出し、現実的なスケジュールを提案してください。

# 研究テーマ
[研究テーマを入力]
# 開始日
[開始日]
# 目標期限
[目標期限]

# 出力形式
1. **タスク分解**: 倫理申請、データ収集、解析、執筆、投稿などの主要フェーズ
2. **スケジュール表**: 各タスクの開始・終了時期の目安
3. **Mermaid Code**: これをガントチャートとして可視化するためのMermaid記法のコード`,
    inputs: [
      { key: 'research_topic', label: '研究テーマ', placeholder: '例: 新規抗がん剤の第II相試験', type: 'text' },
      { key: 'start_date', label: '開始日', placeholder: '例: 2025/04/01', type: 'text' },
      { key: 'target_deadline', label: '目標期限', placeholder: '例: 2026/03の学会で発表', type: 'text' },
    ]
  },
  // 新規追加: 初心者向け症例報告支援プロンプト
  {
    id: "res-timeline-builder",
    title: "Clinical Timeline Builder",
    description: "バラバラのカルテ情報から、症例報告に必要な時系列表（Timeline）を作成します。",
    category: "research",
    template: `あなたは医学論文の執筆支援を行うAIアシスタントです。
以下の【カルテ情報】を基に、症例報告（Case Report）で使用できる整理された時系列表（Timeline）を作成してください。

# 作成ルール
1. **時系列の整理**: 入院日や発症日を「Day 0」または「X日前」として、出来事を時系列順に並べてください。
2. **重要事項の抽出**: 症状の変化、検査結果の異常値、治療介入（薬剤開始・変更）、転帰などの重要なイベントを抽出してください。
3. **英語化の準備**: 各イベントについて、医学的に適切な英語表現の候補も併記してください。
4. **フォーマット**: 以下のMarkdownテーブル形式で出力してください。

| Timepoint | Event (Japanese) | Event (English Draft) | Key Data/Findings |
|-----------|------------------|-----------------------|-------------------|
| Day -X    | ...              | ...                   | ...               |
| Day 0     | ...              | ...                   | ...               |

【カルテ情報】:
[ここにカルテの経過記録、検査結果、処方歴などを貼り付けてください]
`,
    inputs: [
      { key: 'chart_info', label: 'カルテ情報', placeholder: 'カルテの経過記録、検査結果、処方歴などを貼り付けてください', type: 'textarea' }
    ]
  },
  {
    id: "com-mentor-email",
    title: "Email to Mentor for Review",
    description: "指導医に論文ドラフトの添削を依頼するための、失礼がなく効率的なメール文面を作成します。",
    category: "communication",
    template: `あなたは若手医師の指導医への連絡を支援するAIアシスタントです。
以下の【状況】を基に、指導医に論文（症例報告）のドラフト添削を依頼するメール文面を作成してください。

# 要件
1. **件名**: 一目で用件と緊急度がわかる件名にしてください。
2. **構成**:
    - 挨拶と日頃の感謝
    - 依頼の概要（何を、いつまでに見てほしいか）
    - **特に見てほしいポイント**（論理構成、英語表現、図表など）を箇条書きで明記
    - 添付ファイルの説明
    - 締めの挨拶
3. **トーン**: 礼儀正しく、かつ多忙な指導医の時間を尊重した簡潔な表現にしてください。

【状況】:
- 論文の種類: [例: 〇〇症例のCase Report]
- 投稿予定ジャーナル: [例: Internal Medicine]
- 特に相談したい点: [例: Discussionの論理構成、図2の適切さ]
- 希望期限: [例: 来週の水曜日まで]
- その他: [例: 英語はDeepLで翻訳した段階です]
`,
    inputs: [
      { key: 'situation', label: '状況', placeholder: '論文の種類、投稿予定ジャーナル、相談点、期限などを入力', type: 'textarea' }
    ]
  },
  {
    id: "res-journal-finder",
    title: "Journal Finder for Case Reports",
    description: "症例の内容から、投稿に適したジャーナル（Case Reports誌など）の候補を提案します。",
    category: "research",
    template: `あなたは医学研究の投稿支援を行うAIアシスタントです。
以下の【症例概要】を分析し、投稿に適したジャーナル（特にCase Reportを受け付けているもの）を3〜5つ提案してください。

# 提案項目
各ジャーナルについて、以下の情報を含めてください（あなたの知識ベースにある範囲で）：
1. **Journal Name**: ジャーナル名
2. **Focus/Scope**: そのジャーナルが好む領域やトピック
3. **Impact Factor / CiteScore**: およその指標（わかれば）
4. **Open Access Fee (APC)**: 費用の目安（High/Medium/Low）
5. **Recommendation Reason**: なぜこの症例がこのジャーナルに適しているかの理由

# 考慮事項
- 一般的な総合誌（General Medicine）と、専門誌（Specialty Journal）の両方を検討してください。
- 症例の希少性や教育的価値を考慮して選定してください。

【症例概要】:
- 領域: [例: 循環器内科]
- 診断名: [例: タコツボ心筋症の再発例]
- 新規性・教育的価値: [例: 若年男性での発症、特定の薬剤との関連が疑われる]
`,
    inputs: [
      { key: 'case_summary', label: '症例概要', placeholder: '領域、診断名、新規性・教育的価値などを入力', type: 'textarea' }
    ]
  },
  {
    id: "res-fact-check",
    title: "Logical Consistency Check",
    description: "論文ドラフト内の論理矛盾や、数値の不整合（ファクトチェック）を洗い出します。",
    category: "research",
    template: `あなたは医学論文の査読者（Reviewer）です。
以下の【論文ドラフト】を読み、論理的な矛盾や数値の不整合がないか厳しくチェックしてください。

# チェック項目
1. **数値の整合性**: 本文中の数値と、表（Table）や図（Figure）の説明に矛盾はないか？
2. **時系列の矛盾**: 経過の記述で、時間の前後関係がおかしい箇所はないか？
3. **診断の論理**: 検査結果からその診断を導く論理に飛躍や矛盾はないか？
4. **用語の統一**: 同じ現象に対して異なる用語が混在していないか？

# 出力形式
- **指摘事項**: 矛盾が疑われる箇所を具体的に引用し、なぜ矛盾しているかを説明してください。
- **修正案**: どのように修正すべきかの提案。
- 問題がなければ「論理的な矛盾は見当たりませんでした」と出力してください。

【論文ドラフト】:
[ここに論文の本文（Case Presentation, Discussionなど）を貼り付けてください]
`,
    inputs: [
      { key: 'draft', label: '論文ドラフト', placeholder: '論文の本文（Case Presentation, Discussionなど）を貼り付けてください', type: 'textarea' }
    ]
  }
];
