# Branding Suite - 技術アーキテクチャ設計書

## 1. システム概要

Branding Suiteは、AIを活用したブランドポジショニングおよびマーケティング戦略生成プラットフォームである。ユーザーは8ステップのインタラクティブなウィザードを通じて企業情報を入力し、高度なLLMが包括的なブランド戦略レポートを自動生成する。本システムは、Branding5の機能を完全に再現しつつ、多言語対応や高度なコラボレーション機能などの拡張機能を提供する。

## 2. 技術スタック

### 2.1 フロントエンド

本システムのフロントエンドは、モダンなReactエコシステムを採用し、高速で保守性の高いアプリケーションを実現する。

**コアフレームワーク**
- **Next.js 14+** (App Router): サーバーサイドレンダリング、静的サイト生成、APIルートを統合したフルスタックフレームワーク
- **TypeScript 5+**: 型安全性を確保し、開発効率と保守性を向上
- **React 18+**: 最新のReact機能（Server Components、Suspense等）を活用

**スタイリング**
- **Tailwind CSS 3+**: ユーティリティファーストのCSSフレームワーク
- **Shadcn/ui**: 高品質で再利用可能なUIコンポーネントライブラリ
- **Radix UI**: アクセシビリティに優れたプリミティブコンポーネント

**状態管理**
- **Zustand**: 軽量でシンプルな状態管理ライブラリ
- **React Query (TanStack Query)**: サーバー状態管理とキャッシング

**フォーム管理**
- **React Hook Form**: 高性能なフォーム管理
- **Zod**: TypeScriptファーストなスキーマバリデーション

**国際化**
- **next-intl**: Next.js向けの国際化ライブラリ
- **対応言語**: 日本語、英語、中国語、韓国語、スペイン語、フランス語、ドイツ語

### 2.2 バックエンド

バックエンドは、スケーラブルで保守性の高いアーキテクチャを採用し、高負荷にも対応可能な設計とする。

**APIレイヤー**
- **Next.js API Routes**: フロントエンドと統合されたAPIエンドポイント
- **tRPC**: 型安全なAPI通信（オプション）

**データベース**
- **PostgreSQL 15+**: リレーショナルデータベース（Supabase経由）
- **Prisma ORM**: TypeScriptファーストなORMで型安全なデータベースアクセス

**キャッシング**
- **Redis**: セッション管理、レート制限、キャッシング
- **Upstash Redis**: サーバーレス環境向けのRedis

**ファイルストレージ**
- **Cloudflare R2**: S3互換のオブジェクトストレージ
- **用途**: PDF/DOCX/PPTX、画像、ユーザーアップロードファイル

### 2.3 AI/LLM統合

複数のLLMを活用し、コスト効率と品質のバランスを最適化する。

**LLMプロバイダー**
- **OpenRouter API**: 複数のLLMへの統一アクセス
  - `deepseek/deepseek-chat-v3.1:free` - コスト効率重視
  - `x-ai/grok-4-fast:free` - 高速処理
  - `google/gemini-2.5-flash` - バランス型
  
- **OpenAI API**: 特定の高度なタスク用
  - `gpt-4.1-mini` - 複雑な推論
  - `gpt-4.1-nano` - 軽量タスク

**プロンプト管理**
- カスタムプロンプトテンプレートシステム
- バージョン管理されたプロンプトライブラリ
- A/Bテスト機能

**外部API**
- **ScreenshotOne API**: Webサイトスクリーンショット取得
- **Serper API**: 検索エンジンデータ取得（競合分析用）

### 2.4 認証・認可

セキュアで使いやすい認証システムを実装する。

**認証プロバイダー**
- **Supabase Auth**: 統合認証サービス
  - Magic Link（パスワードレス認証）
  - Google OAuth
  - Email/Password認証

**セッション管理**
- JWT（JSON Web Token）
- HttpOnly Cookie
- CSRF保護

**認可**
- ロールベースアクセス制御（RBAC）
  - User（一般ユーザー）
  - Agency（代理店）
  - Enterprise（エンタープライズ）
  - Admin（管理者）

### 2.5 決済・サブスクリプション

**決済プロバイダー**
- **Stripe**: サブスクリプション管理、決済処理
  - Stripe Checkout: 安全な決済フロー
  - Stripe Billing: サブスクリプション管理
  - Stripe Webhooks: イベント処理

**プラン管理**
- クレジットベースシステム
- 使用量追跡
- 自動更新・キャンセル処理

### 2.6 PDF/ドキュメント生成

高品質なレポート生成機能を提供する。

**PDF生成**
- **Puppeteer**: HTMLからPDF生成
- **React-PDF**: React コンポーネントからPDF生成（代替案）

**DOCX生成**
- **docx**: プログラマティックなWord文書生成

**PPTX生成**
- **PptxGenJS**: PowerPoint生成ライブラリ

### 2.7 デプロイ・インフラ

**ホスティング**
- **Vercel**: フロントエンド・APIホスティング
  - 自動デプロイ（GitHub連携）
  - エッジファンクション
  - プレビュー環境

**データベース・認証**
- **Supabase**: PostgreSQL、認証、リアルタイム機能

**ストレージ**
- **Cloudflare R2**: オブジェクトストレージ

**モニタリング**
- **Sentry**: エラートラッキング
- **Vercel Analytics**: パフォーマンス分析
- **PostHog**: プロダクトアナリティクス

**ドメイン**
- **branding.zeroai.jp**: メインドメイン
- **Cloudflare**: DNS、CDN、セキュリティ

## 3. データベーススキーマ

### 3.1 主要テーブル

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**subscriptions**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  plan_type VARCHAR(50), -- 'starter', 'agency', 'enterprise'
  status VARCHAR(50), -- 'active', 'canceled', 'past_due'
  credits_remaining INTEGER DEFAULT 0,
  credits_total INTEGER DEFAULT 0,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**brand_positionings**
```sql
CREATE TABLE brand_positionings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'in_progress', 'completed'
  current_step INTEGER DEFAULT 1,
  language VARCHAR(10) DEFAULT 'ja',
  
  -- Step 1: Input
  brand_name VARCHAR(255),
  branding_type VARCHAR(50),
  
  -- Step 2: Inspiration
  inspiration_data JSONB,
  
  -- Step 3: ICP
  icp_data JSONB,
  
  -- Step 4: Competitors
  competitors_data JSONB,
  
  -- Step 5: Brand Values
  brand_values_data JSONB,
  
  -- Step 6: Archetype
  selected_archetype VARCHAR(50),
  
  -- Generated Report
  report_data JSONB,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**generated_reports**
```sql
CREATE TABLE generated_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_positioning_id UUID REFERENCES brand_positionings(id) ON DELETE CASCADE,
  
  -- Brand Positioning Section
  brand_identity JSONB,
  brand_archetype JSONB,
  brand_narrative JSONB,
  visual_identity JSONB,
  
  -- Your Brand Now Section
  swot_analysis JSONB,
  competitor_analysis JSONB,
  landing_page_analysis JSONB,
  seo_analysis JSONB,
  lighthouse_analysis JSONB,
  
  -- Marketing Strategy Section
  ideal_customer_profiles JSONB,
  marketing_copy JSONB,
  content_strategy JSONB,
  marketing_campaign_ideas JSONB,
  
  -- Export URLs
  pdf_url TEXT,
  docx_url TEXT,
  pptx_url TEXT,
  
  -- Sharing
  share_token VARCHAR(255) UNIQUE,
  is_public BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**ai_generations**
```sql
CREATE TABLE ai_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_positioning_id UUID REFERENCES brand_positionings(id) ON DELETE CASCADE,
  section_name VARCHAR(100),
  model_used VARCHAR(100),
  prompt_template TEXT,
  input_data JSONB,
  output_data JSONB,
  tokens_used INTEGER,
  cost_usd DECIMAL(10, 6),
  generation_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**credit_transactions**
```sql
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER, -- positive for addition, negative for deduction
  transaction_type VARCHAR(50), -- 'purchase', 'usage', 'refund', 'bonus'
  description TEXT,
  brand_positioning_id UUID REFERENCES brand_positionings(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 4. APIエンドポイント設計

### 4.1 認証関連

```
POST   /api/auth/signup          - ユーザー登録
POST   /api/auth/signin          - ログイン
POST   /api/auth/signout         - ログアウト
POST   /api/auth/magic-link      - Magic Link送信
GET    /api/auth/session         - セッション情報取得
```

### 4.2 ブランドポジショニング

```
GET    /api/brand-positionings              - 一覧取得
POST   /api/brand-positionings              - 新規作成
GET    /api/brand-positionings/:id          - 詳細取得
PATCH  /api/brand-positionings/:id          - 更新
DELETE /api/brand-positionings/:id          - 削除
POST   /api/brand-positionings/:id/generate - レポート生成
```

### 4.3 AI生成

```
POST   /api/generate/brand-identity         - Brand Identity生成
POST   /api/generate/brand-archetype        - Brand Archetype生成
POST   /api/generate/brand-narrative        - Brand Narrative生成
POST   /api/generate/visual-identity        - Visual Identity生成
POST   /api/generate/swot                   - SWOT分析生成
POST   /api/generate/competitor-analysis    - 競合分析生成
POST   /api/generate/icp                    - ICP生成
POST   /api/generate/marketing-copy         - Marketing Copy生成
POST   /api/generate/content-strategy       - Content Strategy生成
POST   /api/generate/campaign-ideas         - Campaign Ideas生成
```

### 4.4 エクスポート

```
POST   /api/export/pdf/:id                  - PDF生成
POST   /api/export/docx/:id                 - DOCX生成
POST   /api/export/pptx/:id                 - PPTX生成
```

### 4.5 共有

```
GET    /api/share/:token                    - 共有レポート取得
POST   /api/share/:id/create                - 共有リンク生成
DELETE /api/share/:id/revoke                - 共有リンク無効化
```

### 4.6 サブスクリプション

```
GET    /api/subscription                    - サブスクリプション情報取得
POST   /api/subscription/create             - サブスクリプション作成
POST   /api/subscription/cancel             - サブスクリプションキャンセル
POST   /api/subscription/update             - プラン変更
GET    /api/subscription/credits            - クレジット残高取得
```

### 4.7 Webhook

```
POST   /api/webhooks/stripe                 - Stripe Webhook
```

## 5. AIプロンプトシステム設計

### 5.1 プロンプトテンプレート構造

各セクションの生成には、構造化されたプロンプトテンプレートを使用する。

```typescript
interface PromptTemplate {
  id: string;
  section: string;
  version: string;
  language: string;
  systemPrompt: string;
  userPromptTemplate: string;
  outputFormat: {
    type: 'json' | 'markdown' | 'text';
    schema?: object;
  };
  model: {
    primary: string;
    fallback: string[];
  };
  parameters: {
    temperature: number;
    maxTokens: number;
    topP?: number;
  };
}
```

### 5.2 セクション別プロンプト戦略

**Brand Identity生成**
```typescript
const brandIdentityPrompt: PromptTemplate = {
  id: 'brand-identity-v1',
  section: 'brand-identity',
  version: '1.0',
  language: 'ja',
  systemPrompt: `あなたは20年以上の経験を持つブランド戦略の専門家です。
確立されたブランディングフレームワークに基づき、企業のブランドアイデンティティを定義します。
出力は専門的で、実行可能で、選択されたブランドアーキタイプと整合性が取れている必要があります。`,
  
  userPromptTemplate: `以下の情報に基づいて、{{brand_name}}のブランドアイデンティティを生成してください。

# 企業情報
- ブランド名: {{brand_name}}
- 業界: {{industry}}
- ブランディングタイプ: {{branding_type}}

# ターゲット顧客
{{icp_summary}}

# 競合
{{competitors_summary}}

# ブランド価値
{{brand_values}}

# 選択されたアーキタイプ
{{selected_archetype}}

# 出力形式
以下の要素を含むブランドアイデンティティを生成してください：
1. Brand Voice（ブランドボイス）- 2-3文
2. Brand Promise（ブランドプロミス）- 2-3文
3. Brand Personality（ブランドパーソナリティ）- 2-3文
4. Brand Mission（ミッション）- 2-3文
5. Brand Vision（ビジョン）- 2-3文
6. Unique Selling Proposition (USP) - 2-3文
7. Brand Goals（ブランド目標）- 3-5個の具体的な目標
8. Brand Values（ブランド価値）- 8-12個の価値観

各要素は、選択されたアーキタイプ「{{selected_archetype}}」と整合性が取れている必要があります。`,
  
  outputFormat: {
    type: 'json',
    schema: {
      brandVoice: 'string',
      brandPromise: 'string',
      brandPersonality: 'string',
      brandMission: 'string',
      brandVision: 'string',
      usp: 'string',
      brandGoals: 'string[]',
      brandValues: 'string[]'
    }
  },
  
  model: {
    primary: 'deepseek/deepseek-chat-v3.1:free',
    fallback: ['x-ai/grok-4-fast:free', 'google/gemini-2.5-flash']
  },
  
  parameters: {
    temperature: 0.7,
    maxTokens: 2000,
    topP: 0.9
  }
};
```

### 5.3 多言語プロンプト管理

各言語ごとにプロンプトテンプレートを用意し、文化的なニュアンスを反映する。

```typescript
const promptTemplates = {
  'ja': brandIdentityPromptJa,
  'en': brandIdentityPromptEn,
  'zh': brandIdentityPromptZh,
  // ...
};
```

### 5.4 プロンプトチェーン

複雑なセクションは、複数のプロンプトを連鎖させて生成する。

```typescript
// Example: Brand Archetype Analysis
const archetypeChain = [
  {
    step: 1,
    name: 'archetype-selection-validation',
    prompt: 'ユーザーが選択したアーキタイプが企業情報と整合しているか検証'
  },
  {
    step: 2,
    name: 'archetype-application',
    prompt: '選択されたアーキタイプを企業に適用した詳細分析'
  },
  {
    step: 3,
    name: 'archetype-strategies',
    prompt: 'アーキタイプに基づく具体的な戦略提案'
  }
];
```

## 6. セキュリティ設計

### 6.1 認証・認可

**実装する保護措置**
- パスワードハッシング（bcrypt）
- JWT署名検証
- CSRF トークン
- レート制限（API呼び出し）
- セッションタイムアウト

### 6.2 データ保護

**暗号化**
- データベース暗号化（at rest）
- TLS/SSL通信（in transit）
- 機密情報の環境変数管理

**プライバシー**
- GDPR準拠
- データ削除機能
- 個人情報の最小化

### 6.3 APIセキュリティ

**実装する保護措置**
- API キー検証
- レート制限（Redis）
- 入力バリデーション（Zod）
- SQLインジェクション対策（Prisma ORM）
- XSS対策（サニタイゼーション）

## 7. パフォーマンス最適化

### 7.1 フロントエンド最適化

**実装する最適化**
- コード分割（Next.js dynamic import）
- 画像最適化（Next.js Image）
- フォント最適化（next/font）
- キャッシング戦略
- Lazy Loading

### 7.2 バックエンド最適化

**実装する最適化**
- データベースインデックス
- クエリ最適化
- Redis キャッシング
- CDN活用（Cloudflare）
- エッジファンクション

### 7.3 AI生成最適化

**実装する最適化**
- ストリーミングレスポンス
- 並列生成（複数セクション同時）
- プロンプトキャッシング
- モデル選択の最適化（コスト vs 品質）

## 8. 監視・ログ

### 8.1 エラートラッキング

**Sentry統合**
- フロントエンドエラー
- バックエンドエラー
- パフォーマンス監視

### 8.2 アナリティクス

**PostHog統合**
- ユーザー行動分析
- ファネル分析
- A/Bテスト

### 8.3 ログ管理

**実装するログ**
- API リクエストログ
- AI生成ログ（モデル、トークン、コスト）
- エラーログ
- セキュリティイベントログ

## 9. 開発ワークフロー

### 9.1 バージョン管理

**Git戦略**
- main: 本番環境
- develop: 開発環境
- feature/*: 機能開発
- hotfix/*: 緊急修正

### 9.2 CI/CD

**GitHub Actions**
- 自動テスト
- Linting/Formatting
- 型チェック
- ビルド検証
- 自動デプロイ（Vercel）

### 9.3 環境管理

**環境**
- Development: ローカル開発
- Preview: プレビュー環境（Vercel）
- Production: 本番環境

## 10. 次のステップ

1. プロジェクト初期化（Next.js）
2. データベーススキーマ実装（Prisma）
3. 認証システム実装（Supabase Auth）
4. 基本UI実装（Shadcn/ui）
5. AIプロンプトシステム実装
6. 各セクション生成機能実装
7. PDF/DOCX/PPTXエクスポート実装
8. 多言語対応実装
9. テスト・最適化
10. デプロイ

