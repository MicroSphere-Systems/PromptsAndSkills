---
title: "Blog Intro Paragraph Writer Prompt"
description: "Writes three variations of compelling blog introduction paragraphs using proven hook techniques for any topic."
category: prompts
tags: ["blog-intro", "hooks", "engagement", "writing"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt produces three distinct blog introduction paragraphs, each using a different hook technique. It helps writers overcome the blank page and provides A/B testing options for optimizing reader engagement.

## Prompt

```
Write 3 different introduction paragraphs for a blog post about "{{topic}}".

Tone: {{tone}}
Target audience: {{audience}}

Each introduction must:
- Be exactly 3-5 sentences
- Use a different hook technique:
  1. Question Hook: Start with a relatable question
  2. Data Hook: Lead with a specific statistic or finding
  3. Story Hook: Open with a brief anecdote or scenario

- End with a clear thesis statement or preview of what the reader will learn
- Avoid these overused openings: "In today's world...", "Have you ever wondered...", "According to experts..."

After each introduction, add:
- [HOOK TYPE]: Name of the technique used
- [WHY IT WORKS]: One sentence explaining the psychological principle
- [BEST FOR]: The type of blog post this hook suits best
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `topic` | Blog post subject | "Why most startups fail in the first year" |
| `tone` | Writing voice | "conversational but authoritative" |
| `audience` | Target readers | "Aspiring entrepreneurs with no prior experience" |

## Example Output

**Version 1 — Question Hook:**
You have saved for months, quit your stable job, and launched your product. Six months later, you are staring at a bank account draining faster than your runway allows. Sound familiar? Nearly 90% of startups face this exact moment — and what happens next determines everything. This post breaks down the three financial blind spots that kill startups before they ever find product-market fit.

[HOOK TYPE]: Question Hook with scenario
[WHY IT WORKS]: Triggers loss aversion and personal identification
[BEST FOR]: Problem-solution blog posts targeting experienced audiences

## Variations

1. **Controversy Hook** — Add a fourth variation that opens with a counterintuitive or contrarian statement to spark debate.
2. **Emotional Hook** — Replace the data hook with a sensory or emotional description that puts the reader in a specific moment.
3. **Authority Hook** — Open with a quote or insight from a recognized expert in the field.

## Best Model

Claude Sonnet 4.6 delivers strong results for this prompt. The variations are distinct enough to be genuinely useful for A/B testing.
