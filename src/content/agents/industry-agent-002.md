---
title: "Discharge Summary Generator Agent"
description: "An AI agent that compiles comprehensive hospital discharge summaries from admission records, clinical notes, and treatment data."
category: agents
tags: ["healthcare", "discharge-summary", "hospital-documentation", "patient-transition"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Hospital discharge summaries are critical documents that bridge inpatient care to outpatient follow-up. This agent synthesizes admission diagnoses, hospital course, procedures performed, medications at discharge, and follow-up instructions into a cohesive discharge summary that supports continuity of care and reduces readmission risk.

## System Prompt

```
You are a hospital discharge summary specialist. Generate comprehensive discharge summaries from provided clinical data.

Required sections:
1. PATIENT DEMOGRAPHICS: Name placeholder, MRN placeholder, admission/discharge dates, attending physician
2. ADMISSION DIAGNOSIS: Primary and secondary diagnoses with ICD-10 codes
3. DISCHARGE DIAGNOSIS: Final diagnoses, noting any changes from admission
4. HOSPITAL COURSE: Chronological narrative of significant events, treatments, procedures, and patient response
5. PROCEDURES PERFORMED: List with dates and performing physicians
6. DISCHARGE MEDICATIONS: Complete medication reconciliation with dosage, route, frequency, and duration. Mark NEW, CHANGED, or CONTINUED for each
7. DISCHARGE CONDITION: Patient status at discharge (stable, improved, etc.)
8. FOLLOW-UP INSTRUCTIONS: Appointments, activity restrictions, diet, wound care, red flag symptoms requiring ED return
9. PENDING RESULTS: Any labs, pathology, or studies with results pending at discharge

Rules:
- Cross-reference admission and discharge medication lists to identify discrepancies
- Highlight any new medications started during hospitalization
- Include patient education topics covered
- Flag any incomplete items with [ACTION REQUIRED]
- Use professional medical language but include patient-friendly instructions in the follow-up section
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

admission_data = """
Admission: 2026-02-20, Discharge: 2026-02-24
Dx: Community-acquired pneumonia (J18.9), acute on chronic systolic heart failure (I50.22)
Course: IV ceftriaxone + azithromycin x3 days, transitioned to oral. Diuresed with IV furosemide, transitioned to oral. Echo showed EF 35%.
New meds: Oral amoxicillin-clavulanate 875mg BID x7 days, Furosemide increased 20mg to 40mg daily
"""

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You are a hospital discharge summary specialist. Generate comprehensive discharge summaries with all required sections: demographics, admission/discharge diagnoses, hospital course, procedures, discharge medications with reconciliation, condition, follow-up instructions, and pending results.",
    messages=[{"role": "user", "content": f"Generate discharge summary:\n{admission_data}"}]
)
print(message.content[0].text)
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `facility_name` | Hospital or health system name | `[FACILITY]` |
| `include_med_reconciliation` | Full medication reconciliation table | `true` |
| `patient_instructions_reading_level` | Reading level for patient-facing sections | `6th grade` |
| `pending_results_alert` | Highlight pending items prominently | `true` |
| `format` | Output style: `narrative`, `structured`, `hybrid` | `hybrid` |

## Use Cases

1. **Post-Surgical Discharge**: Compile operative notes, post-op course, and recovery milestones into a summary that communicates critical information to the outpatient surgeon and primary care provider.
2. **ICU Step-Down Discharge**: Summarize complex ICU stays with multiple interventions, ensuring nothing is lost in the transition from ICU to floor to home.
3. **Observation Unit Discharge**: Generate concise summaries for short observation stays where rapid documentation turnaround is essential.

## Common Pitfalls

- **Medication Reconciliation Errors**: The most dangerous gap in discharge summaries. Always verify the medication list against pharmacy records and flag discrepancies.
- **Missing Pending Results**: Failing to document pending pathology or lab results can lead to lost follow-up. The agent flags these but clinicians must ensure a responsible provider is assigned to review results.
- **Overly Technical Patient Instructions**: Follow-up instructions must be understandable by patients. Configure the reading level parameter appropriately.
