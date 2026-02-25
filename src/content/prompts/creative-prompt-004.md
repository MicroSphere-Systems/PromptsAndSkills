---
title: "Blog Post Expansion Prompt"
description: "Takes a thin blog draft and expands it into a comprehensive long-form article with examples, data, and proper structure."
category: prompts
tags: ["content-expansion", "long-form", "blog-writing", "depth"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt transforms short or skeletal blog drafts into full-length, authoritative articles. It identifies what is missing and systematically adds depth while preserving the original voice and intent.

## Prompt

```
Expand the following blog draft into a comprehensive long-form article:

---
{{draft_content}}
---

Target word count: {{target_words}}
Audience expertise level: {{expertise_level}}
Tone: {{tone}}

Expansion rules:
1. Keep the original structure but add depth to each section
2. For every claim, add a supporting example, statistic, or case study
3. Break paragraphs longer than 4 sentences into smaller chunks
4. Add at least 2 new H2 sections that the draft is missing
5. Include a "Common Mistakes" or "What to Avoid" section
6. Add transition sentences between all sections
7. Insert at least one comparison table or decision matrix
8. End each major section with a one-sentence key takeaway
9. Do NOT add fluff — every sentence must provide new information
10. Maintain the original author's voice throughout

Output the expanded article in Markdown format with word count annotations per section.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `draft_content` | The original thin blog draft | (paste blog draft here) |
| `target_words` | Desired final word count | "2500" |
| `expertise_level` | Reader knowledge level | "intermediate developers" |
| `tone` | Writing voice to maintain | "technical but approachable" |

## Example Output

The expanded article would take a 400-word draft about "Getting Started with Docker" and produce a 2500-word comprehensive guide adding sections on Docker Compose, common configuration mistakes, a comparison table of Docker vs Podman, real deployment scenarios, and troubleshooting tips — all while matching the original conversational developer tone.

## Variations

1. **Beginner Expansion** — Add more foundational context, define all technical terms, and include "prerequisite knowledge" callouts.
2. **Expert Expansion** — Skip basics and add advanced use cases, performance benchmarks, and architecture considerations.
3. **SEO Expansion** — Focus additions on covering related search queries and FAQ sections for featured snippet targeting.

## Best Model

Claude Opus 4.6 produces the best long-form expansions with consistent voice matching. Sonnet 4.6 works well for drafts under 1000 words.
