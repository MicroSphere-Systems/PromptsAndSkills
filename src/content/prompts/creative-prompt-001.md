---
title: "Blog Post Outline Generator Prompt"
description: "Generates a complete blog post outline with SEO-optimized headings, intro hook, and section summaries for any given topic."
category: prompts
tags: ["blog-outline", "content-planning", "seo", "structure"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt generates comprehensive blog post outlines that balance reader engagement with search engine optimization. It produces a ready-to-write structure complete with heading hierarchy, section goals, and keyword placement guidance.

## Prompt

```
Create a detailed blog post outline for the topic: "{{topic}}"

Target audience: {{audience}}
Target word count: {{word_count}}
Primary keyword: {{primary_keyword}}

Generate:
1. An engaging title (under 60 characters, includes primary keyword)
2. Meta description (under 160 characters)
3. Introduction hook (specify which type: question, statistic, or story)
4. 4-6 H2 sections, each with:
   - H2 heading (keyword-rich but natural)
   - 2-3 H3 subheadings where needed
   - Key points to cover in each section
   - Estimated word count per section
5. Conclusion with specific CTA
6. Internal linking suggestions (3-5 related topics)

Format the outline in Markdown with annotations for SEO notes in [brackets].
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `topic` | The blog post subject | "How to Start a Vegetable Garden" |
| `audience` | Target reader profile | "First-time homeowners aged 25-40" |
| `word_count` | Target total word count | "2000" |
| `primary_keyword` | Main SEO keyword | "beginner vegetable garden" |

## Example Output

```markdown
# How to Start a Vegetable Garden: A Beginner's Complete Guide

**Meta:** Learn how to start a vegetable garden from scratch with this step-by-step beginner guide covering soil, seeds, layout, and harvest timing.

**Hook (Question):** What if your grocery bill dropped by $600 a year — and all it took was a 4x8 patch of dirt in your backyard?

## Why Start a Vegetable Garden Now [~300 words]
### Health Benefits Beyond Fresh Produce
### The Financial Case for Growing Your Own Food

## Choosing Your Garden Location [~350 words]
### Sunlight Requirements by Vegetable Type
### Soil Testing Made Simple

## Essential Tools and Materials [~300 words]
[Target featured snippet: bulleted list format]

## Your First Planting Plan [~400 words]
### Best Vegetables for Absolute Beginners
### Month-by-Month Planting Calendar

## Common Beginner Mistakes to Avoid [~350 words]
[FAQ schema opportunity]

## Conclusion + CTA [~200 words]
CTA: Download our free printable planting calendar
```

## Variations

1. **Listicle Format** — Change "4-6 H2 sections" to "7-15 numbered list items" for list-style posts like "10 Best Tools for X."
2. **How-To Focus** — Add "Step-by-step numbered instructions" to each H2 for tutorial-style content.
3. **Comparison Post** — Replace section structure with "Product A vs Product B" with pros/cons tables per H2.

## Best Model

Claude Sonnet 4.6 handles this well with fast output. Use Opus 4.6 for complex topics requiring deeper research angles and more creative hook suggestions.
