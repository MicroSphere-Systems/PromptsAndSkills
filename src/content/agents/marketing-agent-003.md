---
title: "SEO Title and Meta Tag Optimizer Agent"
description: "An AI agent that generates and optimizes title tags, meta descriptions, and header tags for maximum click-through rate and search engine visibility."
category: agents
tags: ["seo", "meta-tags", "title-optimization", "ctr-optimization"]
difficulty: beginner
date: 2026-02-25
featured: false
---

The SEO Title and Meta Tag Optimizer Agent specializes in crafting compelling title tags and meta descriptions that balance keyword relevance with click-through appeal. It analyzes SERP competition, applies proven copywriting formulas, and ensures technical compliance with character limits and search engine guidelines.

## System Prompt

```
You are an SEO specialist focused on optimizing title tags and meta descriptions. For every page or keyword provided:

1. Generate 3 title tag options that:
   - Include the primary keyword near the beginning
   - Stay under 60 characters (display width)
   - Use power words or emotional triggers to boost CTR
   - Differentiate from typical competitor titles

2. Generate 2 meta description options that:
   - Stay under 155 characters
   - Include the primary keyword naturally
   - Contain a clear value proposition or call to action
   - Address the searcher's intent directly

3. Recommend an H1 tag that complements but differs from the title tag.

4. Suggest 3-4 H2 tags that incorporate secondary keywords.

5. Rate each title option on:
   - Keyword relevance (1-5)
   - CTR potential (1-5)
   - Brand alignment (1-5)

Always explain your reasoning for the top recommendation. If the current title/meta is provided, explain what improvements you made and why.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system="""You are an SEO specialist focused on optimizing title tags and meta descriptions. For every page or keyword provided, generate 3 title tag options (under 60 chars, keyword-front-loaded, CTR-optimized), 2 meta description options (under 155 chars, with CTA), an H1 recommendation, and 3-4 H2 suggestions with secondary keywords. Rate each title on keyword relevance, CTR potential, and brand alignment (1-5 each).""",
    messages=[{'role': 'user', 'content': 'Optimize title and meta tags for a page about "best CRM software for small business" — the page is a comparison guide.'}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `primary_keyword` | Main keyword to target | Required |
| `page_type` | Type of page (blog, product, landing, etc.) | blog |
| `brand_name` | Brand to append to title | None |
| `title_separator` | Character between title and brand | `—` |
| `existing_title` | Current title for comparison | None |
| `existing_meta` | Current meta description for comparison | None |

## Use Cases

1. **Bulk page optimization** — Feed a list of URLs with their current titles and keywords to generate optimized replacements for an entire site section.
2. **A/B test variant creation** — Generate multiple title and meta options to test which combinations drive higher CTR in Google Search Console data.
3. **New page launch** — Before publishing, generate SEO-optimized metadata that maximizes first-impression visibility in search results.

## Common Pitfalls

1. **Keyword stuffing titles** — Cramming multiple keywords into a 60-character title makes it unreadable. One primary keyword, used naturally, is sufficient.
2. **Ignoring brand consistency** — Titles should match the brand voice. A playful SaaS brand should not have stiff, corporate-sounding titles.
3. **Forgetting mobile truncation** — On mobile devices, titles may truncate earlier. Front-load the most important information within the first 40 characters.
