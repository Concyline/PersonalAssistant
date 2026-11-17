import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { defineAgent, defineDynamic } from "eve";

export default defineAgent({
  model: defineDynamic((ctx) => ({
    model: createOpenAICompatible({
      name: "opencode-go",
      baseURL: "https://opencode.ai/inference/go/openai/v1",
      apiKey: process.env.OPENCODE_GO_API_KEY,
      headers: {
        "x-opencode-session": ctx.session.id,
        "User-Agent": "eve-agent/1.0",
      },
      includeUsage: true,
    })("deepseek-v4.1-flash"),
    modelContextWindowTokens: 1_000_000,
  })),
  reasoning: "high",
});

//deepseek-v4.1-flash
//hy4