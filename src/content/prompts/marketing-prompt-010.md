---
title: "Link Building Outreach Email Prompt"
description: "A prompt that generates personalized, high-converting outreach emails for link building campaigns with follow-up sequences."
category: prompts
tags: ["seo", "link-building", "outreach-emails", "backlinks"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt crafts personalized link building outreach emails that avoid the spammy template feel most recipients instantly delete. Each email references the prospect's actual content, provides a genuine value proposition, and includes a natural follow-up sequence.

## Prompt

```
Write a personalized link building outreach email sequence for:

**Our Content**: {{our_content}}
**Content Value Prop**: {{value_prop}}
**Outreach Strategy**: {{strategy}}
**Prospect Type**: {{prospect_type}}
**Prospect's Content**: {{prospect_content}}
**Tone**: {{tone}}

Generate:

1. **Initial Outreach Email**:
   - Subject line (3 options, tested to achieve high open rates)
   - Personalized opening referencing the prospect's specific content
   - Brief, genuine compliment or observation about their work
   - Value proposition: why linking to our content benefits their readers
   - Soft CTA (not demanding, not pushy)
   - Total length: 100-150 words maximum

2. **Follow-up #1** (5 days later):
   - New subject line or reply to original thread
   - Reference the original email briefly
   - Add new value or angle not mentioned in the first email
   - Even softer CTA
   - Total length: 75-100 words

3. **Follow-up #2** (7 days after follow-up #1):
   - Breakup email format (final attempt, no pressure)
   - Offer alternative collaboration (guest post, expert quote, resource share)
   - Total length: 50-75 words

4. **Personalization Framework**:
   - 5 specific personalization hooks to research for each prospect
   - Where to find this information (their blog, LinkedIn, Twitter, podcast)
   - How to weave it into the email naturally

5. **Subject Line A/B Test Variants**:
   - Curiosity-based, benefit-based, direct-ask, and mutual connection angles
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `our_content` | Content we want linked | "2026 State of Remote Work Report (original survey of 2,000 workers)" |
| `value_prop` | Why prospects should care | "Original data their audience would find valuable" |
| `strategy` | Type of link building | "Resource page link building" |
| `prospect_type` | Who we are emailing | "HR and workplace bloggers" |
| `prospect_content` | Their relevant content | "Blog post about remote work trends" |
| `tone` | Email voice | "Friendly and professional, not salesy" |

## Example Output

**Subject Lines:**
1. Your remote work article + some new data
2. Found something for your readers
3. Quick question about your remote work coverage

**Initial Email:**
Hi [Name],

I just read your piece on [specific article title] — your point about [specific insight from their article] really resonated with our team.

We recently published our 2026 State of Remote Work Report based on a survey of 2,000 workers. It includes data on [2-3 relevant stats that complement their article] that your readers might find useful.

Would it make sense to add it as a resource in your article? Either way, keep up the great work on [their blog name].

Best,
[Your name]

## Variations

1. **Broken link outreach** — Modify the template to alert the prospect about a broken link on their page and suggest your content as a replacement.
2. **Skyscraper outreach** — Focus on showing how your content improves upon the resource they currently link to.
3. **HARO-style expert pitch** — Position yourself as an expert source for a journalist working on a story.

## Best Model

Claude Sonnet 4.6 writes natural, personalized outreach emails. Haiku 4.5 works for generating volume variations when you have many prospects to contact.
