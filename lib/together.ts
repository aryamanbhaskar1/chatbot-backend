export async function callModel({
  message,
  context,
}: {
  message: string;
  context: string;
}): Promise<string> {
  const apiKey = process.env.TOGETHER_API_KEY;
  const model = process.env.TOGETHER_MODEL;

  if (!apiKey) {
    throw new Error("Missing TOGETHER_API_KEY");
  }

  if (!model) {
    throw new Error("Missing TOGETHER_MODEL");
  }

  const messages = [
    {
      role: "system",
      content: context
        ? `You are a helpful assistant. Use the provided context when relevant.\n\nContext:\n${context}`
        : "You are a helpful assistant.",
    },
    {
      role: "user",
      content: message,
    },
  ];

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TogetherAI error ${response.status}: ${text}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content ?? "";

  return reply.trim();
}