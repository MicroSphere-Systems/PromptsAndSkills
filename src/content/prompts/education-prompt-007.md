---
title: "Cross-Curricular Lesson Integration Prompt"
description: "Identifies authentic connections between two subject areas and designs integrated activities that serve learning objectives in both disciplines."
category: prompts
tags: ["cross-curricular", "interdisciplinary", "integrated-learning", "lesson-planning"]
difficulty: advanced
date: 2026-02-25
featured: false
---

Cross-curricular integration is powerful when authentic and counterproductive when forced. This prompt finds genuine intersection points between two subjects and designs activities where both disciplines are meaningfully represented and assessed.

## Prompt

```
Design a cross-curricular activity connecting two subjects.

Primary Subject: {{primary_subject}}
Primary Topic: {{primary_topic}}
Primary Objective: {{primary_objective}}
Secondary Subject: {{secondary_subject}}
Secondary Topic (if known): {{secondary_topic}}
Grade Level: {{grade_level}}
Time Available: {{duration}}

Your task:
1. Identify the most authentic connection between these two subjects for this topic. Explain WHY the connection is natural, not forced.
2. Design an integrated activity that:
   - Serves a learning objective in BOTH subjects (state both objectives explicitly)
   - Requires skills from both disciplines to complete
   - Could not be split into two separate single-subject activities without losing value
3. Provide:
   - Activity title and description
   - Step-by-step student directions
   - Materials needed
   - Assessment approach that captures learning in both subjects
   - How to coordinate with the other subject's teacher (if departmentalized)

Quality check — the activity fails if:
- One subject is merely decoration for the other
- The activity could work just as well without one of the subjects
- Skills from one subject are trivial (e.g., "count the items" as math integration)
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `primary_subject` | Main subject area | `8th Grade Science` |
| `primary_topic` | Topic in the primary subject | `Climate change and greenhouse effect` |
| `primary_objective` | Learning objective for primary subject | `Students will explain how greenhouse gases trap heat in the atmosphere` |
| `secondary_subject` | Subject to integrate with | `Mathematics` |
| `secondary_topic` | Optional topic in secondary subject | `Data analysis and graphing` |
| `grade_level` | Grade level | `8th grade` |
| `duration` | Available time | `60 minutes` |

## Example Output

**Activity Title**: "Carbon Footprint Data Investigation"

**Why This Connection Is Authentic**: Understanding climate change requires interpreting real data — temperature trends, CO2 concentrations, and emissions by sector. The math skills of data analysis, graphing, and trend identification are not add-ons; they are essential tools for understanding the science.

**Science Objective**: Students will explain how increasing CO2 concentration correlates with rising global temperatures using data evidence.

**Math Objective**: Students will create scatter plots from real-world data sets, identify trends, and use line of best fit to make predictions.

**Activity Description**: Students receive 50 years of atmospheric CO2 and global temperature data. They create scatter plots, calculate the line of best fit, predict future temperatures based on the trend, and write a scientific explanation connecting greenhouse gas mechanisms to the data patterns they observe.

## Variations

1. **Three-Subject Integration**: Add a third subject (e.g., ELA through a written report or presentation component) for a more ambitious project.
2. **PBL Extension**: Add "Extend this into a week-long project-based learning experience with a public product" for deeper integration.
3. **Elementary Self-Contained**: Add "Design for a single teacher teaching both subjects" to simplify the coordination aspect.

## Best Model

Claude Opus 4.6 is recommended for cross-curricular integration because identifying authentic connections requires nuanced reasoning about disciplinary boundaries and practices.
