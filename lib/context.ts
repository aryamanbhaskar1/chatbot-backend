export async function getContext(message: string): Promise<string> {
  return `Mock context for query: ${message}`;
}