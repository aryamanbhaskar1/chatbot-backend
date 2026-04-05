import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";


export async function getContext(message: string): Promise<string> {
  const openaiKey = process.env.OPENAI_API_KEY;
  const pineconeKey = process.env.PINECONE_API_KEY;
  const indexName = process.env.PINECONE_INDEX_NAME;


  if (!openaiKey) throw new Error("Missing OPENAI_API_KEY");
  if (!pineconeKey) throw new Error("Missing PINECONE_API_KEY");
  if (!indexName) throw new Error("Missing PINECONE_INDEX_NAME");


  // 1. Create OpenAI client
  const openai = new OpenAI({ apiKey: openaiKey });


  // 2. Embed the user message
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: message,
  });


  const vector = embeddingRes.data[0].embedding;


  // 3. Initialize Pinecone
  const pinecone = new Pinecone({ apiKey: pineconeKey });
  const index = pinecone.index(indexName);


  // 4. Query Pinecone
  const queryResponse = await index.query({
    vector,
    topK: 5,
    includeMetadata: true,
  });


  const matches = queryResponse.matches || [];
  // FOR DEBUGGING PURPOSES
  console.log(matches);


  if (matches.length === 0) return "";


  // 5. Extract text from matches
  let context = "";


  for (const match of matches) {
    const text = match.metadata?.text;


    if (text) {
      context += context ? `\n\n${text}` : text;
    }
  }


  if (!context) return "";


  // 6. Wrap
  return `[CONTEXT]\n${context.trim()}\n[/CONTEXT]`;
 
}
