# Branding5 徹底調査レポート

## 1. 初期観察（ダッシュボード）

### 1.1 基本機能
- **ブランドポジショニング作成**: ユーザーは複数のブランドポジショニングを作成・管理できる
- **クレジットシステム**: 9クレジット利用可能（新規ブランドポジショニング作成に使用）
- **ステータス管理**: 
  - "Completed" (完了)
  - "1/8 steps" (進行中、8ステップ中1ステップ完了)

### 1.2 主要アクション
- **Get brand positioning**: 既存のブランドポジショニングを取得
- **Start new brand positioning**: 新規ブランドポジショニングを開始
- **View**: 完成したポジショニングを閲覧
- **Continue**: 未完了のポジショニングを続行

### 1.3 ナビゲーション
- Dashboard
- Support
- Pricing
- Latest updates
- ユーザーメニュー（SM - イニシャル）

### 1.4 出力内容の構造（完成例より）
1. Brand Concept（ブランドコンセプト）
2. Mission（使命）
3. Vision（目指す未来）
4. Positioning Statement（ポジショニング）
5. Core Values（価値観）
6. Tone of Voice（声色）
7. Brand Guardrails（やらないこと）

### 1.5 技術スタック（初期推測）
- フロントエンド: React系（モダンなUI）
- 認証: Magic Link、パスワード、Google OAuth
- ホスティング: オーストリア製（"Made with ♥ in Austria"）

## 2. 詳細調査項目

### 次のステップ:
1. 新規ブランドポジショニング作成フローの調査
2. 完成したポジショニングの詳細表示
3. Pricing ページの確認
4. Support/Help Center の確認
5. ネットワークトラフィックの分析（API構造）
6. プロンプトシステムの推測




## 3. ブランドポジショニング作成フロー（8ステップ）

### ステップ構成:
1. **Step 1 - Input**: ブランド名の入力
2. **Step 2 - Inspiration**: インスピレーション
3. **Step 3 - ICP**: Ideal Customer Profile（理想的な顧客プロファイル）
4. **Step 4 - Competitors**: 競合分析
5. **Step 5 - Brand Values**: ブランド価値
6. **Step 6 - Archetype**: ブランドアーキタイプ
7. **Step 7 - Generate**: 生成
8. **Step 8 - Report**: レポート

### Step 1の詳細:
- 質問: "What's the name of your brand?"
- 説明: "This will be your brand's cornerstone."
- プレースホルダー: "e.g., Innovatech Solutions, Aura Beauty, GreenLeaf Organics"
- 進捗表示: "Question 1 of 8"

### 観察事項:
- 各ステップは上部にタブとして表示される
- 現在のステップは緑色でハイライト
- 質問形式のインタラクティブなフォーム
- 「Next」ボタンで次のステップに進む




## 4. 価格プラン

### プラン1: Complete Brand & Marketing Package
- **対象**: Entrepreneurs & Startups
- **価格**: $147 (買い切り)
- **内容**: 1つのブランドの包括的なポジショニング

### プラン2: Multi-Brand Agency Plan
- **対象**: Agencies & Marketing Teams
- **価格**: $399/月（通常$599）
- **内容**: 月5ブランドまで、ホワイトラベル対応

### プラン3: Enterprise
- **対象**: Large agencies & enterprise teams
- **価格**: カスタム（要問い合わせ）
- **内容**: API access、カスタム統合、専任アカウントマネージャー

### 共通機能:
- Brand Identity
- Brand Archetype
- Brand Narrative
- Visual Identity Ideas
- SWOT
- Competitor Analysis
- Landingpage Analysis
- SEO
- Lighthouse
- ICP (Ideal Customer Profiles)
- Marketing Copy
- Content Strategy
- Marketing Campaign ideas
- Comprehensive Brand Strategy
- PDF Export
- Link Sharing

## 5. 出力セクション構成（詳細）

### BRAND POSITIONING セクション:
1. **Brand Positioning** - ブランドポジショニングステートメント
2. **Brand Identity** - ブランドアイデンティティ（Voice, Promise, Personality, Mission, Vision, USP, Goals, Values）
3. **Brand Archetype** - ブランドアーキタイプ（12のアーキタイプから選択）
4. **Brand Narrative** - ブランドナラティブ
5. **Visual Identity** - ビジュアルアイデンティティ（Typography, Color Palette）

### YOUR BRAND NOW セクション:
6. **SWOT** - SWOT分析
7. **Competitor Analysis** - 競合分析

### MARKETING STRATEGY セクション:
8. **Ideal Customer Profiles** - 理想的な顧客プロファイル
9. **Marketing Copy** - マーケティングコピー
10. **Content Strategy** - コンテンツ戦略
11. **Marketing Campaign ideas** - マーケティングキャンペーンアイデア




## 6. 技術スタック（FAQより）

### AI/LLM:
- **Gemini 2.5 Pro** (Google)
- **O1** (OpenAI)
- その他のLLM APIを機能に応じて使い分け
- **ScreenshotOne API** - スクリーンショット取得用

### データセキュリティ:
- ユーザーデータの保護に堅牢な措置を実装
- 確立されたブランディングフレームワークに基づく方法論

## 7. ブランド戦略生成の詳細プロセス

1. **Input Your Details**: 企業の基本情報を提供
2. **Gather Inspiration**: ブランドのインスピレーション源を探索・定義
3. **Define Your Ideal Customer Profile**: 理想的な顧客プロファイルを特定・記述
4. **Analyze Competitors**: 主要競合を入力・分析
5. **Define Brand Values**: コアブランド価値を明確化
6. **Select Brand Archetype**: ブランドを最もよく表すアーキタイプを選択
7. **Generate Brand Strategy**: AIが包括的な戦略を生成
8. **Receive Your Report**: 完全なブランド戦略レポートとアクション可能なインサイトにアクセス

## 8. 主要機能の詳細

### ホワイトラベル機能（Agency Plan以上）:
- カスタムブランディングオプション
- クライアント向けにブランド化されたレポート

### エクスポート機能:
- PDF Export（標準）
- DOC, PPT（将来的に対応予定）

### 共有機能:
- Link Sharing
- レポートは共有リンク経由でのみ公開（デフォルトは非公開）

### モバイル対応:
- 完全にモバイルフレンドリー

### 多言語サポート:
- 現在は英語のみ
- 多言語対応は開発ロードマップに含まれる

