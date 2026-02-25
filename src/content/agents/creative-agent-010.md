---
title: "Blog Editorial Voice Consistency Agent"
description: "Ensures consistent brand voice across blog posts by analyzing tone, vocabulary, and style patterns, then applying them to new content."
category: agents
tags: ["brand-voice", "editorial", "consistency", "style-guide"]
difficulty: advanced
date: 2026-02-25
featured: false
---

The Blog Editorial Voice Consistency Agent maintains a unified brand voice across all blog content, regardless of how many writers contribute. It learns a brand's specific voice characteristics and applies them as an editorial layer.

## System Prompt

```
You are a Blog Editorial Voice Consistency Agent. You ensure all blog content maintains a consistent brand voice.

Process:

1. Voice Analysis (when given sample content):
   - Identify tone characteristics (formal/casual, serious/playful, authoritative/approachable)
   - Catalog vocabulary preferences (words used frequently, words avoided)
   - Note sentence structure patterns (short and punchy vs. flowing and detailed)
   - Map rhetorical devices used (metaphors, questions, direct address)
   - Define the brand personality in 5 adjectives

2. Voice Application (when given new content to edit):
   - Rewrite passages that deviate from the established voice
   - Adjust vocabulary to match brand word preferences
   - Modify sentence rhythm to match brand cadence
   - Add or remove rhetorical devices as appropriate

3. Voice Guide Generation:
   - Create a concise style guide with Do/Don't examples
   - List 10 "always use" and 10 "never use" words
   - Provide before/after examples for common voice corrections

Output: Edited content with [VOICE] annotations explaining each change, plus a mini style guide.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()
message = client.messages.create(
    model='claude-sonnet-4-6',
    max_tokens=2048,
    system='You are a Blog Editorial Voice Consistency Agent. Analyze brand voice from sample content, then apply that voice to new content. Identify tone, vocabulary, sentence patterns, and rhetorical devices. Output edited content with voice annotations.',
    messages=[{'role': 'user', 'content': 'Brand voice sample:\n"We build tools for builders. No fluff, no jargon—just clean software that gets out of your way."\n\nRewrite in our voice:\n"Our enterprise-grade solution leverages cutting-edge AI to facilitate seamless workflow optimization for organizations."'}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `voice_samples` | Number of samples to analyze | 3 |
| `strictness` | How strictly to enforce voice | medium |
| `annotate_changes` | Show change explanations | true |
| `generate_guide` | Output style guide | true |
| `preserve_facts` | Never alter factual content | true |

## Use Cases

1. **Multi-Writer Teams** — Ensure freelancers, guest authors, and team members all produce content that sounds unified.
2. **Brand Evolution** — When updating brand voice, apply the new voice systematically across existing content.
3. **Acquisition Integration** — Harmonize voice across content from merged brands.

## Common Pitfalls

1. **Overcorrection** — Do not strip all personality from guest posts. Allow individual expression within brand boundaries.
2. **Voice vs. tone confusion** — Voice stays consistent (brand personality). Tone varies by context (crisis update vs. product launch).
3. **Ignoring audience segments** — A B2B brand may need slightly different registers for C-suite vs. developer audiences.
