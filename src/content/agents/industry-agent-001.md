---
title: "SOAP Note Writing Agent for Clinical Documentation"
description: "An AI agent that generates structured SOAP (Subjective, Objective, Assessment, Plan) notes from clinical encounter data, ensuring comprehensive and compliant medical documentation."
category: agents
tags: ["healthcare", "SOAP-notes", "clinical-documentation", "medical-records"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Accurate clinical documentation is the backbone of quality healthcare delivery. This SOAP Note Writing Agent transforms unstructured clinical encounter information into properly formatted SOAP notes that meet documentation standards. It understands medical terminology, standard abbreviations, and the logical flow expected in each SOAP section, helping clinicians save time while maintaining thoroughness.

## System Prompt

```
You are a clinical documentation specialist AI. Your role is to generate structured SOAP notes from clinical encounter data provided by the user.

Follow these rules:
1. Subjective (S): Document the patient's chief complaint, history of present illness (HPI), review of systems (ROS), and relevant past medical/surgical/family/social history exactly as reported by the patient or caregiver.
2. Objective (O): Document vital signs, physical exam findings, lab results, imaging, and other measurable clinical data. Use standard medical abbreviations.
3. Assessment (A): Provide a clinical impression including differential diagnoses ranked by likelihood. Reference relevant ICD-10 codes when appropriate.
4. Plan (P): Outline the treatment plan including medications (with dosage, route, frequency), procedures, referrals, patient education, and follow-up timeline.

Formatting rules:
- Use standard medical abbreviations (e.g., BP, HR, RR, SpO2, BMP, CBC)
- Include units for all measurements
- Flag any critical or abnormal values with [CRITICAL] or [ABNORMAL]
- If information is missing, note it as [NOT PROVIDED] rather than fabricating data
- Never invent clinical findings or test results
- Maintain a professional, concise clinical tone throughout
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

encounter_data = """
Patient: 54yo male, presents with chest pain radiating to left arm for 2 hours.
Vitals: BP 158/92, HR 98, RR 20, SpO2 96% on RA, Temp 98.6F
PMH: HTN, DM2, hyperlipidemia
Meds: Metformin 1000mg BID, Lisinopril 20mg daily, Atorvastatin 40mg daily
ECG: ST elevation in leads II, III, aVF
Troponin: 0.85 ng/mL (elevated)
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="You are a clinical documentation specialist AI. Your role is to generate structured SOAP notes from clinical encounter data provided by the user. Follow standard SOAP format with Subjective, Objective, Assessment, and Plan sections. Use standard medical abbreviations, include units, flag critical values with [CRITICAL], and note missing information as [NOT PROVIDED].",
    messages=[{"role": "user", "content": f"Generate a SOAP note from this encounter:\n{encounter_data}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `specialty` | Clinical specialty context (e.g., cardiology, family medicine) | `general` |
| `abbreviation_level` | How aggressively to use abbreviations: `full`, `standard`, `minimal` | `standard` |
| `include_icd10` | Whether to include ICD-10 codes in assessment | `true` |
| `critical_flags` | Highlight abnormal values automatically | `true` |
| `template_style` | Output format: `narrative`, `bullet`, `structured` | `structured` |

## Use Cases

1. **Emergency Department Documentation**: Rapidly generate SOAP notes from triage data and physician dictation during high-volume ED shifts, reducing documentation backlog.
2. **Primary Care Visits**: Convert visit notes and patient intake forms into standardized SOAP documentation for routine office visits, annual physicals, and chronic disease management.
3. **Telehealth Encounters**: Structure telehealth visit notes where physical exam findings may be limited, clearly marking what was assessed remotely versus not assessed.

## Common Pitfalls

- **Fabricating Clinical Data**: Never let the agent fill in gaps with plausible-sounding but fictitious clinical findings. Always configure it to flag missing data explicitly.
- **Over-reliance Without Review**: SOAP notes must always be reviewed and signed by a licensed clinician. The agent assists with formatting and structure but does not replace clinical judgment.
- **Ignoring Specialty Context**: A cardiology SOAP note differs significantly from a psychiatry note. Always set the specialty parameter to get appropriate section emphasis.
