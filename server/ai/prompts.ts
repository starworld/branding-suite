interface PromptContext {
  brandName: string;
  brandingType: string;
  inspiration?: string;
  icp?: string;
  competitors?: string;
  brandValues?: string;
  selectedArchetype?: string;
  language: string;
}

export const SYSTEM_PROMPTS = {
  ja: {
    brandIdentity: `あなたは20年以上の経験を持つブランド戦略の専門家です。
確立されたブランディングフレームワークに基づき、企業のブランドアイデンティティを定義します。
出力は専門的で、実行可能で、選択されたブランドアーキタイプと整合性が取れている必要があります。
必ずJSON形式で出力してください。`,

    brandArchetype: `あなたはブランドアーキタイプの専門家です。
12のブランドアーキタイプ（The Innocent, The Sage, The Explorer, The Outlaw, The Magician, The Hero, The Lover, The Jester, The Everyman, The Caregiver, The Ruler, The Creator）に精通しており、
企業情報に基づいて選択されたアーキタイプの詳細な分析を提供します。
必ずJSON形式で出力してください。`,

    visualIdentity: `あなたはビジュアルブランディングの専門家です。
ブランドの視覚的アイデンティティ（カラーパレット、タイポグラフィ、デザイン原則）を定義します。
色彩心理学と業界のベストプラクティスに基づいた推奨を提供します。
必ずJSON形式で出力してください。`,

    swotAnalysis: `あなたはビジネス戦略アナリストです。
企業のSWOT分析（強み、弱み、機会、脅威）を実施します。
市場動向、競合状況、内部リソースを考慮した包括的な分析を提供します。
必ずJSON形式で出力してください。`,

    competitorAnalysis: `あなたは競合分析の専門家です。
主要競合企業の詳細な分析を実施し、差別化ポイントを特定します。
各競合の強み、弱み、市場ポジション、戦略を分析します。
必ずJSON形式で出力してください。`,

    idealCustomerProfile: `あなたは顧客インサイトの専門家です。
詳細な顧客ペルソナを作成し、ターゲット顧客の特性、ニーズ、行動パターンを定義します。
必ずJSON形式で出力してください。`,

    marketingCopy: `あなたはコピーライティングの専門家です。
ブランドボイスに合わせた魅力的なマーケティングコピーを作成します。
ヘッドライン、タグライン、製品説明、CTA（Call to Action）を提供します。
必ずJSON形式で出力してください。`,

    contentStrategy: `あなたはコンテンツマーケティングの専門家です。
包括的なコンテンツ戦略を立案し、チャネル、トピック、頻度、KPIを定義します。
必ずJSON形式で出力してください。`,

    campaignIdeas: `あなたはマーケティングキャンペーンの専門家です。
創造的で実行可能なマーケティングキャンペーンのアイデアを提供します。
各キャンペーンの目的、ターゲット、チャネル、予算、期待される成果を明確にします。
必ずJSON形式で出力してください。`,
  },
  en: {
    brandIdentity: `You are a brand strategy expert with over 20 years of experience.
You define brand identity based on established branding frameworks.
Your output should be professional, actionable, and aligned with the selected brand archetype.
Always output in JSON format.`,

    brandArchetype: `You are a brand archetype expert.
You are well-versed in the 12 brand archetypes (The Innocent, The Sage, The Explorer, The Outlaw, The Magician, The Hero, The Lover, The Jester, The Everyman, The Caregiver, The Ruler, The Creator).
You provide detailed analysis of the selected archetype based on company information.
Always output in JSON format.`,

    visualIdentity: `You are a visual branding expert.
You define visual brand identity (color palette, typography, design principles).
You provide recommendations based on color psychology and industry best practices.
Always output in JSON format.`,

    swotAnalysis: `You are a business strategy analyst.
You conduct SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for companies.
You provide comprehensive analysis considering market trends, competitive landscape, and internal resources.
Always output in JSON format.`,

    competitorAnalysis: `You are a competitive analysis expert.
You conduct detailed analysis of key competitors and identify differentiation points.
You analyze each competitor's strengths, weaknesses, market position, and strategy.
Always output in JSON format.`,

    idealCustomerProfile: `You are a customer insights expert.
You create detailed customer personas and define target customer characteristics, needs, and behavior patterns.
Always output in JSON format.`,

    marketingCopy: `You are a copywriting expert.
You create compelling marketing copy aligned with brand voice.
You provide headlines, taglines, product descriptions, and CTAs (Call to Action).
Always output in JSON format.`,

    contentStrategy: `You are a content marketing expert.
You develop comprehensive content strategies and define channels, topics, frequency, and KPIs.
Always output in JSON format.`,

    campaignIdeas: `You are a marketing campaign expert.
You provide creative and actionable marketing campaign ideas.
You clearly define the purpose, target, channels, budget, and expected outcomes for each campaign.
Always output in JSON format.`,
  },
};

export function generateBrandIdentityPrompt(context: PromptContext): string {
  const lang = context.language === "ja" ? "ja" : "en";
  
  return `以下の情報に基づいて、${context.brandName}のブランドアイデンティティを生成してください。

# 企業情報
- ブランド名: ${context.brandName}
- ブランディングタイプ: ${context.brandingType}
${context.inspiration ? `- インスピレーション: ${context.inspiration}` : ""}

# ターゲット顧客
${context.icp || "未定義"}

# 競合
${context.competitors || "未定義"}

# ブランド価値
${context.brandValues || "未定義"}

# 選択されたアーキタイプ
${context.selectedArchetype || "未選択"}

# 出力形式
以下のJSON形式で出力してください：
{
  "brandVoice": "ブランドボイスの説明（2-3文）",
  "brandPromise": "ブランドプロミスの説明（2-3文）",
  "brandPersonality": "ブランドパーソナリティの説明（2-3文）",
  "brandMission": "ミッションステートメント（2-3文）",
  "brandVision": "ビジョンステートメント（2-3文）",
  "usp": "独自の販売提案（2-3文）",
  "brandGoals": ["目標1", "目標2", "目標3"],
  "brandValues": ["価値1", "価値2", "価値3", "価値4", "価値5"]
}`;
}

export function generateBrandArchetypePrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}の選択されたブランドアーキタイプ「${context.selectedArchetype}」の詳細分析を提供してください。

# 企業情報
- ブランド名: ${context.brandName}
- ブランディングタイプ: ${context.brandingType}
- 選択されたアーキタイプ: ${context.selectedArchetype}

# 出力形式
以下のJSON形式で出力してください：
{
  "overview": "このアーキタイプの概要（3-4文）",
  "application": "このアーキタイプが${context.brandName}にどのように適用されるか（3-4文）",
  "definition": "このアーキタイプの一般的な定義（2-3文）",
  "keyTraits": ["特性1", "特性2", "特性3", "特性4"],
  "typicalGoal": "典型的な目標（1-2文）",
  "coreStrategies": ["戦略1", "戦略2", "戦略3"],
  "marketingNiche": "マーケティングニッチ（2-3文）",
  "potentialDrawback": "潜在的な欠点（2-3文）"
}`;
}

export function generateVisualIdentityPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}のビジュアルアイデンティティを定義してください。

# 企業情報
- ブランド名: ${context.brandName}
- 選択されたアーキタイプ: ${context.selectedArchetype}
- ブランド価値: ${context.brandValues}

# 出力形式
以下のJSON形式で出力してください：
{
  "typography": {
    "primaryFont": {
      "name": "推奨フォント名",
      "size": "推奨サイズ",
      "weight": "推奨ウェイト",
      "rationale": "選択理由（2-3文）"
    },
    "secondaryFont": {
      "name": "推奨フォント名",
      "size": "推奨サイズ",
      "weight": "推奨ウェイト",
      "rationale": "選択理由（2-3文）"
    }
  },
  "colorPalette": {
    "primary": {
      "color": "#HEX",
      "name": "色名",
      "psychology": "心理的関連性（2-3文）",
      "industryRelevance": "業界関連性（2-3文）"
    },
    "secondary": [
      {
        "color": "#HEX",
        "name": "色名",
        "usage": "使用用途"
      }
    ]
  }
}`;
}

export function generateSWOTPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}のSWOT分析を実施してください。

# 企業情報
- ブランド名: ${context.brandName}
- ブランディングタイプ: ${context.brandingType}
- 競合: ${context.competitors}

# 出力形式
以下のJSON形式で出力してください：
{
  "strengths": ["強み1", "強み2", "強み3", "強み4"],
  "weaknesses": ["弱み1", "弱み2", "弱み3"],
  "opportunities": ["機会1", "機会2", "機会3", "機会4"],
  "threats": ["脅威1", "脅威2", "脅威3"]
}`;
}

export function generateCompetitorAnalysisPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}の競合分析を実施してください。

# 企業情報
- ブランド名: ${context.brandName}
- 競合: ${context.competitors}

# 出力形式
以下のJSON形式で出力してください：
{
  "competitors": [
    {
      "name": "競合企業名",
      "strengths": ["強み1", "強み2"],
      "weaknesses": ["弱み1", "弱み2"],
      "marketPosition": "市場ポジション（2-3文）",
      "differentiationPoints": ["差別化ポイント1", "差別化ポイント2"]
    }
  ]
}`;
}

export function generateICPPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}の理想的な顧客プロファイルを作成してください。

# 企業情報
- ブランド名: ${context.brandName}
- ターゲット顧客情報: ${context.icp}

# 出力形式
以下のJSON形式で出力してください：
{
  "personas": [
    {
      "name": "ペルソナ名",
      "age": "年齢層",
      "occupation": "職業",
      "interests": ["興味1", "興味2", "興味3"],
      "painPoints": ["課題1", "課題2", "課題3"],
      "goals": ["目標1", "目標2"],
      "buyingBehavior": "購買行動の説明（2-3文）"
    }
  ]
}`;
}

export function generateMarketingCopyPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}のマーケティングコピーを作成してください。

# 企業情報
- ブランド名: ${context.brandName}
- 選択されたアーキタイプ: ${context.selectedArchetype}

# 出力形式
以下のJSON形式で出力してください：
{
  "headlines": ["ヘッドライン1", "ヘッドライン2", "ヘッドライン3"],
  "taglines": ["タグライン1", "タグライン2", "タグライン3"],
  "productDescriptions": ["説明1", "説明2"],
  "ctas": ["CTA1", "CTA2", "CTA3"]
}`;
}

export function generateContentStrategyPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}のコンテンツ戦略を立案してください。

# 企業情報
- ブランド名: ${context.brandName}
- ターゲット顧客: ${context.icp}

# 出力形式
以下のJSON形式で出力してください：
{
  "channels": [
    {
      "name": "チャネル名",
      "topics": ["トピック1", "トピック2"],
      "frequency": "投稿頻度",
      "kpis": ["KPI1", "KPI2"]
    }
  ]
}`;
}

export function generateCampaignIdeasPrompt(context: PromptContext): string {
  return `以下の情報に基づいて、${context.brandName}のマーケティングキャンペーンアイデアを提供してください。

# 企業情報
- ブランド名: ${context.brandName}
- ターゲット顧客: ${context.icp}

# 出力形式
以下のJSON形式で出力してください：
{
  "campaigns": [
    {
      "name": "キャンペーン名",
      "objective": "目的（2-3文）",
      "target": "ターゲット層",
      "channels": ["チャネル1", "チャネル2"],
      "budget": "予算範囲",
      "expectedOutcomes": ["成果1", "成果2"]
    }
  ]
}`;
}

