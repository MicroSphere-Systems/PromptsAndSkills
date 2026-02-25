---
title: "Bloom's Taxonomy Objective Rewriter Prompt"
description: "Transforms vague lesson objectives into precise, measurable objectives aligned to specific Bloom's Taxonomy cognitive levels."
category: prompts
tags: ["blooms-taxonomy", "learning-objectives", "lesson-planning", "measurable-outcomes"]
difficulty: beginner
date: 2026-02-25
featured: false
---

Many lesson objectives use vague language that makes them impossible to assess. This prompt takes imprecise objectives and rewrites them with Bloom's-aligned action verbs, clear conditions, and measurable criteria, turning "students will understand photosynthesis" into something a teacher can actually observe and evaluate.

## Prompt

```
You are an expert instructional designer specializing in Bloom's Taxonomy alignment.

I will provide a lesson objective that may be vague or unmeasurable. Your task:

1. Identify the current Bloom's level (if determinable) and explain why the objective is weak.
2. Rewrite the objective at the SAME Bloom's level using a precise, measurable action verb.
3. Provide TWO additional versions at HIGHER Bloom's levels to show how the objective could be elevated.
4. Each rewritten objective must include:
   - A measurable action verb from Bloom's Taxonomy
   - The specific content or skill being addressed
   - Conditions under which the student will perform (e.g., "given a data set")
   - Criteria for success (e.g., "with at least 3 supporting details")

Subject: {{subject}}
Grade Level: {{grade_level}}
Original Objective: {{original_objective}}
Target Bloom's Level (optional): {{target_level}}

Format your response as:
**Original Analysis**: [why the current objective is weak]
**Same-Level Rewrite**: [improved version at the same cognitive level]
**Elevated Version 1**: [higher Bloom's level] - [rewritten objective]
**Elevated Version 2**: [even higher Bloom's level] - [rewritten objective]
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `subject` | The subject area of the lesson | `7th Grade Science` |
| `grade_level` | Target grade level | `7th grade` |
| `original_objective` | The vague objective to improve | `Students will understand the water cycle` |
| `target_level` | Optional specific Bloom's level to target | `Analyze` |

## Example Output

**Original Analysis**: "Students will understand the water cycle" uses the verb "understand," which is not directly observable or measurable. A teacher cannot see "understanding" — they can only see evidence of it through specific behaviors.

**Same-Level Rewrite (Understand)**: Given a diagram of the water cycle, 7th-grade students will explain the role of evaporation, condensation, and precipitation in their own words, correctly describing at least three transitions between states.

**Elevated Version 1 (Apply)**: Given real-time weather data for their region, 7th-grade students will predict which stages of the water cycle are most active and justify their predictions using at least two data points.

**Elevated Version 2 (Evaluate)**: After reviewing two competing models of local water cycle disruption, 7th-grade students will evaluate which model better explains observed drought patterns, citing at least three pieces of evidence to defend their position.

## Variations

1. **Bulk Rewriting**: Provide a list of 5-10 objectives from an entire unit and ask for all of them to be rewritten, ensuring the unit spans multiple Bloom's levels.
2. **Backward from Assessment**: Provide an existing test question and ask the prompt to write the objective that the question actually assesses, revealing misalignments.
3. **IEP-Specific**: Add "Modify for a student with [specific learning need]" to generate objectives with appropriate accommodations built in.

## Best Model

Claude Sonnet 4.6 handles this task efficiently. The structured nature of Bloom's Taxonomy makes it well-suited for a mid-tier model, though Claude Opus 4.6 may produce more nuanced analysis for ambiguous objectives in specialized subjects.
