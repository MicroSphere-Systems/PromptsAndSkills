---
title: "Build a RAG Pipeline with LangChain and Pinecone"
description: "Step-by-step guide to building a production-ready RAG pipeline using LangChain for orchestration and Pinecone for vector storage."
category: skills
tags: ["rag", "langchain", "pinecone", "vector-search"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# Build a RAG Pipeline with LangChain and Pinecone

This skill walks you through building a complete retrieval-augmented generation pipeline from scratch, covering document ingestion, embedding, vector storage, retrieval, and answer generation.

## Steps

1. **Install dependencies**
   ```bash
   pip install langchain langchain-anthropic langchain-openai langchain-pinecone pinecone-client
   ```

2. **Initialize Pinecone index**
   ```python
   from pinecone import Pinecone, ServerlessSpec

   pc = Pinecone(api_key="your-pinecone-key")
   pc.create_index(
       name="rag-docs",
       dimension=1536,
       metric="cosine",
       spec=ServerlessSpec(cloud="aws", region="us-east-1")
   )
   ```

3. **Load and chunk documents**
   ```python
   from langchain_community.document_loaders import DirectoryLoader
   from langchain.text_splitter import RecursiveCharacterTextSplitter

   loader = DirectoryLoader("./docs", glob="**/*.md")
   documents = loader.load()

   splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
   chunks = splitter.split_documents(documents)
   ```

4. **Embed and upsert into Pinecone**
   ```python
   from langchain_openai import OpenAIEmbeddings
   from langchain_pinecone import PineconeVectorStore

   embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
   vectorstore = PineconeVectorStore.from_documents(
       chunks, embeddings, index_name="rag-docs"
   )
   ```

5. **Build the retrieval chain**
   ```python
   from langchain_anthropic import ChatAnthropic
   from langchain.chains import RetrievalQA

   llm = ChatAnthropic(model="claude-sonnet-4-6", max_tokens=1024)
   retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

   qa_chain = RetrievalQA.from_chain_type(
       llm=llm,
       retriever=retriever,
       return_source_documents=True,
   )
   ```

6. **Query the pipeline**
   ```python
   result = qa_chain.invoke({"query": "How do I configure authentication?"})
   print(result["result"])
   for doc in result["source_documents"]:
       print(f"  Source: {doc.metadata['source']}")
   ```

## Example

```python
# Complete working example
from langchain_anthropic import ChatAnthropic
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Prepare documents
texts = [
    "OAuth2 bearer tokens are passed in the Authorization header.",
    "API rate limits are 100 requests per minute for free tier.",
    "Webhooks require HMAC-SHA256 signature verification.",
]
splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
docs = splitter.create_documents(texts)

# Build vectorstore and chain
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = PineconeVectorStore.from_documents(docs, embeddings, index_name="rag-docs")

llm = ChatAnthropic(model="claude-sonnet-4-6", max_tokens=1024)
qa = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

answer = qa.invoke({"query": "How do I authenticate?"})
print(answer["result"])
```

## When to Use

- You need a quick, reliable RAG pipeline with managed infrastructure
- Your corpus fits within Pinecone's serverless tier (up to 2GB free)
- You want LangChain's ecosystem of loaders, splitters, and chain types
- You need source attribution in answers

## When NOT to Use

- Your data must stay on-premises (Pinecone is cloud-only)
- You need sub-50ms retrieval latency (self-hosted alternatives are faster)
- Your corpus changes every few seconds (batch embedding is too slow)
- You want full control over retrieval logic without framework abstractions

## Prerequisites

- Python 3.9+
- Pinecone account with API key
- OpenAI API key for embeddings
- Anthropic API key for generation

## Pro Tips

1. **Use namespaces for multi-tenancy** -- Pinecone namespaces let you isolate documents per user or team without creating separate indexes, saving costs and simplifying management.
2. **Add metadata filters** -- Attach source, date, and category metadata to each chunk during ingestion so you can filter at query time instead of relying on vector similarity alone.
3. **Cache frequent queries** -- Wrap the retrieval chain with a Redis cache to avoid redundant embedding and retrieval calls for common questions, cutting costs and latency by 90%.
