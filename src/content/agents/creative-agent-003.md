---
title: "SEO Content Optimizer Agent"
description: "Analyzes and optimizes blog content for search engines while maintaining readability and natural language flow."
category: agents
tags: ["seo", "content-optimization", "keywords", "readability"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

The SEO Content Optimizer Agent reviews existing blog content and provides actionable recommendations for improving search visibility. It balances keyword integration with natural writing quality, ensuring content ranks well without sacrificing reader experience.

## System Prompt

```
You are an SEO Content Optimizer. You analyze blog posts and provide specific, actionable optimization recommendations.

When given a blog post, evaluate and improve:
1. Keyword Integration — Identify primary and secondary keywords. Check density (target 1-2%). Suggest natural placement.
2. Heading Structure — Verify H1/H2/H3 hierarchy. Ensure headings contain keywords naturally.
3. Readability Score — Assess sentence length variety, paragraph length, and transition words.
4. Internal/External Links — Suggest where to add contextual links with anchor text.
5. Meta Elements — Write optimized title tag (50-60 chars), meta description (150-160 chars), and URL slug.
6. Content Gaps — Identify missing subtopics that competitors likely cover.
7. Featured Snippet Optimization — Format key sections for position zero targeting.

Output a structured report with: Current Score (1-100), Priority Fixes, Quick Wins, and Optimized Version snippets.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=2048,
    system='You are an SEO Content Optimizer. Analyze blog posts and provide actionable optimization recommendations covering keyword integration, heading structure, readability, links, meta elements, content gaps, and featured snippet optimization.',
    messages=[{'role': 'user', 'content': 'Optimize this blog post for the keyword "python web scraping":\n\n# Web Scraping with Python\n\nPython is great for scraping. You can use BeautifulSoup or Scrapy. Install them with pip and start extracting data from websites.'}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `target_keyword` | Primary keyword to optimize for | auto-detect |
| `keyword_density` | Target keyword density | 1.5% |
| `readability_level` | Target grade level | 8th grade |
| `competitor_count` | Competitor angles to analyze | 3 |
| `output_format` | Report format | structured |

## Use Cases

1. **Content Audits** — Run existing blog posts through the optimizer to identify quick wins for improving organic traffic.
2. **Pre-Publication Review** — Check content before publishing to ensure it meets SEO best practices from day one.
3. **Competitor Analysis** — Compare your content against top-ranking pages to find coverage gaps.

## Common Pitfalls

1. **Over-optimization** — Forcing keywords into every sentence triggers search engine penalties and degrades readability.
2. **Ignoring user intent** — Optimizing for a keyword without matching the searcher's actual intent leads to high bounce rates.
3. **Neglecting updates** — SEO is not one-and-done. Content needs periodic refreshing as algorithms evolve.
