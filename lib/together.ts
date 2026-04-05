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

  console.log("MODEL:", model);
  console.log("MESSAGES:", JSON.stringify(messages, null, 2));

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      reasoning: { enabled: false },
      max_tokens: 512,
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("TOGETHER ERROR:", text);
    throw new Error(`TogetherAI error ${response.status}: ${text}`);
  }

  const data = await response.json();
  console.log("RAW RESPONSE:", JSON.stringify(data, null, 2));

  const reply =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    "";

  if (!reply.trim()) {
    return "⚠️ Model returned empty response";
  }

  return reply.trim();
}