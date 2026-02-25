---
title: "SEO Competitor Gap Analysis Prompt"
description: "A prompt that identifies keyword and content gaps between your site and competitors, revealing untapped organic search opportunities."
category: prompts
tags: ["seo", "competitor-analysis", "content-gap", "keyword-gap"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt performs a structured competitive analysis that reveals exactly where competitors outperform you in organic search and where realistic opportunities exist to close the gap. It translates competitive intelligence into a prioritized content action plan.

## Prompt

```
Perform an SEO competitor gap analysis:

**Your Site**: {{your_site}}
**Your DA**: {{your_da}}
**Your Top Topics**: {{your_topics}}

**Competitors**:
{{competitors}}

Analyze and deliver:

1. **Keyword Gaps** (keywords competitors rank for that you don't):
   - 10 high-priority keywords (high volume, achievable difficulty for your DA)
   - 10 long-tail keywords (lower volume but very low competition)
   - For each: estimated volume, competition, which competitor ranks, and recommended content type

2. **Content Gaps** (topics competitors cover that you don't):
   - List 10 content topics with the competitor URL as reference
   - Note what makes their content rank (length, format, depth, freshness)
   - Suggest how to create a superior version

3. **Format Gaps** (content formats competitors use that you lack):
   - Templates, calculators, tools, videos, infographics
   - Which formats drive their most links and engagement

4. **Weakness Opportunities** (areas where competitor content is thin or outdated):
   - 5 topics where competitors rank with weak content you can easily beat
   - Specific improvements to make (more depth, better examples, updated data)

5. **90-Day Action Plan**:
   - Month 1: Quick wins (low-competition gaps to fill immediately)
   - Month 2: Strategic content (medium-competition opportunities)
   - Month 3: Authority plays (high-value content investments)

Format all keyword data as tables. End with a competitive positioning statement.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `your_site` | Your website description | "B2B SaaS project management blog" |
| `your_da` | Your domain authority | "35" |
| `your_topics` | Topics you currently cover | "project management, team productivity, agile methodology" |
| `competitors` | Competitor sites with DA | "Asana blog (DA 85), Monday.com blog (DA 78), Trello blog (DA 80)" |

## Example Output

**High-Priority Keyword Gaps:**

| Keyword | Volume | Competition | Competitor Ranking | Content Type |
|---------|--------|-------------|-------------------|--------------|
| project timeline template | Medium | Low | Asana (#3) | Template + guide |
| sprint planning meeting agenda | Low | Very Low | None rank well | Blog post |
| project risk assessment template | Medium | Low | Monday.com (#5) | Downloadable template |

**Weakness Opportunity**: Monday.com ranks #8 for "project status report template" with a 400-word page from 2023. A comprehensive 2,000-word guide with downloadable templates and examples could easily overtake this position.

## Variations

1. **Single competitor deep dive** — Focus analysis on one competitor only for maximum depth and actionable specificity.
2. **SERP feature analysis** — Add analysis of which competitors appear in featured snippets, People Also Ask, and video carousels.
3. **Backlink gap** — Extend analysis to include sites linking to competitors but not to you, identifying potential outreach targets.

## Best Model

Claude Opus 4.6 delivers the most strategic and nuanced competitive analysis. Sonnet 4.6 works well for straightforward gap identification without deep strategic layers.
