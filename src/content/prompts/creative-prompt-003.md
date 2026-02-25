---
title: "SEO Meta Description Generator Prompt"
description: "Generates optimized meta descriptions with keyword integration, compelling CTAs, and character count compliance for blog posts."
category: prompts
tags: ["seo", "meta-description", "search-optimization", "copywriting"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt creates SEO-optimized meta descriptions that improve click-through rates from search engine results pages. It balances keyword inclusion with compelling copy that motivates clicks.

## Prompt

```
Generate 5 meta description variations for this blog post:

Title: "{{title}}"
Primary keyword: {{keyword}}
Blog summary: {{summary}}

Requirements for each variation:
- Exactly 150-160 characters (count precisely)
- Include the primary keyword naturally within the first 100 characters
- End with a clear value proposition or CTA
- Use active voice
- Include at least one power word (proven, essential, complete, ultimate, free, etc.)

Format each as:
[N]. [meta description] (CHARACTER_COUNT chars)

Also provide:
- RECOMMENDED: Which variation balances keyword placement and click appeal best
- RICH SNIPPET TIP: Suggest structured data type for enhanced SERP display
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `title` | Blog post title | "How to Build a REST API with Python Flask" |
| `keyword` | Primary SEO keyword | "Python Flask REST API" |
| `summary` | Brief blog content summary | "Step-by-step guide to building a REST API using Python Flask, covering routes, error handling, and deployment" |

## Example Output

1. Build a Python Flask REST API from scratch with this complete step-by-step guide. Covers routes, error handling, and deployment tips. (152 chars)

2. Learn to build a Python Flask REST API in under an hour. This proven guide walks you through setup, routes, and production deployment. (148 chars)

3. Your essential guide to building a Python Flask REST API. Master routes, authentication, error handling, and deploy with confidence. (143 chars)

4. Python Flask REST API tutorial: build, test, and deploy your first API with this beginner-friendly guide. Includes working code examples. (150 chars)

5. Master Python Flask REST API development with this hands-on guide. From first route to production deployment in one complete tutorial. (147 chars)

RECOMMENDED: Variation 4 — places keyword first for maximum SERP visibility and includes "working code examples" as a concrete value proposition.

RICH SNIPPET TIP: Add HowTo structured data for potential step-display in search results.

## Variations

1. **E-commerce Focus** — Add "price" or "discount" power words and urgency language for product-related blog posts.
2. **Local SEO** — Include geographic modifiers and "near me" phrasing for location-specific content.
3. **News/Trending** — Use current year and "latest" or "updated" to signal freshness for time-sensitive topics.

## Best Model

Claude Haiku 4.5 handles this efficiently for bulk generation. Use Sonnet 4.6 when you need more creative variation in the copy.
