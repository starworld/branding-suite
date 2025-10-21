# Branding5 完全分析レポート

## エグゼクティブサマリー

Branding5は、AIを活用したブランドポジショニングツールであり、企業のブランド戦略を包括的に生成するSaaSプラットフォームである。本レポートでは、同サービスの徹底的な調査結果をまとめ、「Branding Suite」として再構築するための技術的・機能的要件を明確化する。

## 1. システムアーキテクチャ

### 1.1 技術スタック

Branding5は以下の技術スタックで構築されていると推測される。

**フロントエンド**
- React系フレームワーク（Next.jsの可能性が高い）
- モダンなUIコンポーネントライブラリ
- レスポンシブデザイン（完全モバイル対応）

**バックエンド**
- Node.js/TypeScript（推測）
- RESTful API または GraphQL
- サーバーレスアーキテクチャの可能性

**AI/LLM統合**
- **Gemini 2.5 Pro** (Google) - メインのLLM
- **O1** (OpenAI) - 特定の高度な推論タスク用
- その他のLLM API - 機能に応じた使い分け
- **ScreenshotOne API** - Webサイトスクリーンショット取得

**データベース**
- ユーザーデータ、ブランドポジショニング、レポート保存
- PostgreSQL または MongoDB の可能性

**認証**
- Magic Link（パスワードレス認証）
- Google OAuth
- パスワード認証

**その他のサービス**
- PDF生成エンジン
- ファイルストレージ（S3等）
- メール送信サービス

### 1.2 システムフロー

ユーザーは8ステップのウィザード形式で情報を入力し、AIが各ステップの回答を分析してブランド戦略を生成する。生成されたレポートは複数のセクションに分かれており、PDF出力や共有リンクの生成が可能である。

## 2. 機能仕様

### 2.1 ブランドポジショニング作成フロー（8ステップ）

**Step 1 - Input（入力）**
- ブランド名の入力
- ブランディングタイプの選択
  - New Company（新規企業）
  - Existing Company（既存企業）
  - Personal Brand（個人ブランド）
  - Other (Custom)（その他）

**Step 2 - Inspiration（インスピレーション）**
- ブランドのインスピレーション源を探索・定義

**Step 3 - ICP（理想的な顧客プロファイル）**
- ターゲット顧客の特定と詳細な記述

**Step 4 - Competitors（競合分析）**
- 主要競合企業の入力と分析

**Step 5 - Brand Values（ブランド価値）**
- コアとなるブランド価値の明確化

**Step 6 - Archetype（アーキタイプ）**
- 12のブランドアーキタイプから選択
  - The Innocent, The Sage, The Explorer, The Outlaw
  - The Magician, The Hero, The Lover, The Jester
  - The Everyman, The Caregiver, The Ruler, The Creator

**Step 7 - Generate（生成）**
- AIによる包括的なブランド戦略の生成

**Step 8 - Report（レポート）**
- 完成したレポートの閲覧とエクスポート

### 2.2 生成レポートの構成

レポートは以下のセクションで構成される。

#### BRAND POSITIONING セクション

**1. Brand Positioning**
- ブランドポジショニングステートメント

**2. Brand Identity**
- Brand Voice（ブランドボイス）
- Brand Promise（ブランドプロミス）
- Brand Personality（ブランドパーソナリティ）
- Brand Mission（ミッション）
- Brand Vision（ビジョン）
- Unique Selling Proposition (USP)
- Brand Goals（ブランド目標）
- Brand Values（ブランド価値）

**3. Brand Archetype**
- The Sage Overview（選択されたアーキタイプの概要）
- Application to Your Company（企業への適用）
- General Definition（一般的な定義）
- Key Traits（主要特性）
- Typical Goal（典型的な目標）
- Core Strategies（コア戦略）
- Marketing Niche（マーケティングニッチ）
- Potential Drawback（潜在的な欠点）

**4. Brand Narrative**
- ブランドストーリーとナラティブ

**5. Visual Identity**
- Typography（タイポグラフィ）
  - Primary Font（推奨フォント、サイズ、ウェイト）
  - Secondary Font
- Color Palette（カラーパレット）
  - Primary Color（心理的関連性、業界関連性）
  - Secondary Colors（複数）
  - カラーコードとグラデーション
  - Export機能

#### YOUR BRAND NOW セクション

**6. SWOT Analysis**
- Strengths（強み）
- Weaknesses（弱み）
- Opportunities（機会）
- Threats（脅威）

**7. Competitor Analysis**
- 競合他社の詳細分析

**8. Landing Page Analysis**
- ランディングページの分析

**9. SEO Analysis**
- SEO最適化の推奨事項

**10. Lighthouse Analysis**
- Webパフォーマンス分析

#### MARKETING STRATEGY セクション

**11. Ideal Customer Profiles**
- 詳細な顧客ペルソナ

**12. Marketing Copy**
- 各種マーケティングコピーの提案

**13. Content Strategy**
- コンテンツ戦略の立案

**14. Marketing Campaign Ideas**
- マーケティングキャンペーンのアイデア

### 2.3 主要機能

**エクスポート機能**
- PDF Export（高品質なレポート生成）
- 将来的にDOC、PPT対応予定

**共有機能**
- Link Sharing（共有リンク生成）
- デフォルトは非公開、リンク経由でのみアクセス可能

**ホワイトラベル機能（Agency Plan以上）**
- カスタムブランディング
- クライアント向けレポートのブランド化

**レポート管理**
- 複数のブランドポジショニングを保存・管理
- ステータス管理（進行中/完了）
- 編集・再生成機能（Retry）

**クレジットシステム**
- 新規ブランドポジショニング作成にクレジットを消費
- プランに応じた月間クレジット数

## 3. 価格戦略

### 3.1 Complete Brand & Marketing Package
- **対象**: 起業家・スタートアップ
- **価格**: $147（買い切り）
- **内容**: 1ブランドの完全なポジショニング
- **特徴**: 全機能アクセス、PDF Export、Link Sharing

### 3.2 Multi-Brand Agency Plan
- **対象**: 代理店・マーケティングチーム
- **価格**: $399/月（通常$599）
- **内容**: 月5ブランドまで
- **特徴**: 
  - ホワイトラベルレポート
  - カスタムブランディングオプション
  - 割引価格での追加レポート
  - 月次セクションレベルのレポート更新

### 3.3 Enterprise
- **対象**: 大規模代理店・エンタープライズ
- **価格**: カスタム（要問い合わせ）
- **特徴**:
  - API アクセス
  - カスタム統合
  - 専任アカウントマネージャー
  - トレーニング・オンボーディング
  - 優先サポート
  - ボリュームディスカウント

## 4. AI プロンプト戦略の推測

Branding5のAIシステムは、以下のような多段階プロンプト戦略を採用していると推測される。

### 4.1 情報収集フェーズ
ユーザーからの入力を構造化されたデータとして収集し、各ステップで得られた情報を次のステップのコンテキストとして活用する。

### 4.2 分析フェーズ
収集した情報を基に、以下の分析を実行：
- 業界分析
- 競合分析
- ターゲット市場分析
- ブランドアーキタイプとの整合性分析

### 4.3 生成フェーズ
確立されたブランディングフレームワーク（Brand Archetypes、Positioning Statement、SWOT等）に基づき、各セクションを段階的に生成。

**推測されるプロンプト構造**:
```
System: あなたはブランド戦略の専門家です。確立されたブランディングフレームワークに基づき、{company_name}の{section_name}を生成してください。

Context:
- Company Name: {company_name}
- Industry: {industry}
- Target Audience: {icp}
- Competitors: {competitors}
- Brand Values: {brand_values}
- Selected Archetype: {archetype}

Task: 上記の情報を基に、{section_name}を以下の形式で生成してください：
{format_specification}

Output should be professional, actionable, and aligned with the selected brand archetype.
```

### 4.4 最適化フェーズ
生成されたコンテンツの一貫性チェック、ブランドアーキタイプとの整合性確認、トーン調整を実行。

## 5. Branding Suite の差別化戦略

Branding5を超えるために、以下の機能を追加実装する。

### 5.1 多言語対応
- **日本語完全対応**（UI・生成コンテンツ）
- 英語、中国語、韓国語、スペイン語、フランス語、ドイツ語対応
- 言語切り替え機能
- 各言語に最適化されたブランディングフレームワーク

### 5.2 高度なAI機能
- **複数LLMの並列使用**（品質向上）
- **リアルタイムプレビュー**（生成中の内容を確認）
- **インタラクティブ編集**（生成後の細かい調整）
- **AIチャット機能**（ブランド戦略について質問・相談）

### 5.3 拡張分析機能
- **市場トレンド分析**（業界の最新動向）
- **ソーシャルメディア分析**（競合のSNS戦略）
- **感情分析**（ブランドメッセージの感情的インパクト）

### 5.4 コラボレーション機能
- **チーム共同編集**（複数ユーザーでの編集）
- **コメント機能**（セクションごとのフィードバック）
- **バージョン管理**（変更履歴の追跡）

### 5.5 統合機能
- **Figma統合**（ビジュアルアイデンティティの直接エクスポート）
- **Notion統合**（レポートをNotionにエクスポート）
- **Slack/Discord通知**（レポート完成通知）

### 5.6 高度なエクスポート
- PDF、DOCX、PPTX完全対応
- カスタムテンプレート
- ブランドガイドライン自動生成
- SVGロゴ生成（AI画像生成統合）

## 6. 技術実装計画

### 6.1 フロントエンド
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui** (UIコンポーネント)
- **Zustand** (状態管理)
- **React Hook Form** (フォーム管理)

### 6.2 バックエンド
- **Next.js API Routes** または **FastAPI**
- **PostgreSQL** (Supabase)
- **Prisma ORM**
- **Redis** (キャッシング)

### 6.3 AI統合
- **OpenRouter API** (複数LLMアクセス)
  - Gemini 2.5 Flash
  - DeepSeek Chat V3.1
  - Grok 4 Fast
- **OpenAI API** (GPT-4.1 Mini/Nano)
- カスタムプロンプトテンプレートシステム

### 6.4 認証・決済
- **Supabase Auth** (Magic Link, OAuth)
- **Stripe** (サブスクリプション管理)

### 6.5 デプロイ
- **Vercel** (フロントエンド・API)
- **Supabase** (データベース・認証)
- **Cloudflare R2** (ファイルストレージ)

## 7. 開発フェーズ

### Phase 1: プロジェクト初期化
- Next.js プロジェクトセットアップ
- データベーススキーマ設計
- 認証システム実装

### Phase 2: コアUI実装
- ダッシュボード
- 8ステップウィザード
- レポート表示画面

### Phase 3: AI統合
- プロンプトシステム構築
- LLM API統合
- レポート生成ロジック

### Phase 4: 高度な機能
- PDF/DOCX/PPTX エクスポート
- 多言語対応
- ホワイトラベル機能

### Phase 5: テスト・最適化
- E2Eテスト
- パフォーマンス最適化
- セキュリティ監査

### Phase 6: デプロイ
- 本番環境デプロイ
- ドメイン設定 (branding.zeroai.jp)
- モニタリング設定

## 8. 次のステップ

1. GitHubリポジトリ作成
2. プロジェクト初期化
3. データベーススキーマ設計
4. 基本UIの実装開始
5. AIプロンプトシステムの設計と実装

