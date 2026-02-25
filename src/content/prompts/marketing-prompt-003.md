---
title: "Title Tag and Meta Description Optimization Prompt"
description: "A prompt that generates multiple optimized title tags and meta descriptions with CTR scoring for any webpage."
category: prompts
tags: ["seo", "title-tags", "meta-descriptions", "ctr-optimization"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt produces multiple title tag and meta description options optimized for both search engine relevance and click-through rate. Each option is scored and explained so you can make an informed selection without needing deep SEO expertise.

## Prompt

```
Optimize the title tag and meta description for this webpage:

**Page URL or Topic**: {{page_topic}}
**Primary Keyword**: {{primary_keyword}}
**Secondary Keywords**: {{secondary_keywords}}
**Page Type**: {{page_type}}
**Brand Name**: {{brand_name}}
**Current Title** (if updating): {{current_title}}
**Current Meta Description** (if updating): {{current_meta}}

Generate:

1. **5 Title Tag Options** (each under 60 characters):
   - Front-load the primary keyword
   - Include a power word or emotional trigger in at least 3 options
   - Use different formulas: number-based, question, how-to, comparison, direct benefit
   - For each, score: Keyword Relevance (1-5), CTR Appeal (1-5), SERP Differentiation (1-5)

2. **3 Meta Description Options** (each under 155 characters):
   - Include primary keyword naturally
   - Add a clear benefit or value proposition
   - End with a call to action or curiosity hook
   - For each, score on the same 1-5 criteria

3. **Recommended H1** that complements the chosen title without duplicating it exactly.

4. **Reasoning**: Explain which title + meta combination you recommend and why.

If a current title/meta was provided, explain specific improvements in the new versions.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `page_topic` | What the page is about | "comparison of CRM platforms" |
| `primary_keyword` | Main keyword to target | "best CRM software" |
| `secondary_keywords` | Supporting keywords | "CRM comparison, CRM tools 2026" |
| `page_type` | Content format | "comparison guide" |
| `brand_name` | Brand to include in title | "TechReview" |
| `current_title` | Existing title to improve | "CRM Software - Our Picks" |
| `current_meta` | Existing meta description | "Read about CRM software options" |

## Example Output

**Title Tag Options:**

| # | Title | Keyword | CTR | Differentiation |
|---|-------|---------|-----|-----------------|
| 1 | Best CRM Software 2026: 10 Tools Compared | 5 | 4 | 4 |
| 2 | Best CRM Software — Honest Reviews & Pricing | 5 | 5 | 5 |
| 3 | Which CRM Software Is Best? 2026 Buyer's Guide | 4 | 4 | 4 |

**Recommendation**: Option 2 balances keyword relevance with emotional appeal. "Honest Reviews" creates trust, and "Pricing" addresses a primary searcher concern that most competitors omit from their titles.

## Variations

1. **Bulk optimization** — Provide a list of 10+ pages with their current titles for batch optimization with consistency across the site.
2. **A/B test pairs** — Request exactly 2 options per page designed as A/B test pairs with distinct psychological appeals.
3. **E-commerce version** — Add product-specific variables like price, rating, and free shipping to incorporate into title and meta copy.

## Best Model

Claude Haiku 4.5 handles title and meta optimization efficiently for high-volume batch work. Use Sonnet 4.6 for strategic pages where nuanced competitive differentiation matters.
