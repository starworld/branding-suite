import { ENV } from "../_core/env";

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

const DEFAULT_MODEL = "deepseek/deepseek-chat-v3.1:free";
const FALLBACK_MODELS = ["x-ai/grok-4-fast:free", "google/gemini-2.5-flash"];

export async function invokeLLM(options: LLMOptions): Promise<LLMResponse> {
  const {
    messages,
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens = 4000,
    topP = 0.9,
    responseFormat,
  } = options;

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

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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

    return {
      content: data.choices[0].message.content,
      model: data.model,
      tokensUsed: data.usage?.total_tokens ?? 0,
      costUsd: 0, // Free models have 0 cost
    };
  } catch (error) {
    console.error("LLM invocation error:", error);
    throw error;
  }
}

export async function invokeLLMWithFallback(options: LLMOptions): Promise<LLMResponse> {
  const models = [options.model ?? DEFAULT_MODEL, ...FALLBACK_MODELS];

  for (const model of models) {
    try {
      return await invokeLLM({ ...options, model });
    } catch (error) {
      console.warn(`Failed to invoke ${model}, trying next model...`, error);
      continue;
    }
  }

  throw new Error("All LLM models failed");
}

