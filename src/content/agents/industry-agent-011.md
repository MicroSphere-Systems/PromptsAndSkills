---
title: "Contract Clause Extraction Agent"
description: "An AI agent that identifies, extracts, and categorizes key clauses from legal contracts, enabling rapid contract review and risk assessment."
category: agents
tags: ["legal", "contract-review", "clause-extraction", "risk-assessment"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Legal teams spend enormous time reviewing contracts to identify key provisions. This agent scans contracts and extracts critical clauses — indemnification, limitation of liability, termination, confidentiality, IP assignment, and more — categorizing them by type and flagging provisions that deviate from standard or favorable terms.

## System Prompt

```
You are a legal contract analysis agent specializing in clause extraction and risk identification.

For each contract provided, extract and categorize:
1. PARTIES & EFFECTIVE DATE: Identify all parties, their roles, and the agreement effective date
2. KEY DEFINITIONS: Extract defined terms critical to interpreting obligations
3. CORE OBLIGATIONS: Primary duties and deliverables of each party
4. FINANCIAL TERMS: Payment terms, pricing, fee schedules, penalties
5. TERM & TERMINATION: Duration, renewal provisions, termination triggers, notice periods
6. INDEMNIFICATION: Scope, caps, carve-outs, survival period
7. LIABILITY LIMITATIONS: Caps on liability, exclusion of consequential damages, exceptions
8. CONFIDENTIALITY/NDA: Scope, duration, permitted disclosures, return/destruction obligations
9. IP RIGHTS: Ownership, licensing, work-for-hire provisions, background IP carve-outs
10. REPRESENTATIONS & WARRANTIES: Key reps and warranties, survival periods
11. DISPUTE RESOLUTION: Governing law, jurisdiction, arbitration vs. litigation, venue
12. MISCELLANEOUS: Assignment, force majeure, notice provisions, amendment procedures

For each extracted clause:
- Quote the relevant text
- Classify risk level: FAVORABLE, NEUTRAL, UNFAVORABLE, HIGH RISK
- Provide a plain-English summary
- Note any missing standard provisions
- Suggest negotiation points for unfavorable terms

This is legal analysis assistance — not legal advice. All output should be reviewed by qualified legal counsel.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

contract_text = """
Section 8. Limitation of Liability. IN NO EVENT SHALL EITHER PARTY'S AGGREGATE LIABILITY
EXCEED THE FEES PAID IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. NEITHER PARTY
SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
DAMAGES. This limitation shall not apply to breaches of Section 5 (Confidentiality)
or a party's indemnification obligations under Section 9.
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1500,
    system="You are a legal contract analysis agent. Extract and categorize contract clauses. For each clause, quote the text, classify risk level (FAVORABLE/NEUTRAL/UNFAVORABLE/HIGH RISK), provide plain-English summary, and suggest negotiation points. This is analysis assistance, not legal advice.",
    messages=[{"role": "user", "content": f"Extract and analyze clauses:\n{contract_text}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `contract_type` | Type: `SaaS`, `employment`, `NDA`, `MSA`, `SOW`, `lease`, `general` | `general` |
| `review_perspective` | Whose perspective: `buyer`, `seller`, `mutual` | `mutual` |
| `risk_threshold` | Minimum risk to flag: `all`, `unfavorable`, `high_risk` | `all` |
| `jurisdiction` | Governing law context | `US-general` |
| `playbook_standards` | Custom acceptable terms baseline | `market_standard` |

## Use Cases

1. **M&A Due Diligence**: Rapidly review dozens of contracts in a target company's contract portfolio, extracting key provisions that impact deal valuation and risk assessment.
2. **Vendor Contract Review**: Analyze incoming vendor agreements before signature, identifying unfavorable terms that need negotiation compared to your organization's standard positions.
3. **Contract Portfolio Audit**: Systematically review existing contracts to identify expiring agreements, auto-renewal traps, and clauses that conflict with current company policies.

## Common Pitfalls

- **Missing Cross-References**: Contracts often reference other sections or exhibits. The agent may not fully capture the interaction between cross-referenced provisions without the complete document.
- **Jurisdiction-Specific Nuances**: Contract interpretation varies by jurisdiction. A clause that is enforceable in Delaware may not be in California. Always specify the governing law context.
- **Not Legal Advice**: This agent assists with contract review efficiency but does not replace qualified legal counsel for final contract decisions.
