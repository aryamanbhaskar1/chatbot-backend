export async function callModel({
  message,
  context,
}: {
  message: string;
  context: string;
}): Promise<string> {
  return `Mock model response.\nMessage: ${message}\nContext: ${context}`;
}