export type PromptCategory = 'diagnosis' | 'treatment' | 'documentation' | 'medication' | 'communication' | 'literature' | 'research' | 'case-analysis';

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  template: string;
  inputs: {
    key: string;
    label: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'select';
    options?: string[];
  }[];
  example?: string;
}

export const categories: { id: PromptCategory; label: string; description: string }[] = [
  { id: 'diagnosis', label: '診断支援', description: '症状や検査結果からの鑑別診断・分析' },
  { id: 'treatment', label: '治療計画', description: 'エビデンスに基づいた治療方針の立案' },
  { id: 'documentation', label: '書類作成', description: '紹介状・サマリー・診断書の作成支援' },
  { id: 'medication', label: '薬剤・処方', description: '投与量調整・相互作用チェック' },
  { id: 'communication', label: '患者対話', description: '患者説明・教育・同意取得の支援' },
  { id: 'literature', label: '医学文献', description: '論文要約・エビデンス評価' },
  { id: 'research', label: '研究・学会', description: '論文校正・抄録作成・統計解釈' },
  { id: 'case-analysis', label: '症例分析', description: '症例報告・カンファレンス資料作成' },
];

export const prompts: Prompt[] = [
  // --- Documentation ---
  {
    id: 'referral-letter',
    title: '紹介状（診療情報提供書）',
    category: 'documentation',
    description: '他院への紹介状（診療情報提供書）のドラフトを作成します。',
    template: `あなたは医療事務作業に精通した医師です。以下の情報に基づいて、適切な敬語を用いた診療情報提供書（紹介状）のドラフトを作成してください。

【宛先】
- 医療機関名: {{destination_hospital}}
- 科・医師名: {{destination_doctor}}

【患者情報】
- 氏名: {{patient_name}}
- 年齢・性別: {{age}}歳 {{gender}}
- 生年月日: {{dob}}

【紹介内容】
- 傷病名: {{diagnosis}}
- 紹介目的: {{purpose}}
- 既往歴: {{past_history}}
- 処方内容: {{medications}}

【経過・所見】
{{clinical_course}}

【依頼内容】
丁寧な医療用語と敬語を使用し、拝啓/敬具を含む標準的な書式で作成してください。`,
    inputs: [
      { key: 'destination_hospital', label: '紹介先医療機関', placeholder: '例: 〇〇大学病院', type: 'text' },
      { key: 'destination_doctor', label: '紹介先医師（科）', placeholder: '例: 循環器内科 御机下', type: 'text' },
      { key: 'patient_name', label: '患者氏名', placeholder: '例: 医療 太郎', type: 'text' },
      { key: 'age', label: '年齢', placeholder: '例: 72', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性'] },
      { key: 'dob', label: '生年月日', placeholder: '例: 昭和28年5月10日', type: 'text' },
      { key: 'diagnosis', label: '傷病名', placeholder: '例: 狭心症の疑い', type: 'text' },
      { key: 'purpose', label: '紹介目的', placeholder: '例: 精査加療のお願い', type: 'text' },
      { key: 'past_history', label: '既往歴', placeholder: '例: 高血圧、脂質異常症', type: 'textarea' },
      { key: 'medications', label: '処方内容', placeholder: '例: アムロジピン5mg 1T1x', type: 'textarea' },
      { key: 'clinical_course', label: '経過・所見', placeholder: '例: 労作時の胸痛を主訴に来院され...', type: 'textarea' },
    ]
  },
  {
    id: 'discharge-summary',
    title: '退院サマリー',
    category: 'documentation',
    description: '入院経過をまとめた退院サマリーのドラフトを作成します。',
    template: `あなたは病棟担当医です。以下の入院経過に基づいて、退院サマリーを作成してください。

【患者情報】
- 患者: {{patient_info}}
- 入院期間: {{admission_period}}
- 入院時診断: {{admission_diagnosis}}
- 退院時診断: {{discharge_diagnosis}}

【入院経過】
{{hospital_course}}

【退院時処方・指示】
{{discharge_plan}}

【依頼内容】
SOAP形式または時系列形式で、医学的に簡潔かつ正確なサマリーを作成してください。`,
    inputs: [
      { key: 'patient_info', label: '患者情報', placeholder: '例: 80歳女性', type: 'text' },
      { key: 'admission_period', label: '入院期間', placeholder: '例: 2024/12/01 - 2024/12/15', type: 'text' },
      { key: 'admission_diagnosis', label: '入院時診断', placeholder: '例: 誤嚥性肺炎', type: 'text' },
      { key: 'discharge_diagnosis', label: '退院時診断', placeholder: '例: 誤嚥性肺炎（治癒）', type: 'text' },
      { key: 'hospital_course', label: '入院経過', placeholder: '例: 入院後、抗菌薬ABPC/SBTを開始し...', type: 'textarea' },
      { key: 'discharge_plan', label: '退院時処方・指示', placeholder: '例: 処方継続、1週間後に外来受診', type: 'textarea' },
    ]
  },

  // --- Medication ---
  {
    id: 'renal-dosing',
    title: '腎機能別投与量計算',
    category: 'medication',
    description: '患者の腎機能（eGFR/CCr）に基づいた適切な薬剤投与量を提案します。',
    template: `あなたは薬剤師または腎臓内科医です。以下の患者情報と薬剤について、腎機能を考慮した適切な投与設計を行ってください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 体重: {{weight}}kg
- 血清クレアチニン: {{scr}} mg/dL
- 推定eGFRまたはCCr: {{renal_function}}

【対象薬剤】
- 薬剤名: {{drug_name}}
- 通常用量: {{standard_dose}}

【依頼内容】
1. **腎機能評価**（CKDステージ分類）
2. **添付文書またはガイドラインに基づく推奨投与量**
3. **投与時の注意点**（副作用モニタリングなど）`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 75', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性'] },
      { key: 'weight', label: '体重', placeholder: '例: 50', type: 'text' },
      { key: 'scr', label: '血清クレアチニン', placeholder: '例: 1.8', type: 'text' },
      { key: 'renal_function', label: 'eGFR/CCr', placeholder: '例: eGFR 30', type: 'text' },
      { key: 'drug_name', label: '薬剤名', placeholder: '例: レボフロキサシン', type: 'text' },
      { key: 'standard_dose', label: '通常用量', placeholder: '例: 500mg 1日1回', type: 'text' },
    ]
  },
  {
    id: 'drug-interaction',
    title: '薬剤相互作用チェック',
    category: 'medication',
    description: '複数の薬剤間の相互作用と注意点をチェックします。',
    template: `あなたは医薬品情報に精通した薬剤師です。以下の処方薬について、相互作用のチェックを行ってください。

【処方薬リスト】
{{medication_list}}

【患者背景】
{{patient_background}}

【依頼内容】
1. **併用禁忌・併用注意の組み合わせ**
2. **相互作用の機序**（CYP代謝、薬力学的相互作用など）
3. **臨床的な対処法**（用量調節、代替薬提案、モニタリング項目）`,
    inputs: [
      { key: 'medication_list', label: '処方薬リスト', placeholder: '例:\nワーファリン\nロキソプロフェン\nクラリスロマイシン', type: 'textarea' },
      { key: 'patient_background', label: '患者背景', placeholder: '例: 高齢、腎機能低下あり', type: 'text' },
    ]
  },

  // --- Advanced Communication ---
  {
    id: 'bad-news',
    title: '悪い知らせ（Bad News）の伝達',
    category: 'communication',
    description: 'SPIKESプロトコルなどを参考に、患者に悪い知らせを伝えるための対話スクリプトを作成します。',
    template: `あなたはコミュニケーションスキルの高い緩和ケア医です。以下の状況において、患者（または家族）に悪い知らせを伝えるための対話スクリプトと準備事項を作成してください。

【患者・家族情報】
- 相手: {{recipient}}
- 理解度・精神状態: {{mental_state}}

【伝えるべき悪い知らせ】
{{bad_news_content}}

【依頼内容】
SPIKESプロトコル（Setting, Perception, Invitation, Knowledge, Emotion, Strategy）を意識して、以下の構成で出力してください。

1. **事前準備（Setting）**: 環境設定や同席者の確認
2. **導入の言葉**: 相手の認識を確認する質問
3. **告知のフレーズ**: 明確かつ共感的に伝える言葉
4. **感情への対応（Emotion）**: 予想される反応とそれに対する共感的応答（NURSEプロトコル）
5. **今後の計画（Strategy）**: 希望を持てる具体的な次のステップ`,
    inputs: [
      { key: 'recipient', label: '伝える相手', placeholder: '例: 本人（60代男性）と妻', type: 'text' },
      { key: 'mental_state', label: '理解度・精神状態', placeholder: '例: 検査結果に不安を感じている', type: 'text' },
      { key: 'bad_news_content', label: '伝える内容', placeholder: '例: 膵臓癌の再発、肝転移あり。抗がん剤の効果が乏しいこと。', type: 'textarea' },
    ]
  },

  // --- Research ---
  {
    id: 'english-proofreading',
    title: '医学英語論文の校正',
    category: 'research',
    description: '医学英語論文のドラフトを、学術的に自然で正確な英語に校正します。',
    template: `あなたは医学英語論文の編集者（ネイティブスピーカー）です。以下の英文ドラフトを、一流医学ジャーナル（NEJM, Lancetなど）への投稿に適した学術的な英語に校正してください。

【セクション】
{{section}}

【英文ドラフト】
{{draft}}

【依頼内容】
1. **校正後の英文**: 文法、語彙、フローを改善したもの
2. **主な修正点と理由**: なぜその表現に変更したかの解説
3. **別案（Optional）**: より洗練された表現があれば提示`,
    inputs: [
      { key: 'section', label: 'セクション', placeholder: '例: Abstract, Introduction', type: 'text' },
      { key: 'draft', label: '英文ドラフト', placeholder: 'Paste your draft here...', type: 'textarea' },
    ]
  },
  {
    id: 'conference-abstract',
    title: '学会抄録作成',
    category: 'research',
    description: '研究結果や症例報告から、学会発表用の抄録（Abstract）を作成します。',
    template: `あなたはアカデミックなライティングに長けた研究者です。以下の情報に基づいて、学会発表用の抄録（Abstract）を作成してください。

【学会・規定】
- 学会名: {{conference_name}}
- 文字数制限: {{word_limit}}

【研究・症例の内容】
- 背景・目的: {{background}}
- 方法・症例: {{methods}}
- 結果・経過: {{results}}
- 結論・考察: {{conclusion}}

【依頼内容】
規定の文字数以内で、論理的かつインパクトのある抄録を作成してください。タイトル案も3つ提案してください。`,
    inputs: [
      { key: 'conference_name', label: '学会名', placeholder: '例: 日本内科学会総会', type: 'text' },
      { key: 'word_limit', label: '文字数制限', placeholder: '例: 日本語800文字', type: 'text' },
      { key: 'background', label: '背景・目的', placeholder: '例: ...について検討した', type: 'textarea' },
      { key: 'methods', label: '方法・症例', placeholder: '例: 2023年の入院患者50例を対象に...', type: 'textarea' },
      { key: 'results', label: '結果・経過', placeholder: '例: A群で有意に改善が見られた...', type: 'textarea' },
      { key: 'conclusion', label: '結論・考察', placeholder: '例: 本治療法は有効である可能性が示唆された', type: 'textarea' },
    ]
  },
  {
    id: 'differential-diagnosis',
    title: '鑑別診断',
    category: 'diagnosis',
    description: '患者情報から考えられる疾患をリストアップし、優先順位付けを行います。',
    template: `あなたは経験豊富な臨床医です。以下の患者情報に基づいて、鑑別診断を行ってください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 主訴: {{chief_complaint}}
- 現病歴: {{history_present_illness}}
- 既往歴: {{past_medical_history}}
- 内服薬: {{medications}}
- バイタルサイン: {{vitals}}
- 身体所見: {{physical_exam}}

【依頼内容】
以下の形式で鑑別診断を提示してください：

1. **最も可能性の高い診断（Top 3）**
   - 各診断名
   - その診断を支持する所見
   - 確定診断のために必要な追加検査

2. **除外すべき重要な疾患（Must not miss）**
   - 緊急性の高い疾患
   - 見逃すと重大な結果をもたらす疾患

3. **推奨される初期対応**
   - 追加で行うべき検査
   - 初期治療の方針`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 55', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'chief_complaint', label: '主訴', placeholder: '例: 胸痛', type: 'text' },
      { key: 'history_present_illness', label: '現病歴', placeholder: '例: 3時間前から持続する胸部圧迫感...', type: 'textarea' },
      { key: 'past_medical_history', label: '既往歴', placeholder: '例: 高血圧、糖尿病', type: 'textarea' },
      { key: 'medications', label: '内服薬', placeholder: '例: アムロジピン5mg', type: 'textarea' },
      { key: 'vitals', label: 'バイタルサイン', placeholder: '例: BP 150/95, HR 98', type: 'text' },
      { key: 'physical_exam', label: '身体所見', placeholder: '例: 冷汗あり、心音整', type: 'textarea' },
    ]
  },
  {
    id: 'symptom-analysis',
    title: '症状分析',
    category: 'diagnosis',
    description: '症状の重症度評価と緊急性の判断を支援します。',
    template: `あなたは救急医療に精通した臨床医です。以下の症状について詳細な分析を行ってください。

【患者基本情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 主訴: {{chief_complaint}}

【症状の詳細】
- 発症時期: {{onset}}
- 症状の程度: {{severity}}
- 随伴症状: {{associated_symptoms}}

【依頼内容】
以下の観点から症状を分析してください：

1. **重症度評価**（軽症/中等症/重症）
2. **緊急性の判断**（Red flagsの有無）
3. **推奨される対応**（救急受診/外来受診/経過観察）`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 28', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 女性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'chief_complaint', label: '主訴', placeholder: '例: 頭痛', type: 'text' },
      { key: 'onset', label: '発症時期・様式', placeholder: '例: 今朝から突然', type: 'text' },
      { key: 'severity', label: '症状の程度', placeholder: '例: 今まで経験したことのない激しい痛み', type: 'text' },
      { key: 'associated_symptoms', label: '随伴症状', placeholder: '例: 嘔気、光過敏', type: 'textarea' },
    ]
  },
  {
    id: 'lab-interpretation',
    title: '検査結果解釈',
    category: 'diagnosis',
    description: '臨床検査データの解釈と追加検査の提案を行います。',
    template: `あなたは臨床検査医学に精通した専門医です。以下の検査結果について、臨床的解釈を行ってください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 臨床症状: {{symptoms}}

【検査結果】
{{lab_results}}

【依頼内容】
1. **異常値のまとめと臨床的意義**
2. **考えられる疾患・病態**
3. **推奨される追加検査**`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 62', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 男性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'symptoms', label: '臨床症状', placeholder: '例: 健診異常指摘、自覚症状なし', type: 'textarea' },
      { key: 'lab_results', label: '検査結果', placeholder: '例:\nWBC: 7200\nHb: 10.2\nAST: 45', type: 'textarea' },
    ]
  },
  {
    id: 'treatment-planning',
    title: '治療計画立案',
    category: 'treatment',
    description: 'エビデンスに基づいた治療オプションを提示します。',
    template: `あなたはEBMに精通した臨床医です。以下の患者に対する治療計画を立案してください。

【患者情報】
- 年齢・性別: {{age}}歳 {{gender}}
- 診断名: {{diagnosis}}
- 重症度・病期: {{severity}}
- 既往歴・合併症: {{comorbidities}}

【依頼内容】
1. **治療目標**（短期・中長期）
2. **推奨される治療オプション**（エビデンスレベル、効果、副作用）
3. **第一選択の治療計画**
4. **患者教育のポイント**`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 68', type: 'text' },
      { key: 'gender', label: '性別', placeholder: '例: 女性', type: 'select', options: ['男性', '女性', 'その他'] },
      { key: 'diagnosis', label: '診断名', placeholder: '例: 2型糖尿病', type: 'text' },
      { key: 'severity', label: '重症度・病期', placeholder: '例: HbA1c 8.2%, 合併症なし', type: 'text' },
      { key: 'comorbidities', label: '既往歴・合併症', placeholder: '例: 高血圧、変形性膝関節症', type: 'textarea' },
    ]
  },
  {
    id: 'patient-education',
    title: '患者教育',
    category: 'communication',
    description: '患者にわかりやすい疾患・治療の説明文を作成します。',
    template: `あなたは患者教育に精通した医療従事者です。以下の内容について、患者とその家族が理解しやすい説明文を作成してください。

【対象患者】
- 年齢: {{age}}歳
- 診断名: {{diagnosis}}
- 理解度: {{literacy}}

【説明したい内容】
{{content}}

【依頼内容】
専門用語を避け、平易な言葉で、共感的なトーンの説明文を作成してください。`,
    inputs: [
      { key: 'age', label: '年齢', placeholder: '例: 55', type: 'text' },
      { key: 'diagnosis', label: '診断名', placeholder: '例: 高血圧症', type: 'text' },
      { key: 'literacy', label: '理解度・健康リテラシー', placeholder: '例: 一般成人レベル', type: 'select', options: ['小学生レベル', '中学生レベル', '一般成人レベル', '高齢者（わかりやすく）'] },
      { key: 'content', label: '説明したい内容', placeholder: '例: なぜ薬を飲み続ける必要があるのか、生活習慣の改善点', type: 'textarea' },
    ]
  },
  {
    id: 'paper-summary',
    title: '論文要約',
    category: 'literature',
    description: '医学論文を構造化して要約し、臨床的意義を評価します。',
    template: `あなたは医学論文の批判的吟味に精通した研究者です。以下の論文について、構造化された要約を作成してください。

【論文情報】
- タイトル: {{title}}
- 論文の内容:
{{content}}

【依頼内容】
1. **研究の背景と目的**
2. **研究方法**（PICO/PECO）
3. **主要な結果**
4. **臨床的意義と限界**
5. **要点まとめ（3行）**`,
    inputs: [
      { key: 'title', label: '論文タイトル', placeholder: '例: Effect of...', type: 'text' },
      { key: 'content', label: '論文の内容（Abstractなど）', placeholder: 'Abstractや本文を貼り付けてください', type: 'textarea' },
    ]
  },
  {
    id: 'case-presentation',
    title: '症例提示',
    category: 'case-analysis',
    description: '教育的な症例報告の作成を支援します。',
    template: `あなたは症例提示に精通した臨床医です。以下の症例情報を、教育的で構造化された症例提示の形式にまとめてください。

【症例情報】
- 患者: {{patient_info}}
- 主訴・現病歴: {{history}}
- 検査所見: {{findings}}
- 経過・転帰: {{course}}

【提示の目的】
{{purpose}}

【依頼内容】
教育的な価値を強調し、臨床推論のプロセスがわかるようにまとめてください。`,
    inputs: [
      { key: 'patient_info', label: '患者基本情報', placeholder: '例: 72歳女性、無職', type: 'text' },
      { key: 'history', label: '主訴・現病歴', placeholder: '例: 発熱と呼吸困難...', type: 'textarea' },
      { key: 'findings', label: '身体・検査所見', placeholder: '例: 右下肺野浸潤影...', type: 'textarea' },
      { key: 'course', label: '経過・転帰', placeholder: '例: 抗菌薬投与により改善...', type: 'textarea' },
      { key: 'purpose', label: '提示の目的', placeholder: '例: 研修医向けカンファレンス', type: 'text' },
    ]
  },
];
