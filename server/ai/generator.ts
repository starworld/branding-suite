import { invokeLLMWithFallback } from "./llm";
import * as prompts from "./prompts";
import { SYSTEM_PROMPTS } from "./prompts";
import * as db from "../db";

interface GenerationContext {
  brandPositioningId: string;
  brandName: string;
  brandingType: string;
  inspiration?: string;
  icp?: string;
  competitors?: string;
  brandValues?: string;
  selectedArchetype?: string;
  language: string;
}

export async function generateBrandIdentity(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].brandIdentity;
  const userPrompt = prompts.generateBrandIdentityPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  // Track AI generation
  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "brandIdentity",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateBrandArchetype(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].brandArchetype;
  const userPrompt = prompts.generateBrandArchetypePrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "brandArchetype",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateVisualIdentity(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].visualIdentity;
  const userPrompt = prompts.generateVisualIdentityPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "visualIdentity",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateSWOTAnalysis(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].swotAnalysis;
  const userPrompt = prompts.generateSWOTPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "swotAnalysis",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateCompetitorAnalysis(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].competitorAnalysis;
  const userPrompt = prompts.generateCompetitorAnalysisPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "competitorAnalysis",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateIdealCustomerProfile(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].idealCustomerProfile;
  const userPrompt = prompts.generateICPPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "idealCustomerProfile",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateMarketingCopy(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].marketingCopy;
  const userPrompt = prompts.generateMarketingCopyPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.8,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "marketingCopy",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateContentStrategy(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].contentStrategy;
  const userPrompt = prompts.generateContentStrategyPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.7,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "contentStrategy",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateCampaignIdeas(context: GenerationContext) {
  const startTime = Date.now();
  
  const systemPrompt = SYSTEM_PROMPTS[context.language === "ja" ? "ja" : "en"].campaignIdeas;
  const userPrompt = prompts.generateCampaignIdeasPrompt(context);

  const response = await invokeLLMWithFallback({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    responseFormat: { type: "json_object" },
    temperature: 0.8,
    maxTokens: 2000,
  });

  const generationTime = Date.now() - startTime;

  await db.trackAiGeneration({
    brandPositioningId: context.brandPositioningId,
    sectionName: "campaignIdeas",
    modelUsed: response.model,
    promptTemplate: userPrompt,
    inputData: JSON.stringify(context),
    outputData: response.content,
    tokensUsed: response.tokensUsed,
    costUsd: response.costUsd,
    generationTimeMs: generationTime,
  });

  return JSON.parse(response.content);
}

export async function generateCompleteReport(context: GenerationContext) {
  console.log("Starting complete report generation for:", context.brandName);

  // Generate all sections sequentially for better error handling
  console.log("[Generator] Step 1/9: Generating Brand Identity...");
  const brandIdentity = await generateBrandIdentity(context);
  
  console.log("[Generator] Step 2/9: Generating Brand Archetype...");
  const brandArchetype = await generateBrandArchetype(context);
  
  console.log("[Generator] Step 3/9: Generating Visual Identity...");
  const visualIdentity = await generateVisualIdentity(context);
  
  console.log("[Generator] Step 4/9: Generating SWOT Analysis...");
  const swotAnalysis = await generateSWOTAnalysis(context);
  
  console.log("[Generator] Step 5/9: Generating Competitor Analysis...");
  const competitorAnalysis = await generateCompetitorAnalysis(context);
  
  console.log("[Generator] Step 6/9: Generating Ideal Customer Profile...");
  const idealCustomerProfile = await generateIdealCustomerProfile(context);
  
  console.log("[Generator] Step 7/9: Generating Marketing Copy...");
  const marketingCopy = await generateMarketingCopy(context);
  
  console.log("[Generator] Step 8/9: Generating Content Strategy...");
  const contentStrategy = await generateContentStrategy(context);
  
  console.log("[Generator] Step 9/9: Generating Campaign Ideas...");
  const campaignIdeas = await generateCampaignIdeas(context);

  // Create generated report
  const report = await db.createGeneratedReport({
    brandPositioningId: context.brandPositioningId,
    brandIdentity: JSON.stringify(brandIdentity),
    brandArchetype: JSON.stringify(brandArchetype),
    visualIdentity: JSON.stringify(visualIdentity),
    swotAnalysis: JSON.stringify(swotAnalysis),
    competitorAnalysis: JSON.stringify(competitorAnalysis),
    idealCustomerProfiles: JSON.stringify(idealCustomerProfile),
    marketingCopy: JSON.stringify(marketingCopy),
    contentStrategy: JSON.stringify(contentStrategy),
    marketingCampaignIdeas: JSON.stringify(campaignIdeas),
  });

  // Update brand positioning status
  await db.updateBrandPositioning(context.brandPositioningId, {
    status: "completed",
    currentStep: 8,
    reportData: JSON.stringify({
      reportId: report.id,
      generatedAt: new Date().toISOString(),
    }),
  });

  console.log("Complete report generation finished for:", context.brandName);

  return report;
}

