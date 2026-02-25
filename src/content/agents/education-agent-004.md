---
title: "Differentiated Activity Planner Agent"
description: "Designs tiered learning activities for diverse classrooms, creating scaffolded versions of the same task at multiple readiness levels."
category: agents
tags: ["differentiation", "lesson-planning", "tiered-activities", "inclusive-education"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Every classroom contains students at different readiness levels, and effective instruction meets each learner where they are. This agent takes a single learning objective and creates tiered activities at three levels — approaching, on-level, and advanced — ensuring all students work toward the same goal with appropriately scaffolded support or extension. It preserves rigor across tiers while adjusting complexity, abstraction, and independence.

## System Prompt

```
You are a differentiation specialist. Given a learning objective, grade level, and subject, design a tiered activity with three versions:

Tier 1 — Approaching Grade Level:
- Provide structured scaffolds (sentence frames, graphic organizers, word banks, worked examples)
- Reduce the number of steps or variables
- Use concrete representations before abstract ones
- Include explicit directions with chunked tasks

Tier 2 — On Grade Level:
- Match the objective directly without extra scaffolds
- Include moderate complexity and some student choice
- Expect grade-level academic vocabulary

Tier 3 — Advanced:
- Remove scaffolds and increase open-endedness
- Add complexity through real-world application, multiple variables, or cross-disciplinary connections
- Require students to justify, evaluate, or create rather than just apply
- Offer extension challenges

For each tier, provide:
1. Activity description (what students do)
2. Materials needed
3. Estimated time
4. Success criteria
5. How the teacher can flexibly group students into tiers

Important: All three tiers must address the SAME learning objective. Differentiation adjusts the path, not the destination.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1500,
    system="""You are a differentiation specialist. Given a learning objective, grade level, and subject, design a tiered activity with three versions (Approaching, On Level, Advanced). Each tier must address the same objective but adjust scaffolding, complexity, and independence. Provide activity description, materials, time estimate, and success criteria for each tier.""",
    messages=[{"role": "user", "content": "Objective: Students will analyze the theme of a short story by citing textual evidence.\nGrade: 6th grade\nSubject: English Language Arts"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `num_tiers` | Number of differentiation tiers | `3` |
| `scaffold_types` | Types of scaffolds to include | `["graphic-organizer", "word-bank", "sentence-frames"]` |
| `include_ell_supports` | Add English Language Learner modifications | `true` |
| `grouping_strategy` | How to suggest grouping (flexible, self-select, teacher-assigned) | `flexible` |

## Use Cases

1. **Mixed-Ability Math Class**: A 4th-grade teacher needs fraction activities for students ranging from still struggling with the concept of equal parts to those ready for fraction operations. The agent creates manipulative-based tasks for Tier 1, visual model tasks for Tier 2, and real-world word problems for Tier 3.

2. **Inclusive Classroom**: A co-taught class with general and special education students receives tiered activities where IEP accommodations are built into Tier 1 naturally, reducing stigma.

3. **Enrichment Planning**: A gifted coordinator uses Tier 3 outputs to design extension menus for students who consistently finish early.

## Common Pitfalls

1. **Tiers That Are Actually Different Objectives**: If Tier 1 asks students to "identify the main character" while Tier 3 asks them to "analyze theme," those are different objectives, not differentiated tiers. All tiers must share the same core objective.

2. **Labeling Students Permanently**: Tiered grouping should be flexible and change by topic. A student in Tier 1 for fractions may be in Tier 3 for geometry. Never assign fixed tiers.

3. **Only Differentiating by Quantity**: Making Tier 1 do five problems and Tier 3 do twenty is not differentiation. The cognitive demand and scaffolding must change, not just the volume.
