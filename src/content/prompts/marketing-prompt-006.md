---
title: "Technical SEO Checklist Generator Prompt"
description: "A prompt that generates a comprehensive technical SEO audit checklist customized to your CMS, site size, and technical setup."
category: prompts
tags: ["seo", "technical-seo", "audit-checklist", "site-health"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt generates a customized technical SEO audit checklist tailored to your specific technology stack and site complexity. Instead of a generic checklist, it prioritizes issues based on your CMS, hosting environment, and known technical constraints.

## Prompt

```
Generate a customized technical SEO audit checklist for:

**CMS/Platform**: {{cms}}
**Hosting**: {{hosting}}
**Site Size**: {{page_count}} pages
**Known Issues**: {{known_issues}}
**Current Speed Score**: {{speed_score}}
**JavaScript Rendering**: {{js_rendering}}

Create a prioritized checklist organized by:

1. **Critical Issues** (blocking crawling or indexing):
   - [ ] Robots.txt allows crawling of important pages
   - [ ] XML sitemap is complete, valid, and submitted
   - [ ] No accidental noindex tags on key pages
   - [ ] Canonical tags point to correct URLs
   - [ ] No redirect chains longer than 2 hops
   - Add CMS-specific critical checks for {{cms}}

2. **High Priority** (significantly impacting rankings):
   - [ ] Core Web Vitals pass thresholds (LCP < 2.5s, CLS < 0.1, INP < 200ms)
   - [ ] Mobile-friendly and responsive
   - [ ] HTTPS on all pages with no mixed content
   - [ ] Proper hreflang for international content (if applicable)
   - [ ] Clean URL structure without parameters or duplicates
   - Add hosting-specific checks for {{hosting}}

3. **Medium Priority** (optimization opportunities):
   - [ ] Schema markup on key page types
   - [ ] Image optimization (WebP, lazy loading, alt text)
   - [ ] Internal linking structure within 3 clicks of homepage
   - [ ] Breadcrumb navigation implemented
   - [ ] 404 page returns proper status code

4. **Low Priority** (nice-to-have improvements):
   - [ ] HTML sitemap for users
   - [ ] Favicon and touch icons
   - [ ] Print stylesheet
   - [ ] RSS feed for blog content

For each item, include:
- What to check and how
- Common {{cms}}-specific gotchas
- Fix difficulty (easy/moderate/hard)
- Expected impact (high/medium/low)
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `cms` | Content management system | "WordPress with Yoast SEO" |
| `hosting` | Hosting provider/type | "WP Engine managed WordPress" |
| `page_count` | Total number of pages | "1,200" |
| `known_issues` | Issues already identified | "slow load times, duplicate content from tag pages" |
| `speed_score` | PageSpeed Insights score | "45 mobile, 72 desktop" |
| `js_rendering` | JavaScript framework usage | "minimal JS, no SPA framework" |

## Example Output

**Critical Issues for WordPress + Yoast:**

| Check | How to Verify | WordPress Gotcha | Fix Difficulty | Impact |
|-------|---------------|-------------------|----------------|--------|
| XML Sitemap | Yoast > Settings > Sitemap | Yoast may include noindexed post types | Easy | High |
| Canonical tags | View source on 10 sample pages | Plugin conflicts can output duplicate canonicals | Moderate | High |
| Robots.txt | site.com/robots.txt | WP default may block /wp-admin CSS needed for rendering | Easy | High |

## Variations

1. **Shopify-specific** — Replace CMS variable with Shopify and get e-commerce technical SEO checks including product schema, collection page handling, and Liquid template optimization.
2. **Post-migration audit** — Add a `previous_url_structure` variable to include redirect mapping verification and old URL monitoring.
3. **JavaScript SPA audit** — For React/Next.js/Vue sites, add server-side rendering checks, dynamic rendering setup, and JavaScript crawling verification.

## Best Model

Claude Sonnet 4.6 produces thorough technical checklists. For sites with complex JavaScript rendering or international multi-site setups, Opus 4.6 provides more nuanced recommendations.
