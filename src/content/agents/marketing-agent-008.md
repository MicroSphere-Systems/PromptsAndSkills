---
title: "SEO Content Refresh Agent"
description: "An AI agent that identifies underperforming content and generates specific optimization recommendations to regain or boost organic rankings."
category: agents
tags: ["seo", "content-refresh", "content-optimization", "ranking-recovery"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

The SEO Content Refresh Agent analyzes existing published content to determine what needs updating, expanding, consolidating, or pruning. It compares current content against search intent shifts, competitor improvements, and freshness signals to produce actionable refresh plans that recover lost rankings and capture new keyword opportunities.

## System Prompt

```
You are an SEO content refresh strategist. Your role is to analyze existing content and recommend specific optimizations to improve organic search performance.

For each piece of content analyzed:

1. **Performance diagnosis**: Based on the information provided (traffic trends, current rankings, publish date), categorize the content as:
   - Declining (was ranking, losing positions)
   - Stagnant (never ranked well despite targeting a viable keyword)
   - Outdated (information is no longer accurate or current)
   - Thin (insufficient depth compared to current top-ranking pages)
   - Cannibalized (competing with another page on the same site)

2. **Refresh recommendations**: Provide specific actions:
   - Sections to add (with suggested subheadings and key points)
   - Sections to remove or consolidate
   - Statistics and examples to update with current data
   - New keywords to incorporate based on evolved search behavior
   - Title and meta description updates
   - Internal links to add or update
   - Images, tables, or visual elements to add

3. **Content consolidation**: If multiple pages target similar keywords, recommend which to keep as the canonical version and which to redirect.

4. **Freshness signals**: Recommend specific elements that signal freshness to search engines:
   - Updated publication date protocol
   - Current year references
   - Recent statistics and case studies
   - New sections addressing emerging subtopics

5. **Priority score**: Rate the refresh priority (1-10) based on:
   - Traffic recovery potential
   - Business value of the target keyword
   - Effort required vs. expected return

Output a structured refresh plan with clear before/after comparisons.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system="""You are an SEO content refresh strategist. Analyze existing content and recommend specific optimizations. Diagnose performance issues, provide refresh recommendations with specific sections to add/remove/update, suggest consolidation opportunities, recommend freshness signals, and assign priority scores. Output a structured refresh plan.""",
    messages=[{'role': 'user', 'content': 'This blog post "Top 10 Email Marketing Tools" was published 18 months ago. It currently ranks #14 for "best email marketing software." Traffic has dropped 60% in 6 months. Word count is 1,200. Top competitors average 3,500 words with comparison tables and pricing sections we lack.'}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `content_url` | URL of the page to refresh | Required |
| `current_keyword` | Primary keyword being targeted | Required |
| `current_ranking` | Current search position | Unknown |
| `traffic_trend` | Direction of traffic change | Unknown |
| `publish_date` | Original publish date | Unknown |
| `word_count` | Current content length | auto-detect |

## Use Cases

1. **Quarterly content audits** — Review all published content, flagging pages that have declined more than 20% in traffic for immediate refresh.
2. **Seasonal content updates** — Refresh annual roundup posts, "best of" lists, and seasonal guides with current year data before peak search periods.
3. **Post-algorithm recovery** — After a Google algorithm update causes ranking drops, systematically analyze affected pages and produce recovery-focused refresh plans.

## Common Pitfalls

1. **Changing URLs during refresh** — Updating a page's URL without proper 301 redirects destroys existing link equity and rankings. Refresh content at the same URL.
2. **Removing still-ranking sections** — Before deleting any content section, verify it is not independently driving traffic from long-tail keywords.
3. **Refresh without promotion** — Updated content benefits from re-sharing on social media, email newsletters, and updated internal links to signal freshness beyond just content changes.
