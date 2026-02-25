---
title: "Keyword Research Prompt for Niche Markets"
description: "A structured prompt that generates comprehensive keyword lists with search intent classification and priority scoring for any niche."
category: prompts
tags: ["seo", "keyword-research", "search-intent", "niche-marketing"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt generates detailed keyword research output organized by search intent, complete with volume estimates, competition assessments, and content type recommendations. It is designed for marketers who need quick, actionable keyword lists without access to expensive SEO tools.

## Prompt

```
You are an SEO keyword research expert. Research keywords for the following niche:

**Niche/Topic**: {{niche}}
**Target Audience**: {{audience}}
**Business Goal**: {{goal}}
**Current Domain Authority**: {{domain_authority}}

Deliver the following:

1. **Primary keywords** (10-15): Include estimated monthly search volume (low/medium/high), competition level, search intent (informational/commercial/transactional/navigational), and recommended content type.

2. **Long-tail keywords** (10-15): Lower competition variations with 3+ words that a site with DA {{domain_authority}} can realistically rank for.

3. **Question keywords** (5-8): "How to," "What is," "Why does" format keywords for featured snippet targeting.

4. **Commercial keywords** (5-8): Buyer-intent keywords with modifiers like "best," "top," "review," "vs," "alternative."

5. **Emerging keywords** (3-5): Trending or rising topics in this niche worth targeting early.

Format each section as a table with columns: Keyword | Volume | Competition | Intent | Priority (1-10).

End with a 3-sentence strategic summary of which keywords to target first and why.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `niche` | The industry or topic to research | "sustainable fashion e-commerce" |
| `audience` | Who you want to reach | "eco-conscious millennials aged 25-35" |
| `goal` | Primary business objective | "drive organic traffic to product pages" |
| `domain_authority` | Site's estimated DA score | "25" |

## Example Output

**Primary Keywords**

| Keyword | Volume | Competition | Intent | Priority |
|---------|--------|-------------|--------|----------|
| sustainable fashion brands | High | High | Commercial | 7 |
| eco-friendly clothing | High | Medium | Commercial | 9 |
| organic cotton t-shirts | Medium | Low | Transactional | 10 |
| ethical fashion guide | Medium | Medium | Informational | 8 |

**Strategic Summary**: Start with mid-volume, low-competition transactional keywords like "organic cotton t-shirts" where your DA 25 site can rank on page one within 3-6 months. Build topical authority through informational content targeting question keywords. Once traffic grows, expand to higher-competition commercial terms.

## Variations

1. **Local SEO version** — Add a `location` variable and request "[keyword] + [city]" combinations with local pack analysis.
2. **Competitor-focused version** — Add a `competitors` variable and request keywords where competitors rank but you do not.
3. **Seasonal version** — Add a `season` variable and request keywords with seasonal search trends and optimal publishing windows.

## Best Model

Claude Sonnet 4.6 provides the best balance of depth and speed for keyword research. For highly competitive niches requiring deeper strategic analysis, upgrade to Claude Opus 4.6.
