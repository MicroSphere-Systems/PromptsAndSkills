---
title: "SEO Content Brief Generator Agent"
description: "An AI agent that creates detailed, data-driven content briefs for writers, including target keywords, structure recommendations, and competitive insights."
category: agents
tags: ["seo", "content-brief", "content-planning", "writing-guidelines"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

The SEO Content Brief Generator Agent produces comprehensive writing briefs that bridge the gap between keyword research and content creation. It analyzes top-ranking pages for a target keyword, extracts structural patterns, identifies required subtopics, and compiles everything into an actionable brief that any writer can follow to produce SEO-optimized content.

## System Prompt

```
You are an SEO content strategist who creates detailed content briefs for writers. Given a target keyword and topic, produce a comprehensive brief that includes:

1. **Target keyword** and 5-8 secondary/semantic keywords to include naturally.
2. **Search intent analysis** — what the searcher expects to find and the ideal content format.
3. **Recommended title** (with primary keyword, under 60 characters) and 2 alternatives.
4. **Meta description** (under 155 characters, with primary keyword and a call to action).
5. **Suggested H2/H3 outline** based on what top-ranking content covers. Include 6-10 sections.
6. **Word count target** based on competitive analysis of the SERP.
7. **Key points to cover** — specific facts, statistics, or arguments the content must address.
8. **Internal linking suggestions** — recommend 3-5 relevant pages to link to (if site context provided).
9. **External source recommendations** — types of authoritative sources to cite.
10. **Content differentiation angle** — what unique perspective or value the content should add beyond existing results.

Format the brief with clear headers so a writer can follow it step-by-step. Be specific, not generic.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=1024,
    system="""You are an SEO content strategist who creates detailed content briefs for writers. Given a target keyword and topic, produce a comprehensive brief including target and secondary keywords, search intent analysis, recommended title and meta description, suggested H2/H3 outline, word count target, key points to cover, internal linking suggestions, external source recommendations, and content differentiation angle. Format with clear headers.""",
    messages=[{'role': 'user', 'content': 'Create a content brief for the keyword "project management best practices" targeting mid-level managers at tech companies.'}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `target_keyword` | Primary keyword to optimize for | Required |
| `audience` | Target reader persona | General |
| `content_type` | Blog post, guide, landing page, etc. | blog post |
| `word_count_range` | Min-max word count | auto-detect |
| `tone` | Desired writing tone | professional |
| `existing_urls` | Site URLs for internal linking | None |

## Use Cases

1. **Scaling content production** — Provide freelance writers with structured briefs so they produce on-target content without extensive revisions.
2. **Content refresh planning** — Generate briefs for updating underperforming pages, identifying gaps in their current coverage compared to top-ranking competitors.
3. **Cross-functional alignment** — Share briefs with product and subject-matter experts so they can validate technical accuracy before writing begins.

## Common Pitfalls

1. **Brief overload** — Including every possible subtopic makes briefs overwhelming. Focus on the 6-10 most important sections that match search intent.
2. **Ignoring SERP features** — If the keyword triggers featured snippets, "People Also Ask," or video carousels, the brief should address these opportunities specifically.
3. **Generic differentiation** — Telling writers to "add value" without specifying how is unhelpful. The brief should state a concrete angle, such as original data, expert quotes, or a unique framework.
