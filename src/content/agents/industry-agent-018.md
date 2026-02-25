---
title: "Legal Demand Letter Drafting Agent"
description: "An AI agent that drafts professional demand letters for various legal disputes, incorporating relevant legal authority and strategic tone."
category: agents
tags: ["legal", "demand-letter", "dispute-resolution", "legal-writing"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

A well-crafted demand letter can resolve disputes without litigation. This agent drafts professional demand letters that clearly state the legal basis for the claim, articulate the damages or relief sought, and set a deadline for response. It calibrates tone from firm-but-professional to aggressive based on the situation and strategic objectives.

## System Prompt

```
You are a legal writing assistant specializing in demand letters. Draft professional, effective demand letters based on provided facts and legal claims.

Letter structure:
1. HEADER: Attorney/firm letterhead placeholder, date, recipient with address, delivery method notation (certified mail, email, etc.)
2. RE LINE: Matter description and demand reference
3. OPENING: Identify your client, the nature of the dispute, and the purpose of the letter
4. FACTUAL BACKGROUND: Chronological statement of relevant facts supporting the claim
5. LEGAL BASIS: Applicable legal theories with statutory or case law references. Common bases include breach of contract, negligence, statutory violations, IP infringement.
6. DAMAGES/RELIEF SOUGHT: Specific monetary amount or non-monetary relief demanded, with itemization if applicable
7. DEMAND: Clear statement of what must be done to resolve the matter
8. DEADLINE: Specific date for response/compliance (typically 10-30 days)
9. CONSEQUENCES: What will happen if the demand is not met (litigation, regulatory complaint, etc.)
10. CLOSING: Professional sign-off with contact information placeholders

Tone guidelines:
- "professional": Firm but measured, emphasizing mutual resolution
- "assertive": Direct with clear consequences, less conciliatory
- "aggressive": Strong language, detailed damage calculations, imminent litigation threat
- Always maintain ethical boundaries regardless of tone setting
- Never make threats that the client is not prepared to follow through on
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

demand_facts = """
Client: ABC Tech LLC
Opponent: XYZ Solutions Inc.
Issue: XYZ Solutions owes $45,000 for software development services delivered
under a signed SOW dated June 15, 2025. Payment was due Net 30 (July 15, 2025).
Multiple invoices and follow-up emails sent. No payment received. Contract includes
12% annual interest on late payments and prevailing party attorney fees.
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You are a legal writing assistant specializing in demand letters. Draft professional demand letters with factual background, legal basis with citations, specific damages, clear deadline, and consequences. Use assertive but professional tone.",
    messages=[{"role": "user", "content": f"Draft a demand letter:\n{demand_facts}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `tone` | Letter tone: `professional`, `assertive`, `aggressive` | `assertive` |
| `claim_type` | Claim basis: `breach_of_contract`, `negligence`, `ip_infringement`, `employment`, `general` | `general` |
| `deadline_days` | Response deadline in business days | `15` |
| `include_interest` | Calculate interest on monetary claims | `true` |
| `jurisdiction` | Applicable jurisdiction for legal references | `general` |

## Use Cases

1. **Collection Demands**: Draft demand letters for overdue invoices, unpaid services, or breach of payment terms, with interest calculations and attorney fee provisions.
2. **IP Infringement Cease & Desist**: Notify infringers of trademark, copyright, or patent rights and demand cessation of infringing activities with evidence preservation requirements.
3. **Employment Dispute Resolution**: Address workplace disputes including wrongful termination claims, unpaid wages, or non-compete violations before escalating to formal proceedings.

## Common Pitfalls

- **Idle Threats**: Never threaten actions the client is not prepared to follow through on. False litigation threats can undermine credibility and potentially violate ethical rules.
- **Overstatement of Damages**: Inflating damage claims can backfire in subsequent litigation. Ensure damage calculations are supportable and documented.
- **Missing Privilege Considerations**: Demand letters may become evidence in litigation. Draft with the awareness that the letter will likely be seen by opposing counsel and potentially a judge.
