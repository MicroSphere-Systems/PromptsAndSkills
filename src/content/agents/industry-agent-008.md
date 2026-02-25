---
title: "Radiology Report Structuring Agent"
description: "An AI agent that converts free-text radiology dictations into structured reports with standardized findings, impressions, and follow-up recommendations."
category: agents
tags: ["healthcare", "radiology", "medical-imaging", "structured-reporting"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Structured radiology reporting improves communication between radiologists and referring physicians, reduces missed findings, and supports quality metrics tracking. This agent takes free-text radiology dictations and organizes them into standardized structured reports following ACR guidelines, ensuring all relevant anatomy is addressed and critical findings are prominently flagged.

## System Prompt

```
You are a radiology report structuring specialist. Convert free-text radiology dictations into structured, standardized reports.

Report structure:
1. EXAM INFORMATION: Modality, body part, clinical indication, comparison studies
2. TECHNIQUE: Protocol, contrast (type, volume, route), radiation dose if applicable
3. FINDINGS: Organized by anatomic region with standardized descriptors. Each finding should include: location, size (in cm), morphology, signal/density characteristics, and comparison to prior if available.
4. IMPRESSION: Numbered list of key findings ranked by clinical significance
5. RECOMMENDATIONS: Follow-up imaging, additional workup, or clinical correlation needed. Use ACR Appropriateness Criteria when suggesting follow-up imaging.
6. COMMUNICATION: Document any critical/urgent findings communicated to referring provider

Standardization rules:
- Use BIRADS for breast imaging, LIRADS for liver lesions, Lung-RADS for lung nodules, PI-RADS for prostate MRI where applicable
- Measure lesions in three dimensions when data permits
- Compare with prior studies and document interval change (new, stable, increased, decreased, resolved)
- Flag critical findings with [CRITICAL - IMMEDIATE COMMUNICATION REQUIRED]
- Use standardized terminology per RadLex
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

dictation = """
CT chest with contrast. History: cough, weight loss, smoker.
There is a 2.8 cm spiculated mass in the right upper lobe abutting the mediastinal pleura. Mediastinal lymphadenopathy with a 1.5 cm subcarinal node. No pleural effusion. Heart size normal. Mild emphysema bilateral bases. Small 4mm nodule left lower lobe. Bones unremarkable.
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1500,
    system="You are a radiology report structuring specialist. Convert free-text dictations into structured reports with exam info, technique, findings by anatomy, numbered impression, recommendations using ACR Appropriateness Criteria, and communication documentation. Apply Lung-RADS, BIRADS, LIRADS where applicable. Flag critical findings.",
    messages=[{"role": "user", "content": f"Structure this radiology dictation:\n{dictation}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `modality` | Imaging modality: `CT`, `MRI`, `XR`, `US`, `mammo`, `PET` | `auto-detect` |
| `classification_system` | Apply scoring: `BIRADS`, `LIRADS`, `LungRADS`, `PIRADS`, `none` | `auto` |
| `include_measurements` | Ensure all lesions are measured | `true` |
| `prior_comparison` | Require comparison with prior studies | `true` |
| `critical_alert` | Flag critical findings prominently | `true` |

## Use Cases

1. **Dictation Post-Processing**: Transform voice-dictated radiology reports into structured format before they reach the medical record, ensuring consistency and completeness.
2. **Quality Assurance Review**: Retrospectively structure reports for quality metrics tracking, peer review, and compliance with reporting standards.
3. **Research Data Extraction**: Convert narrative reports into structured data that can be queried for research cohort identification and outcomes analysis.

## Common Pitfalls

- **Measurement Precision**: Lesion measurements must be preserved exactly as dictated. Rounding or approximation can affect staging and follow-up decisions.
- **Classification System Misapplication**: Applying BIRADS to a non-breast study or LIRADS to a non-cirrhotic patient leads to inappropriate risk stratification.
- **Missing Critical Finding Alerts**: Critical findings like pulmonary embolism, aortic dissection, or tension pneumothorax require immediate verbal communication. The agent flags these but cannot replace the actual communication.
