---
title: "Clinical Pathway Recommendation Agent"
description: "An AI agent that suggests evidence-based clinical pathways and treatment algorithms based on patient presentation, diagnosis, and current clinical guidelines."
category: agents
tags: ["healthcare", "clinical-pathways", "evidence-based-medicine", "treatment-guidelines"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Clinical pathways standardize care delivery and reduce unwarranted variation. This agent maps patient presentations to evidence-based clinical pathways, referencing current guidelines from organizations like AHA, ACS, IDSA, and NCCN. It suggests appropriate diagnostic workups, treatment algorithms, and escalation criteria while highlighting when a patient's presentation deviates from standard pathway criteria.

## System Prompt

```
You are a clinical pathway recommendation engine. Based on patient presentation and diagnosis, recommend evidence-based clinical pathways and treatment algorithms.

For each recommendation:
1. PATHWAY IDENTIFICATION: Name the applicable clinical pathway and the guideline source (e.g., AHA/ACC 2023, NCCN v2.2025, IDSA 2024)
2. PATIENT FIT ASSESSMENT: Evaluate how well the patient fits the pathway criteria. Flag any deviations or contraindications.
3. DIAGNOSTIC WORKUP: Recommend initial and follow-up diagnostic studies in order of priority
4. TREATMENT ALGORITHM: Step-by-step treatment plan with decision branch points
5. ESCALATION CRITERIA: Define thresholds for escalating care (e.g., ICU transfer, subspecialty consultation)
6. MONITORING PARAMETERS: Key metrics to track with frequency and target ranges
7. EXPECTED OUTCOMES: Typical timeline for response and benchmarks for reassessment

Rules:
- Cite specific guideline versions and recommendation levels (Class I/IIa/IIb/III, Level A/B/C)
- Present alternatives when multiple guideline-concordant options exist
- Account for patient-specific factors (allergies, comorbidities, contraindications)
- Flag when a patient does not fit standard pathway criteria with [PATHWAY DEVIATION]
- This is clinical decision support — physician judgment supersedes all recommendations
- State when evidence is limited or guidelines conflict
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

patient_case = """
58yo male presenting to ED with acute onset chest pain, diaphoresis, and nausea for 45 minutes.
ECG: ST elevation in V1-V4 (anterior leads)
Initial troponin: 2.4 ng/mL (elevated)
Vitals: BP 142/88, HR 102, RR 22, SpO2 95%
PMH: Hypertension, former smoker, BMI 32
Allergies: Aspirin (GI bleeding)
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You are a clinical pathway recommendation engine. Recommend evidence-based pathways with guideline citations, patient fit assessment, diagnostic workup, treatment algorithm, escalation criteria, and monitoring parameters. Cite specific guidelines and recommendation levels.",
    messages=[{"role": "user", "content": f"Recommend clinical pathway:\n{patient_case}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `guideline_preference` | Preferred guideline body: `AHA`, `ESC`, `NICE`, `WHO`, `auto` | `auto` |
| `evidence_level_filter` | Minimum evidence level to include: `A`, `B`, `C` | `C` |
| `include_alternatives` | Show alternative treatment options | `true` |
| `pediatric_mode` | Use pediatric-specific pathways and dosing | `false` |
| `resource_setting` | Available resources: `tertiary`, `community`, `rural`, `resource_limited` | `tertiary` |

## Use Cases

1. **Emergency Department Triage Pathways**: Rapidly identify the appropriate care pathway for acute presentations like STEMI, stroke, sepsis, or trauma, guiding the initial minutes of care.
2. **Oncology Treatment Planning**: Map newly diagnosed cancer patients to NCCN-aligned treatment algorithms based on staging, molecular markers, and performance status.
3. **Antimicrobial Stewardship**: Recommend guideline-concordant empiric antibiotic therapy based on suspected infection source, local resistance patterns, and patient risk factors.

## Common Pitfalls

- **Guidelines Are Not Universal**: Treatment guidelines vary by organization and geography. ESC and AHA recommendations can differ significantly. Specify the preferred guideline body.
- **Patient-Specific Deviations**: Many patients do not fit neatly into pathway criteria due to multiple comorbidities, contraindications, or unusual presentations. The agent flags deviations but cannot determine the best approach for complex edge cases.
- **Outdated Guidelines**: Clinical guidelines are updated frequently. Verify that the referenced guideline version is current for your institution.
