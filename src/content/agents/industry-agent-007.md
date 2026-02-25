---
title: "Medication Interaction Checker Agent"
description: "An AI agent that reviews medication lists for potential drug-drug interactions, contraindications, and dosing concerns, providing clinical decision support."
category: agents
tags: ["healthcare", "pharmacology", "drug-interactions", "medication-safety"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Adverse drug interactions are a leading cause of preventable harm in healthcare. This agent analyzes medication lists in context of patient demographics and comorbidities to identify potential drug-drug interactions, duplicate therapies, contraindications, and dosing concerns. It provides severity ratings and clinical recommendations to support pharmacist and prescriber decision-making.

## System Prompt

```
You are a clinical pharmacology decision support agent. Analyze medication lists for potential interactions and safety concerns.

Analysis scope:
1. DRUG-DRUG INTERACTIONS: Identify pharmacokinetic (CYP450, P-gp) and pharmacodynamic interactions. Rate severity: MAJOR (avoid combination), MODERATE (monitor closely), MINOR (be aware).
2. DUPLICATE THERAPY: Flag therapeutic duplications (e.g., two NSAIDs, two SSRIs).
3. CONTRAINDICATIONS: Identify medications contraindicated by documented conditions (e.g., metformin in severe renal impairment).
4. DOSING CONCERNS: Flag doses outside typical ranges for the patient's age, weight, and renal/hepatic function.
5. HIGH-ALERT MEDICATIONS: Highlight any ISMP high-alert medications and relevant safety considerations.
6. DEPRESCRIBING OPPORTUNITIES: For elderly patients or polypharmacy, suggest potential deprescribing candidates using evidence-based criteria.

Output format:
- Summary: Total medications reviewed, interactions found by severity
- Interaction table: | Med A | Med B | Type | Severity | Clinical Significance | Recommendation |
- Contraindication alerts
- Dosing review
- Action items prioritized by severity

Rules:
- Reference interaction mechanisms (CYP enzymes, pharmacodynamic effects)
- Consider patient-specific factors (age, renal function, hepatic function)
- This is clinical decision support — not a substitute for pharmacist review
- When evidence is uncertain, state the level of evidence
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

patient_data = """
Patient: 72yo female, 58kg, CrCl 35 mL/min, NKDA
Conditions: Atrial fibrillation, CHF (EF 30%), Type 2 DM, osteoarthritis
Medications:
- Warfarin 5mg daily
- Metoprolol succinate 100mg daily
- Lisinopril 20mg daily
- Metformin 1000mg BID
- Ibuprofen 400mg TID PRN
- Amiodarone 200mg daily
- Omeprazole 20mg daily
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You are a clinical pharmacology decision support agent. Analyze medication lists for drug-drug interactions, contraindications, duplicate therapy, dosing concerns, and high-alert medications. Rate interaction severity and provide clinical recommendations. Consider patient-specific factors.",
    messages=[{"role": "user", "content": f"Review this medication list:\n{patient_data}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `severity_filter` | Minimum severity to report: `minor`, `moderate`, `major` | `moderate` |
| `include_otc` | Include OTC medication interactions | `true` |
| `include_supplements` | Check herbal/supplement interactions | `true` |
| `renal_dosing` | Adjust recommendations for renal impairment | `auto` |
| `geriatric_screening` | Apply Beers Criteria and STOPP/START criteria | `auto` |

## Use Cases

1. **Admission Medication Reconciliation**: Review the complete medication list at hospital admission to catch interactions before they cause harm during the inpatient stay.
2. **New Prescription Safety Check**: When adding a new medication to an existing regimen, quickly identify potential interactions with current medications.
3. **Polypharmacy Review**: For patients on five or more medications, conduct a comprehensive review to identify deprescribing opportunities and simplify the regimen.

## Common Pitfalls

- **Not a Replacement for Drug Databases**: This agent provides clinical reasoning about interactions but should complement, not replace, certified drug interaction databases like Lexicomp or Clinical Pharmacology.
- **Missing Context**: Interaction severity depends on patient-specific factors. Always provide renal function, age, weight, and comorbidities for accurate assessment.
- **Ignoring Clinical Significance**: Not all flagged interactions are clinically meaningful. The agent rates severity, but the clinical team must weigh risk versus benefit for each patient.
