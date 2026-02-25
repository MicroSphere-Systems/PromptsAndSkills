---
title: "Content Creation Skill Pack"
description: "Enterprise AI skill pack for marketing teams — blog posts, social media, email campaigns, and SEO content"
category: "enterprise"
tags: ["marketing", "content", "enterprise", "seo", "social-media"]
difficulty: "intermediate"
date: 2026-02-24
featured: false
---

# Content Creation Skill Pack

A collection of AI skills and prompts designed for marketing and content teams. Deploy across your organization to standardize content quality and accelerate production.

## What's Included

### 1. Blog Post Generator

**Use case:** Draft SEO-optimized blog posts from a topic brief.

```
System prompt for content team members:

You are a blog post writer for [COMPANY]. Write in our brand voice:
- Professional but approachable
- Data-driven (cite statistics when available)
- Action-oriented (every post ends with clear next steps)

Given a topic brief, produce:
1. SEO-optimized title (under 60 characters)
2. Meta description (under 155 characters)
3. Full blog post (1000-1500 words)
4. 3 social media snippets for promotion

Structure: Hook → Problem → Solution → Evidence → CTA
```

### 2. Social Media Content Calendar

**Use case:** Generate a week's worth of social posts from key themes.

```
Create a 5-day social media content calendar based on these themes:
{{WEEKLY_THEMES}}

For each day, provide:
- LinkedIn post (professional, 150-200 words, include a question for engagement)
- Twitter/X post (concise, under 280 characters, include relevant hashtags)
- Suggested image description for the design team

Maintain consistent messaging across platforms while adapting tone:
- LinkedIn: thought leadership and industry insights
- Twitter/X: punchy, conversational, timely
```

### 3. Email Campaign Writer

**Use case:** Write email sequences for product launches, nurture campaigns, and announcements.

```
Write a {{NUM_EMAILS}}-email sequence for: {{CAMPAIGN_GOAL}}

Target audience: {{AUDIENCE}}

For each email:
- Subject line (A/B test: provide 2 options)
- Preview text (under 90 characters)
- Body (under 200 words, mobile-friendly short paragraphs)
- CTA button text
- Send timing recommendation (day of week + time)

Sequence arc: Awareness → Interest → Desire → Action
```

### 4. SEO Content Brief Generator

**Use case:** Create detailed content briefs that writers can follow to produce SEO-ranked articles.

```
Create an SEO content brief for the keyword: {{TARGET_KEYWORD}}

Include:
1. Primary keyword and 5-10 secondary keywords
2. Search intent analysis (informational/commercial/transactional)
3. Recommended word count based on competing content
4. Outline with H2/H3 headings that cover the topic comprehensively
5. Key questions to answer (from "People Also Ask")
6. Internal linking suggestions
7. Competitor content gaps (what existing articles miss)
```

## Deployment Guide

1. **Customize the brand voice** — Replace placeholder voice guidelines with your company's tone
2. **Create a shared prompt library** — Store all templates in a team-accessible location
3. **Train the team** — Run a 30-minute session showing how to use each template
4. **Establish review flow** — AI drafts should be reviewed by a human editor before publishing
5. **Iterate monthly** — Collect feedback and update templates based on what works
