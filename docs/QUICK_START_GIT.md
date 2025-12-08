# Git/GitHub クイックスタートガイド（初心者向け）

## 🎯 このガイドの目的

コーディング初心者の方が、GitHubブランチを使った開発をすぐに始められるように、**実際のコマンド**を中心に説明します。

---

## 📦 前提条件

- Gitがインストールされていること
- GitHubアカウントがあること
- リポジトリにアクセス権限があること

---

## 🚀 5分で始める開発フロー

### Step 1: リポジトリをクローン（初回のみ）

```bash
cd ~/Downloads  # または任意の場所
git clone https://github.com/kgraph57/medicalprompthub.git
cd medicalprompthub
```

### Step 2: 新しいブランチを作成

```bash
# mainブランチを最新にする
git checkout main
git pull origin main

# 新しいブランチを作成（例: ゲーミフィケーション機能）
git checkout -b feature/gamification
```

### Step 3: コードを編集

エディタでファイルを編集します。

### Step 4: 変更を保存（コミット）

```bash
# 変更を確認
git status

# すべての変更をステージング
git add .

# コミット（変更を記録）
git commit -m "feat: ゲーミフィケーション機能を追加"

# GitHubにプッシュ
git push origin feature/gamification
```

### Step 5: ローカルでテスト

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザで http://localhost:3000 を開く
# 新機能を試してみる
```

### Step 6: 良ければ本番に統合

**GitHub上で**:
1. リポジトリページを開く
2. "Pull requests" タブをクリック
3. "New pull request" をクリック
4. base: `main` ← compare: `feature/gamification` を選択
5. "Create pull request" をクリック
6. 説明を書いて "Create pull request"
7. レビュー後、"Merge pull request" をクリック

---

## 📝 よく使うコマンド一覧

### 基本操作

```bash
# 現在の状態を確認
git status

# 変更内容を確認
git diff

# ブランチ一覧
git branch

# 現在のブランチを確認
git branch --show-current
```

### ブランチ操作

```bash
# ブランチを作成して切り替え
git checkout -b feature/新機能名

# ブランチを切り替え
git checkout main
git checkout feature/新機能名

# ブランチを削除（ローカル）
git branch -d feature/新機能名

# ブランチを削除（GitHub）
git push origin --delete feature/新機能名
```

### コミット操作

```bash
# 変更をステージング
git add .                    # すべて
git add ファイル名            # 特定のファイル

# コミット
git commit -m "説明"

# 最後のコミットメッセージを修正
git commit --amend -m "新しいメッセージ"
```

### 同期操作

```bash
# mainブランチの最新を取得
git checkout main
git pull origin main

# featureブランチにmainの変更を取り込む
git checkout feature/新機能名
git merge main
```

---

## 🎯 実践例：ゲーミフィケーション機能を実装する

### 1. 準備

```bash
cd /Users/kenokamoto/Downloads/medical-prompt-hub
git checkout main
git pull origin main
```

### 2. ブランチ作成

```bash
git checkout -b feature/gamification
```

### 3. 開発

ファイルを編集します（例: `server/db.ts`に新しい関数を追加）

### 4. テスト

```bash
pnpm dev
# ブラウザで動作確認
```

### 5. コミット

```bash
git add .
git commit -m "feat: ユーザー統計テーブルとAPIを追加"
git push origin feature/gamification
```

### 6. さらに開発を続ける

```bash
# またファイルを編集...
git add .
git commit -m "feat: XPシステムの実装"
git push origin feature/gamification
```

### 7. 完成したらプルリクエスト

GitHub上でプルリクエストを作成してマージ

---

## ⚠️ 注意事項

### やってはいけないこと

1. **mainブランチで直接開発しない**
   ```bash
   # ❌ 悪い例
   git checkout main
   # ここで編集してはいけない
   
   # ✅ 良い例
   git checkout -b feature/新機能
   # ここで編集する
   ```

2. **コミットメッセージを適当に書かない**
   ```bash
   # ❌ 悪い例
   git commit -m "修正"
   
   # ✅ 良い例
   git commit -m "feat: ゲーミフィケーションのXP計算ロジックを修正"
   ```

3. **テストせずにマージしない**
   - 必ずローカルで動作確認してから

---

## 🔄 よくある質問

### Q: 間違えてmainブランチで作業してしまった

```bash
# 変更を一時保存
git stash

# featureブランチを作成
git checkout -b feature/新機能

# 変更を復元
git stash pop
```

### Q: 変更を元に戻したい

```bash
# 特定のファイルだけ
git checkout -- ファイル名

# すべて（注意！）
git reset --hard HEAD
```

### Q: コミットメッセージを間違えた

```bash
git commit --amend -m "正しいメッセージ"
git push --force-with-lease origin feature/新機能名
```

### Q: mainブランチが更新された、取り込みたい

```bash
git checkout feature/新機能名
git merge main
# コンフリクトがあれば解決
```

---

## 📊 開発フローの可視化

```
1. mainブランチ（安定版）
   │
   ├─ 2. feature/gamification ブランチ作成
   │   │
   │   ├─ 3. コード編集
   │   ├─ 4. テスト
   │   ├─ 5. コミット
   │   └─ 6. プッシュ
   │
   └─ 7. プルリクエスト作成
       │
       └─ 8. マージ（本番に反映）
```

---

## ✅ チェックリスト

### ブランチ作成前
- [ ] mainブランチにいる
- [ ] `git pull origin main` で最新に更新

### 開発中
- [ ] 小さな変更ごとにコミット
- [ ] 動作確認してからコミット
- [ ] 意味のあるコミットメッセージ

### プルリクエスト前
- [ ] ローカルで動作確認
- [ ] エラーがない
- [ ] 既存機能が壊れていない

---

## 🎉 まとめ

1. **mainブランチは触らない**
2. **featureブランチで作業**
3. **小さくコミット**
4. **テストしてからマージ**

この流れで、安全に開発できます！

---

**最終更新日**: 2025-01-XX
