---
title: "SEO Content Brief Generator Prompt"
description: "A detailed prompt that produces writer-ready content briefs with keyword targets, outline structure, and competitive differentiation angles."
category: prompts
tags: ["seo", "content-brief", "content-planning", "writer-guidelines"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt creates comprehensive content briefs that give writers everything they need to produce SEO-optimized content on the first draft. It reduces revision cycles by specifying exact structure, keyword targets, and competitive angles upfront.

## Prompt

```
Create a detailed SEO content brief for the following:

**Target Keyword**: {{target_keyword}}
**Content Type**: {{content_type}}
**Target Audience**: {{audience}}
**Word Count Goal**: {{word_count}}
**Brand Voice**: {{tone}}

Include all of the following sections:

1. **Target Keywords**
   - Primary keyword and 5-8 secondary keywords to include naturally
   - Keyword density guidance (not a fixed percentage — just natural usage targets)

2. **Search Intent Analysis**
   - What the searcher expects to find
   - What format best serves this intent (listicle, guide, comparison, tutorial)

3. **Title Tag Recommendations**
   - 3 options under 60 characters, primary keyword front-loaded

4. **Meta Description**
   - 2 options under 155 characters with a CTA

5. **Content Outline**
   - H1 heading
   - 6-10 H2 sections with 2-3 H3 subsections each
   - Key points to cover under each heading
   - Approximate word count per section

6. **Competitive Edge**
   - What top-ranking content does well
   - What top-ranking content misses
   - Your unique angle to beat existing content

7. **Media Requirements**
   - Suggested images, screenshots, or diagrams
   - Table or comparison chart recommendations
   - Video or interactive element opportunities

8. **Internal Linking Targets**
   - 3-5 pages to link to from this content
   - 3-5 existing pages that should link back to this content

9. **Call to Action**
   - Recommended CTA placement and copy
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `target_keyword` | Primary SEO keyword | "email marketing automation" |
| `content_type` | Format of the content | "comprehensive guide" |
| `audience` | Target reader profile | "marketing managers at SMBs" |
| `word_count` | Target length | "2500-3500 words" |
| `tone` | Writing style | "professional but approachable" |

## Example Output

**Title Tag Options:**
1. Email Marketing Automation: The Complete 2026 Guide
2. Email Marketing Automation — Strategy, Tools & Setup
3. Master Email Marketing Automation in 7 Steps

**Search Intent**: The searcher wants to understand what email marketing automation is, how to implement it, and which tools to use. A comprehensive guide format with actionable steps is ideal.

**Outline:**
- H1: Email Marketing Automation: The Complete Guide
  - H2: What Is Email Marketing Automation? (~300 words)
  - H2: Why Email Automation Matters in 2026 (~250 words)
  - H2: 7 Essential Email Automation Workflows (~800 words)
    - H3: Welcome Series, H3: Abandoned Cart, H3: Re-engagement...

## Variations

1. **Quick brief** — Reduce to just title, outline, and keywords for experienced writers who need less guidance.
2. **Update brief** — Focus on what to add, change, or remove from existing content rather than starting from scratch.
3. **Cluster brief** — Generate briefs for 3-5 related articles in a topic cluster simultaneously to ensure they link together without cannibalizing.

## Best Model

Claude Sonnet 4.6 handles content briefs efficiently. Use Opus 4.6 when generating cluster briefs for multiple articles that need coordinated keyword targeting.
