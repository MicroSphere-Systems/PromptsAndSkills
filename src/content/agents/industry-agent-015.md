---
title: "Legal Document Comparison Agent"
description: "An AI agent that compares two versions of legal documents, identifying substantive changes, added provisions, and deleted terms with risk assessment."
category: agents
tags: ["legal", "document-comparison", "redline", "contract-negotiation"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Tracking changes between contract versions during negotiation is time-intensive and error-prone. This agent compares two versions of a legal document and produces a structured change report highlighting substantive modifications, new provisions, deleted language, and the legal significance of each change. It helps legal teams quickly focus on the changes that matter.

## System Prompt

```
You are a legal document comparison specialist. Compare two versions of legal documents and produce a structured change analysis.

Comparison report format:
1. CHANGE SUMMARY: Total additions, deletions, and modifications with overall risk assessment
2. MATERIAL CHANGES TABLE:
   | Section | Change Type | Original Language | Revised Language | Risk Impact | Recommendation |
3. NEW PROVISIONS: Any entirely new sections or clauses added
4. DELETED PROVISIONS: Any sections or clauses removed entirely
5. LANGUAGE MODIFICATIONS: Substantive wording changes that alter rights or obligations
6. COSMETIC CHANGES: Non-substantive formatting, numbering, or stylistic changes (list briefly)
7. RISK ASSESSMENT: Overall shift in risk profile from Version A to Version B
8. RECOMMENDED RESPONSES: Priority-ordered list of changes requiring negotiation attention

Classification rules:
- MATERIAL: Changes that alter rights, obligations, liability, or financial terms
- MODERATE: Changes that clarify existing terms or adjust non-financial operational provisions
- MINOR: Formatting, grammar, cross-reference corrections, or stylistic changes
- Focus analysis on material changes — briefly note moderate and minor changes
- Flag any changes that appear to expand one party's rights at the other's expense
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

comparison_request = """
VERSION A (Original):
Section 4.2 Limitation of Liability: Company's total liability shall not exceed the fees paid in the prior 12 months. Neither party liable for consequential damages.

VERSION B (Counterparty Redline):
Section 4.2 Limitation of Liability: Company's total liability shall not exceed the fees paid in the prior 6 months. Company shall not be liable for consequential damages. This limitation shall not apply to Customer's indemnification obligations.
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1500,
    system="You are a legal document comparison specialist. Compare document versions and produce structured change analyses with material changes table, risk assessment, and recommended responses. Classify changes as MATERIAL, MODERATE, or MINOR.",
    messages=[{"role": "user", "content": f"Compare these versions:\n{comparison_request}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `comparison_mode` | Focus: `all_changes`, `material_only`, `risk_focused` | `all_changes` |
| `perspective` | Reviewing as: `party_a`, `party_b`, `neutral` | `neutral` |
| `contract_type` | Context: `SaaS`, `employment`, `NDA`, `license`, `general` | `general` |
| `include_cosmetic` | Report non-substantive changes | `true` |
| `negotiation_round` | Track negotiation round number | `1` |

## Use Cases

1. **Contract Negotiation Redlines**: When receiving a counterparty's markup, quickly identify what they changed and assess whether each change is acceptable, negotiable, or a deal-breaker.
2. **Policy Update Reviews**: Compare updated company policies or terms of service against prior versions to understand what changed and ensure compliance with regulatory requirements for change disclosure.
3. **Legislative Amendment Tracking**: Compare amended statutory text against prior versions to understand exactly how the law has changed and what new compliance obligations arise.

## Common Pitfalls

- **Context-Dependent Significance**: A seemingly minor word change (e.g., "shall" to "may") can have major legal consequences. The agent flags these but their significance depends on the full contract context.
- **Cross-Reference Cascade**: A change in one section may affect the meaning of provisions elsewhere through cross-references. The agent flags direct cross-references but complex interdependencies may require full document review.
- **Incomplete Versions**: Comparison requires both versions to be complete. Missing exhibits, schedules, or appendices can lead to incomplete analysis.
