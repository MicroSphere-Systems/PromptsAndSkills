---
title: "Schema Markup Generator Prompt"
description: "A prompt that generates valid JSON-LD structured data markup for any content type, ready to paste into your page's HTML."
category: prompts
tags: ["seo", "schema-markup", "json-ld", "structured-data"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt produces copy-paste-ready JSON-LD schema markup that complies with Google's structured data guidelines. It handles the most common schema types and includes validation notes to help you avoid implementation errors.

## Prompt

```
Generate JSON-LD structured data markup for:

**Page Type**: {{page_type}}
**Page Title**: {{page_title}}
**Page URL**: {{page_url}}
**Content Summary**: {{content_summary}}
**Author/Organization**: {{author}}
**Date Published**: {{date_published}}
**Additional Data**: {{additional_data}}

Requirements:
1. Use JSON-LD format wrapped in a <script type="application/ld+json"> tag.
2. Select the most specific schema.org type for this content.
3. Include ALL required properties per Google's Rich Results documentation.
4. Include recommended properties that improve rich result eligibility.
5. Nest related schemas properly (e.g., author as Person within Article).
6. If the page qualifies for multiple schema types (e.g., Article + FAQ), combine them using @graph.

Output:
- The complete JSON-LD code block ready to paste
- Which Google rich result this enables (if any)
- Required properties checklist with notes on what needs real data
- Instructions for testing with Google's Rich Results Test
- Any warnings or caveats about the implementation
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `page_type` | Type of content | "blog post with FAQ section" |
| `page_title` | Page heading | "How to Choose a CRM in 2026" |
| `page_url` | Full page URL | "https://example.com/blog/choose-crm" |
| `content_summary` | Brief description | "A guide comparing 8 CRM platforms for small businesses" |
| `author` | Author or organization name | "Jane Smith, TechReview.com" |
| `date_published` | Publication date | "2026-02-20" |
| `additional_data` | Extra context | "Has 5 FAQ questions, includes product comparison table" |

## Example Output

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Choose a CRM in 2026",
      "author": {
        "@type": "Person",
        "name": "Jane Smith"
      },
      "datePublished": "2026-02-20",
      "publisher": {
        "@type": "Organization",
        "name": "TechReview.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://example.com/logo.png"
        }
      },
      "mainEntityOfPage": "https://example.com/blog/choose-crm"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best CRM for small businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best CRM depends on your needs..."
          }
        }
      ]
    }
  ]
}
</script>
```

**Enables**: Article rich result (author, date) + FAQ rich result (expandable Q&A in SERP).

## Variations

1. **E-commerce product** — Use `page_type: product` with price, availability, reviews, and offer data for Product rich results.
2. **Recipe** — Use `page_type: recipe` with cooking time, ingredients, nutrition, and rating for Recipe rich results.
3. **Local business** — Use `page_type: local business` with address, hours, phone, and geo coordinates for Local Business rich results.

## Best Model

Claude Haiku 4.5 generates valid schema markup quickly for standard types. Use Sonnet 4.6 for complex multi-type schemas or unusual content types.
