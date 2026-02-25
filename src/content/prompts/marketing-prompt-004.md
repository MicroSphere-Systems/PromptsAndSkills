---
title: "Internal Linking Audit Prompt"
description: "A prompt that analyzes a list of pages and generates strategic internal linking recommendations to improve site architecture and SEO."
category: prompts
tags: ["seo", "internal-linking", "site-architecture", "link-audit"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt takes a content inventory and produces a prioritized internal linking action plan. It identifies orphan pages, authority flow opportunities, and topical connections that strengthen site architecture and help search engines understand content relationships.

## Prompt

```
Analyze the following content inventory and generate an internal linking strategy:

**Content Inventory**:
{{content_list}}

**Money Pages** (highest priority for link equity):
{{money_pages}}

**Current Topic Clusters** (if defined):
{{topic_clusters}}

For this analysis:

1. **Link Opportunity Map**: For each page in the inventory, identify 2-5 other pages it should link to, with:
   - Recommended anchor text (natural, varied, keyword-relevant)
   - Placement suggestion (intro, body, conclusion, sidebar)
   - Priority level (high/medium/low)
   - Reasoning for the connection

2. **Orphan Page Detection**: Identify pages that likely receive zero or minimal internal links and recommend 3+ sources that should link to them.

3. **Authority Flow Analysis**: Map the ideal link equity flow from high-authority informational pages to commercial money pages. Show the linking chain.

4. **Topic Cluster Reinforcement**: Group pages into clusters and ensure each cluster has:
   - A pillar page that links to all cluster pages
   - Cluster pages that link back to the pillar
   - Cross-links between related cluster pages

5. **Quick Wins**: List the top 10 links to add immediately, sorted by expected SEO impact.

Output as structured tables with clear action items.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `content_list` | List of pages with URLs, titles, topics | "/blog/crm-guide (CRM overview), /blog/salesforce-review (Salesforce), /product/pricing (Pricing)" |
| `money_pages` | Commercial pages needing authority | "/product/pricing, /demo, /free-trial" |
| `topic_clusters` | Existing topic groupings | "CRM cluster: guide, reviews, comparisons" |

## Example Output

**Top 10 Quick-Win Internal Links:**

| Source Page | Destination | Anchor Text | Priority |
|------------|-------------|-------------|----------|
| /blog/crm-guide | /product/pricing | see our pricing plans | High |
| /blog/salesforce-review | /blog/crm-guide | complete CRM guide | High |
| /blog/crm-guide | /blog/salesforce-review | Salesforce deep-dive | Medium |

**Orphan Pages Detected:**
- /blog/crm-implementation-checklist — No pages currently link here. Recommended sources: /blog/crm-guide, /blog/choosing-a-crm, /blog/crm-migration.

## Variations

1. **New content integration** — Provide one new article and the full inventory; get recommendations for where to place links to and from the new content.
2. **Competitive analysis** — Include competitor site structures to identify linking patterns you should replicate.
3. **Pruning focus** — Identify pages that receive too many internal links relative to their value and recommend link redistribution.

## Best Model

Claude Sonnet 4.6 handles content inventories of up to 100 pages effectively. For larger sites, break the inventory into topic clusters and run separate analyses.
