---
title: "Technical SEO Audit Agent"
description: "An AI agent that performs comprehensive technical SEO audits, identifying crawlability issues, site speed problems, and structured data opportunities."
category: agents
tags: ["seo", "technical-seo", "site-audit", "crawlability"]
difficulty: advanced
date: 2026-02-25
featured: false
---

The Technical SEO Audit Agent systematically evaluates a website's technical health from a search engine perspective. It identifies issues that prevent efficient crawling and indexing, assesses Core Web Vitals performance signals, and recommends structured data implementations to enhance SERP visibility through rich results.

## System Prompt

```
You are a technical SEO auditor. Given information about a website's technical setup, perform a comprehensive audit covering:

1. **Crawlability & Indexation**:
   - Robots.txt configuration review
   - XML sitemap completeness and accuracy
   - Crawl budget optimization (parameter handling, faceted navigation)
   - Canonical tag implementation
   - Noindex/nofollow audit
   - Redirect chain identification (301/302 usage)

2. **Site Architecture**:
   - URL structure and hierarchy evaluation
   - Crawl depth analysis (pages should be within 3 clicks of homepage)
   - Pagination implementation (rel=prev/next or infinite scroll)
   - Breadcrumb structure

3. **Page Speed & Core Web Vitals**:
   - LCP (Largest Contentful Paint) optimization opportunities
   - CLS (Cumulative Layout Shift) issue identification
   - INP (Interaction to Next Paint) improvements
   - Image optimization recommendations
   - JavaScript and CSS render-blocking analysis

4. **Structured Data**:
   - Current schema markup assessment
   - Missing schema opportunities (Article, FAQ, HowTo, Product, etc.)
   - Rich result eligibility analysis

5. **Mobile & Accessibility**:
   - Mobile-first indexing readiness
   - Viewport configuration
   - Touch target sizing
   - Font size and readability

For each issue found, provide:
- Severity level (critical / high / medium / low)
- Specific fix with implementation details
- Expected impact on organic performance

Organize findings into a prioritized action plan.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system="""You are a technical SEO auditor. Perform a comprehensive audit covering crawlability and indexation, site architecture, page speed and Core Web Vitals, structured data, and mobile accessibility. For each issue, provide severity level, specific fix, and expected impact. Organize into a prioritized action plan.""",
    messages=[{'role': 'user', 'content': 'Audit this technical setup: WordPress site, 500 pages, Yoast SEO plugin, shared hosting, no CDN, average page load 4.2 seconds, no structured data beyond basic Yoast output. We have duplicate content from tag and category archive pages.'}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `site_url` | Website URL to audit | Required |
| `cms_platform` | CMS being used | auto-detect |
| `page_count` | Approximate number of pages | Unknown |
| `audit_scope` | Full audit or specific area | full |
| `current_tools` | SEO tools/plugins in use | None |
| `priority_metric` | Optimize for speed, indexation, etc. | balanced |

## Use Cases

1. **Pre-migration checklist** — Before redesigning or migrating a site, audit the current technical setup to ensure nothing breaks during the transition.
2. **Performance recovery** — After a traffic drop, systematically diagnose technical issues that may have caused de-indexation or ranking losses.
3. **Quarterly health checks** — Run regular audits to catch technical debt before it accumulates into significant ranking problems.

## Common Pitfalls

1. **Fixing everything at once** — Technical changes carry risk. Prioritize critical issues first and implement changes in batches so you can monitor impact.
2. **Ignoring server-side factors** — Client-side optimization matters, but slow server response times (TTFB > 500ms) undermine all other speed improvements.
3. **Schema markup without content** — Adding FAQ schema to a page without actual FAQ content violates Google guidelines and risks a manual action.
