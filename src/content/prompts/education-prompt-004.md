---
title: "Differentiated Activity Design Prompt"
description: "Creates three-tiered learning activities at approaching, on-level, and advanced levels for the same learning objective."
category: prompts
tags: ["differentiation", "tiered-activities", "lesson-planning", "scaffolding"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Differentiation does not mean different objectives — it means different pathways to the same destination. This prompt generates three versions of an activity that all target the same learning objective but adjust scaffolding, complexity, and cognitive demand for students at different readiness levels.

## Prompt

```
Design a tiered activity for the following lesson.

Learning Objective: {{objective}}
Subject: {{subject}}
Grade Level: {{grade_level}}
Activity Duration: {{duration}}
Available Materials: {{materials}}

Create three versions of the same activity:

**Tier 1 — Approaching Grade Level**:
- Include explicit scaffolds: sentence frames, graphic organizers, word banks, worked examples, or manipulatives
- Reduce the number of variables or steps
- Use concrete before abstract representations
- Provide clear, chunked directions

**Tier 2 — On Grade Level**:
- Match the objective directly without extra scaffolds
- Include moderate complexity and some choice
- Use grade-level academic vocabulary
- Expect standard levels of independence

**Tier 3 — Advanced**:
- Remove scaffolds and increase open-endedness
- Add complexity through real-world application, multiple variables, or cross-disciplinary connections
- Require higher-order thinking: justify, evaluate, create, or design
- Include extension challenges for early finishers

For each tier, provide:
1. Activity description (step-by-step what students do)
2. Materials needed
3. Success criteria
4. How a teacher can assess this tier

Important: All three tiers must address the SAME learning objective. The core task stays the same; only the support and complexity change.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `objective` | The shared learning objective | `Students will determine the area of composite shapes by decomposing them into rectangles and triangles` |
| `subject` | Subject area | `6th Grade Math` |
| `grade_level` | Grade level | `6th grade` |
| `duration` | Time available for the activity | `20 minutes` |
| `materials` | Available classroom materials | `Graph paper, rulers, scissors, calculators` |

## Example Output

**Tier 1 — Approaching**:
Students receive a worksheet with three composite shapes where the decomposition lines are already drawn. A word bank provides the area formulas. Students label each sub-shape, calculate each area using the formula bank, and sum the parts. A worked example is provided at the top.

**Tier 2 — On Level**:
Students receive three composite shapes without decomposition lines. They must decide how to break each shape apart, draw their own decomposition lines, calculate sub-areas, and find the total. Formulas are available on a reference sheet but no worked example is given.

**Tier 3 — Advanced**:
Students design a floor plan for a tiny house with at least four rooms using only composite shapes. They must calculate the total floor area, determine flooring costs at $3.50 per square foot, and write a justification for their design choices. No formulas are provided — students must recall or derive them.

## Variations

1. **ELL Integration**: Add "Include English Language Learner supports across all tiers, such as visual aids and bilingual vocabulary" for linguistically diverse classrooms.
2. **Choice Board Format**: Add "Present all three tiers as a choice board where students self-select their level" to promote student agency.
3. **Collaborative Tiers**: Add "Design Tier 2 as a partner activity and Tier 3 as an individual challenge" to vary social structures across tiers.

## Best Model

Claude Sonnet 4.6 works well for generating tiered activities. For subjects requiring deep content expertise (AP-level or specialized topics), Claude Opus 4.6 may produce more nuanced differentiation.
