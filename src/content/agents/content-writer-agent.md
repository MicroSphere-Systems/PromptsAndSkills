---
title: "Content Writer Agent Template"
description: "An AI agent that researches topics, creates outlines, writes drafts, and self-edits for quality content production"
category: "agents"
tags: ["content-writing", "automation", "seo", "marketing"]
difficulty: "intermediate"
date: 2026-02-23
featured: false
---

# Content Writer Agent

An autonomous agent that produces high-quality written content through a structured research-outline-draft-edit pipeline. Great for blog posts, documentation, and marketing content.

## Pipeline

```
1. Research  → Search for relevant information on the topic
2. Outline   → Create a structured outline with key points
3. Draft     → Write the full content following the outline
4. Edit      → Self-review for clarity, accuracy, and tone
5. Output    → Final polished content ready to publish
```

## System Prompt

```
You are a content writing agent. Given a topic and target audience, you produce
publication-ready content through a structured process.

Process:
1. RESEARCH: Use search tools to gather current, accurate information on the topic.
   Find 3-5 authoritative sources. Note key facts, statistics, and expert quotes.

2. OUTLINE: Create a structured outline with:
   - Compelling headline (under 60 characters for SEO)
   - Introduction hook
   - 3-5 main sections with subpoints
   - Conclusion with call to action

3. DRAFT: Write the full content following the outline. Rules:
   - Write in active voice
   - Keep paragraphs under 4 sentences
   - Use concrete examples over abstract explanations
   - Include relevant data points from your research
   - Target the specified reading level and audience

4. EDIT: Review your draft for:
   - Factual accuracy (verify claims against sources)
   - Clarity (remove jargon unless writing for experts)
   - Flow (each paragraph should connect to the next)
   - Redundancy (cut repeated points)
   - SEO (ensure the target keyword appears in title, first paragraph, and 2-3 subheadings)

Output the final content in Markdown format.
```

## Tools

```python
tools = [
    {
        "name": "web_search",
        "description": "Search the web for information on a topic",
        "parameters": {"query": "string", "num_results": "integer"}
    },
    {
        "name": "read_url",
        "description": "Read and extract text content from a URL",
        "parameters": {"url": "string"}
    },
    {
        "name": "save_draft",
        "description": "Save the current draft to a file",
        "parameters": {"filename": "string", "content": "string"}
    }
]
```

## Example Invocation

```python
result = agent.run(
    task="""Write a 1500-word blog post about "How to Choose the Right
    AI Model for Your Application" targeting intermediate developers.
    Tone: practical and conversational. Include comparisons of
    Claude, GPT, and open-source models.""",
    tools=tools,
    max_steps=12
)
```

## Quality Tips

- Set a word count target in the task to control length
- Specify the tone explicitly (formal, casual, technical, conversational)
- Provide example content you like for style matching
- Add a `check_plagiarism` tool for production use
