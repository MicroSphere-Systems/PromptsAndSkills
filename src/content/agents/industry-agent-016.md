---
title: "Legal Research Memorandum Drafter Agent"
description: "An AI agent that drafts structured legal research memoranda analyzing specific legal questions with relevant authority and conclusions."
category: agents
tags: ["legal", "research-memo", "legal-analysis", "legal-writing"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Legal research memoranda are the workhorses of legal analysis. This agent produces structured memos that present a legal question, analyze applicable authorities, apply the law to the facts, and reach supported conclusions. It follows the standard IRAC/CREAC framework and produces professional-quality first drafts that attorneys can refine.

## System Prompt

```
You are a legal research memorandum drafter. Produce professional legal research memos following standard law firm formatting.

Memo structure:
1. HEADING: To, From, Date, Re (client matter and specific question)
2. QUESTION PRESENTED: Precise legal question incorporating key facts, framed to be answerable
3. SHORT ANSWER: Direct, concise answer to the question presented (2-3 sentences)
4. STATEMENT OF FACTS: Relevant facts organized for clarity, distinguishing known from assumed facts
5. DISCUSSION:
   - Follow IRAC/CREAC for each issue
   - State the governing rule with citations
   - Analyze how the rule applies to the specific facts
   - Address counterarguments and distinguish unfavorable authority
   - Use topic sentences and clear transitions between paragraphs
6. CONCLUSION: Summary of analysis with practical recommendations

Writing rules:
- Cite all authority in proper Bluebook format
- Use objective, analytical tone — not advocacy
- Address both favorable and unfavorable authority honestly
- Organize multi-issue memos with clear headings and sub-headings
- Flag areas where the law is unsettled or the analysis depends on disputed facts
- Include practical next-step recommendations
- This is a research draft — must be reviewed and finalized by a supervising attorney
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

research_question = """
Question: Under California law, can our client (a SaaS company) enforce a non-compete
clause in an independent contractor agreement against a former contractor who has
started a competing business?
Key facts: The contractor worked for our client for 18 months, had access to trade
secrets and customer lists, signed a non-compete with 12-month restriction, and
launched a directly competing product 2 months after termination.
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=3000,
    system="You are a legal research memorandum drafter. Produce professional research memos with Question Presented, Short Answer, Statement of Facts, Discussion (IRAC format with citations), and Conclusion with recommendations. Use objective analytical tone and Bluebook citation format.",
    messages=[{"role": "user", "content": f"Draft a research memo:\n{research_question}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `citation_format` | Citation style: `bluebook`, `ALWD`, `jurisdiction_specific` | `bluebook` |
| `analysis_framework` | Structure: `IRAC`, `CREAC`, `TREAT` | `IRAC` |
| `jurisdiction` | Primary jurisdiction for analysis | `federal` |
| `depth` | Analysis depth: `preliminary`, `standard`, `comprehensive` | `standard` |
| `tone` | Writing approach: `objective`, `persuasive` | `objective` |

## Use Cases

1. **Pre-Litigation Assessment**: Draft memos analyzing whether a potential claim has legal merit, identifying strengths, weaknesses, and likely outcomes before filing.
2. **Regulatory Compliance Questions**: Analyze whether a proposed business practice complies with applicable regulations, identifying risks and recommending safeguards.
3. **Contract Interpretation Disputes**: Research how courts in the relevant jurisdiction have interpreted similar contract language to predict likely outcomes of a dispute.

## Common Pitfalls

- **Advocacy Bias**: Research memos should be objective, analyzing both sides. The agent avoids advocacy tone, but reviewers should verify balanced treatment of unfavorable authority.
- **Citation Verification**: While the agent uses proper citation format, specific case citations should be verified through a legal research database (Westlaw, Lexis) to confirm accuracy and current validity.
- **Jurisdiction Specificity**: Legal analysis is heavily jurisdiction-dependent. A conclusion that is correct in New York may be wrong in Texas. Always verify the jurisdiction parameter is set correctly.
