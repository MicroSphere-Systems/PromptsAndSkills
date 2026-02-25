---
title: "Content Refresh and Update Planning Prompt"
description: "A prompt that analyzes outdated or underperforming content and generates a specific refresh plan to recover lost rankings."
category: prompts
tags: ["seo", "content-refresh", "content-update", "ranking-recovery"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt takes information about an underperforming page and generates a detailed, actionable refresh plan. It identifies exactly what to add, update, remove, and restructure to bring the content back to competitive standards and recover lost rankings.

## Prompt

```
Create a content refresh plan for this underperforming page:

**Page URL/Title**: {{page_title}}
**Target Keyword**: {{target_keyword}}
**Current Ranking**: {{current_ranking}}
**Previous Best Ranking**: {{best_ranking}}
**Publish Date**: {{publish_date}}
**Current Word Count**: {{word_count}}
**Traffic Trend**: {{traffic_trend}}
**Top 3 Competitors for This Keyword**: {{competitors}}

Generate a comprehensive refresh plan:

1. **Diagnosis**: Why is this content underperforming? Evaluate:
   - Content freshness (outdated stats, old examples, missing recent developments)
   - Content depth (insufficient coverage vs. top competitors)
   - Search intent alignment (does the format match what Google rewards?)
   - Technical issues (page speed, mobile experience, indexation)

2. **Content Additions** (be specific):
   - New sections to add (with suggested H2/H3 headings and key points)
   - Updated statistics and data points needed
   - New examples or case studies to include
   - Missing subtopics that competitors cover

3. **Content Removals**:
   - Outdated sections to remove or replace
   - Redundant paragraphs to consolidate
   - Off-topic tangents to cut

4. **Structural Changes**:
   - Recommended new outline with section order
   - Format changes (add comparison table, numbered steps, visual elements)
   - Improved introduction with updated hook

5. **On-Page SEO Updates**:
   - New title tag and meta description
   - Updated H2/H3 tags with current keyword variations
   - New internal links to add
   - Image alt text updates

6. **Updated Word Count Target**: Based on competitive analysis.

7. **Expected Timeline**: When to expect ranking improvements after refresh.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `page_title` | Title or URL of the page | "Best Project Management Software 2024" |
| `target_keyword` | Primary keyword | "best project management software" |
| `current_ranking` | Current SERP position | "#18 (page 2)" |
| `best_ranking` | Highest ranking achieved | "#4 (12 months ago)" |
| `publish_date` | Original publish date | "March 2024" |
| `word_count` | Current word count | "1,800 words" |
| `traffic_trend` | Direction of traffic | "Down 65% over 6 months" |
| `competitors` | Top-ranking pages | "Forbes (#1, 4500 words), G2 (#2, 6000 words), PCMag (#3, 3800 words)" |

## Example Output

**Diagnosis**: Content is underperforming because: (1) Title references 2024, signaling outdated content to both users and Google; (2) Word count of 1,800 is far below the competitive average of 4,700; (3) Missing comparison tables and pricing data that all top-3 competitors include; (4) No FAQ section despite "People Also Ask" dominating the SERP.

**Priority Additions**:
- H2: "Project Management Software Comparison Table" — side-by-side feature/pricing matrix (competitors all have this)
- H2: "How to Choose the Right PM Tool" — buyer's guide section targeting long-tail queries
- H2: "FAQ" — address top 5 PAA questions for featured snippet eligibility

## Variations

1. **Bulk refresh prioritization** — Provide 10+ pages with their metrics and get a prioritized refresh queue ranked by traffic recovery potential vs. effort.
2. **Seasonal refresh** — Focus specifically on updating year-specific content (annual roundups, trend predictions) for the new year.
3. **Competitive leapfrog** — Focus entirely on identifying what the #1 result does that your page does not, and build a plan to surpass it.

## Best Model

Claude Sonnet 4.6 balances analytical depth with practical action items. Use Opus 4.6 for strategic refresh plans that need to consider site-wide content architecture implications.
