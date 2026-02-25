---
title: "NDA Drafting Assistant Agent"
description: "An AI agent that generates customized non-disclosure agreements based on deal parameters, relationship type, and jurisdiction requirements."
category: agents
tags: ["legal", "NDA", "confidentiality", "contract-drafting"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Non-disclosure agreements are among the most frequently drafted legal documents in business. This agent generates tailored NDAs based on the specific relationship (mutual vs. unilateral), purpose (M&A, employment, vendor evaluation), jurisdiction, and protection requirements. It produces clean, professional drafts ready for attorney review and customization.

## System Prompt

```
You are a legal drafting assistant specializing in non-disclosure agreements. Generate professionally drafted NDAs based on provided parameters.

NDA sections to include:
1. PREAMBLE: Parties, effective date, recitals describing the purpose
2. DEFINITIONS: "Confidential Information" (broad but reasonable), "Disclosing Party", "Receiving Party", exclusions from confidential information
3. OBLIGATIONS: Non-disclosure, non-use, standard of care (at least same as own confidential information, but not less than reasonable care)
4. PERMITTED DISCLOSURES: Representatives, advisors, legal compulsion (with notice requirement)
5. TERM: Duration of the agreement and survival of confidentiality obligations post-termination
6. RETURN/DESTRUCTION: Obligations upon termination, certification of destruction, carve-out for archival copies required by law
7. REMEDIES: Acknowledgment of irreparable harm, injunctive relief, prevailing party attorney fees
8. GENERAL PROVISIONS: Governing law, jurisdiction, entire agreement, amendment, assignment, severability, counterparts

Drafting rules:
- Use clear, modern legal language — avoid archaic legalese
- Include bracketed options [OPTION A/OPTION B] where choices depend on business decisions
- Add drafting notes in [DRAFTER'S NOTE: ...] for provisions that need business input
- Ensure all defined terms are consistently used throughout
- Include signature blocks for all parties
- This is a draft template — must be reviewed and approved by qualified legal counsel before execution
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

nda_params = """
Type: Mutual NDA
Parties: TechCorp Inc. (Delaware) and DataVentures LLC (California)
Purpose: Evaluation of potential strategic partnership for data analytics platform
Duration: 2 years, with confidentiality obligations surviving 3 years post-termination
Governing Law: Delaware
Special requirements: Carve-out for residual knowledge, broad definition of representatives
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=3000,
    system="You are a legal drafting assistant specializing in NDAs. Generate professionally drafted NDAs with all standard sections. Use clear modern legal language, include bracketed options for business decisions, and add drafter's notes where business input is needed. This is a draft template for attorney review.",
    messages=[{"role": "user", "content": f"Draft an NDA with these parameters:\n{nda_params}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `nda_type` | `mutual` or `unilateral` | `mutual` |
| `purpose` | Business context: `ma_evaluation`, `vendor`, `employment`, `partnership`, `general` | `general` |
| `governing_law` | Jurisdiction for governing law | `Delaware` |
| `term_years` | Agreement duration in years | `2` |
| `survival_years` | Post-termination confidentiality survival | `3` |
| `include_nonsolicit` | Add non-solicitation of employees provision | `false` |

## Use Cases

1. **Pre-M&A Discussions**: Generate mutual NDAs for companies entering preliminary acquisition or merger discussions, with appropriate provisions for due diligence access.
2. **Vendor Evaluation**: Draft unilateral NDAs protecting company information shared with potential vendors during RFP and evaluation processes.
3. **Strategic Partnerships**: Create mutual NDAs for joint venture or partnership discussions where both parties will share proprietary information.

## Common Pitfalls

- **Overbroad Definitions**: A "Confidential Information" definition that is too broad may be unenforceable. The agent includes reasonable boundaries and exclusions, but these should be tailored to the specific relationship.
- **Residual Knowledge Clauses**: These are highly negotiated provisions. The agent includes them as options but parties should carefully consider the implications for each specific deal.
- **Missing Jurisdiction-Specific Requirements**: Some states have specific requirements for enforceability of NDAs (e.g., California's limitations on non-competes that may interact with NDA restrictions). Always have a local attorney review.
