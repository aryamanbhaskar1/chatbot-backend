
# ImasonsGPT — RAG Chatbot Backend

Backend for ImasonsGPT, an LLM-powered application developed through the NYU Business Analytics Club's Machine Learning team.

The system uses retrieval-augmented generation (RAG) to answer questions grounded in expert-interview transcripts, combining vector retrieval with an LLM to generate context-aware responses.

## Architecture

1. **Transcript processing:** Interview transcripts are processed and divided into retrieval-friendly chunks.
2. **Embedding and indexing:** OpenAI embeddings are used to represent transcript passages, with Pinecone handling vector storage and retrieval.
3. **Response generation:** Relevant passages are retrieved and passed to Qwen through Together AI to generate responses grounded in the source material.
4. **API and deployment:** The backend uses Next.js and TypeScript, integrates with the application's frontend, and is deployed through Vercel.

## Tech Stack

- Next.js / TypeScript
- Qwen via Together AI
- OpenAI Embeddings
- Pinecone
- Vercel

## Related Work

The transcript-processing pipeline is available in the [semantic-chunking repository](https://github.com/aryamanbhaskar1/semantic-chunking).

Developed as a collaborative ML project through NYU Business Analytics Club.
