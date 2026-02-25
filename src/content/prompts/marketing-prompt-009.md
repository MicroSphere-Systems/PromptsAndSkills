---
title: "Local SEO Google Business Profile Optimization Prompt"
description: "A prompt that generates a complete optimization plan for Google Business Profile listings to improve local search visibility and map pack rankings."
category: prompts
tags: ["seo", "local-seo", "google-business-profile", "local-search"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt produces a complete Google Business Profile optimization plan that covers every configurable element of a GBP listing. It is designed for local businesses that want to maximize their visibility in Google Maps and local pack results without hiring a local SEO specialist.

## Prompt

```
Create a Google Business Profile optimization plan for:

**Business Name**: {{business_name}}
**Business Type**: {{business_type}}
**Location**: {{location}}
**Service Area**: {{service_area}}
**Current Review Count**: {{review_count}}
**Current Rating**: {{rating}}
**Website URL**: {{website}}
**Top 3 Local Competitors**: {{competitors}}

Optimize every element:

1. **Business Information**:
   - Recommend primary and secondary categories (be specific to the business type)
   - Optimized business description (750 characters max, include keywords naturally)
   - Attributes to enable (accessibility, amenities, payments, etc.)
   - Service/product catalog recommendations

2. **Photo Strategy**:
   - Types of photos to upload (logo, cover, interior, exterior, team, products, action shots)
   - Quantity recommendations (minimum and ideal)
   - Photo naming and geotagging tips
   - Upload frequency schedule

3. **Google Posts Strategy**:
   - Weekly posting schedule with content types (updates, offers, events)
   - 4 sample Google Post drafts with CTAs
   - Optimal posting times for {{business_type}}

4. **Review Strategy**:
   - Review generation tactics (3-5 specific methods)
   - Email/SMS review request template
   - Response templates: positive (2 variations), negative (2 variations), neutral (1)
   - Review velocity goals based on competitor analysis

5. **Q&A Section**:
   - 10 pre-seeded questions and answers to add proactively
   - Questions should target common search queries for {{business_type}}

6. **Local Keyword Targets**:
   - 10 "[service] + [location]" keywords to target
   - Recommendations for incorporating these into the GBP listing and website
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `business_name` | Name of the business | "Apex Dental Care" |
| `business_type` | Industry/category | "general dentist" |
| `location` | Business address city | "Austin, TX" |
| `service_area` | Areas served | "Austin, Round Rock, Cedar Park, Georgetown" |
| `review_count` | Number of current reviews | "47" |
| `rating` | Current star rating | "4.3" |
| `website` | Business website | "https://apexdentalcare.com" |
| `competitors` | Local competitors | "Smile Austin (4.8, 230 reviews), Downtown Dental (4.5, 180 reviews)" |

## Example Output

**Primary Category**: Dentist
**Secondary Categories**: Cosmetic Dentist, Emergency Dental Service, Teeth Whitening Service

**Business Description**: Apex Dental Care provides comprehensive dental services in Austin, TX, including general dentistry, cosmetic procedures, and emergency care. Serving families in Austin, Round Rock, and Cedar Park since 2015, our experienced team offers everything from routine cleanings to dental implants and Invisalign. Same-day emergency appointments available. Accepting most insurance plans.

**Review Request Email Template**: "Hi [Name], thank you for visiting Apex Dental Care today! We hope your experience was great. If you have 30 seconds, we would truly appreciate a Google review — it helps other Austin families find quality dental care. [Link] Thank you!"

## Variations

1. **Multi-location** — Optimize GBP for 3+ locations simultaneously with location-specific differentiation strategies.
2. **New business launch** — Focus on building a GBP from zero, including initial photo requirements and strategies to get the first 20 reviews quickly.
3. **Reputation repair** — Focus on responding to negative reviews and building a strategy to improve a sub-4.0 rating.

## Best Model

Claude Sonnet 4.6 produces comprehensive GBP optimization plans. Haiku 4.5 works well for generating review response templates and Google Post drafts at scale.
