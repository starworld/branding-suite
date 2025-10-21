import { invokeLLM as manusInvokeLLM } from "../_core/llm";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface LLMOptions {
  messages: Message[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  responseFormat?: {
    type: "json_object" | "text";
  };
}

interface LLMResponse {
  content: string;
  model: string;
  tokensUsed: number;
  costUsd: number;
}

// Configuration
const USE_OPENROUTER = process.env.USE_OPENROUTER === "true";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY ?? "";
const DEFAULT_MODEL = "deepseek/deepseek-chat-v3.1:free";
const FALLBACK_MODELS = ["x-ai/grok-4-fast:free", "google/gemini-2.5-flash"];

console.log(`[LLM] Using ${USE_OPENROUTER ? "OpenRouter" : "Manus built-in LLM"}`);

/**
 * Invoke LLM using Manus built-in service (free during campaign)
 */
async function invokeManusLLM(options: LLMOptions): Promise<LLMResponse> {
  const { messages, maxTokens = 4000, responseFormat } = options;

  console.log("[LLM] Invoking Manus built-in LLM...");
  
  const response = await manusInvokeLLM({
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
    max_tokens: maxTokens,
    response_format: responseFormat?.type === "json_object" ? { type: "json_object" } : undefined,
  });

  console.log("[LLM] Manus LLM response received, tokens used:", response.usage?.total_tokens ?? 0);

  const content = response.choices[0].message.content;
  const contentString = typeof content === 'string' ? content : JSON.stringify(content);

  return {
    content: contentString,
    model: response.model ?? "manus-default",
    tokensUsed: response.usage?.total_tokens ?? 0,
    costUsd: 0, // Free during campaign
  };
}

/**
 * Invoke LLM using OpenRouter API
 */
async function invokeOpenRouterLLM(options: LLMOptions): Promise<LLMResponse> {
  const {
    messages,
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens = 4000,
    topP = 0.9,
    responseFormat,
  } = options;

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  console.log("[LLM] Invoking OpenRouter with model:", model);

  const requestBody: any = {
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    top_p: topP,
  };

  if (responseFormat?.type === "json_object") {
    requestBody.response_format = { type: "json_object" };
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://branding.zeroai.jp",
      "X-Title": "Branding Suite",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenRouter API error: ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();

  console.log("[LLM] OpenRouter response received, tokens used:", data.usage?.total_tokens ?? 0);

  return {
    content: data.choices[0].message.content,
    model: data.model,
    tokensUsed: data.usage?.total_tokens ?? 0,
    costUsd: 0, // Free models have 0 cost
  };
}

/**
 * Main LLM invocation function
 * Uses Manus LLM by default, falls back to OpenRouter on error
 */
export async function invokeLLM(options: LLMOptions): Promise<LLMResponse> {
  try {
    if (USE_OPENROUTER) {
      return await invokeOpenRouterLLM(options);
    } else {
      return await invokeManusLLM(options);
    }
  } catch (error) {
    console.error("[LLM] Primary LLM failed:", error);
    
    // Fallback to OpenRouter if Manus LLM fails and OpenRouter is configured
    if (!USE_OPENROUTER && OPENROUTER_API_KEY) {
      console.log("[LLM] Falling back to OpenRouter...");
      try {
        return await invokeOpenRouterLLM(options);
      } catch (fallbackError) {
        console.error("[LLM] OpenRouter fallback also failed:", fallbackError);
      }
    }
    
    throw error;
  }
}

/**
 * Invoke LLM with fallback to multiple OpenRouter models
 */
export async function invokeLLMWithFallback(options: LLMOptions): Promise<LLMResponse> {
  if (!USE_OPENROUTER) {
    // For Manus LLM, no model fallback needed
    return await invokeLLM(options);
  }

  // For OpenRouter, try multiple models
  const models = [options.model ?? DEFAULT_MODEL, ...FALLBACK_MODELS];

  for (const model of models) {
    try {
      return await invokeOpenRouterLLM({ ...options, model });
    } catch (error) {
      console.warn(`[LLM] Failed to invoke ${model}, trying next model...`, error);
      continue;
    }
  }

  throw new Error("All LLM models failed");
}

