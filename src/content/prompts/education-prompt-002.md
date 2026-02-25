---
title: "ABCD Learning Objective Builder Prompt"
description: "Generates complete learning objectives following the Audience-Behavior-Condition-Degree framework with standards alignment."
category: prompts
tags: ["ABCD-framework", "learning-objectives", "standards-alignment", "lesson-planning"]
difficulty: beginner
date: 2026-02-25
featured: false
---

The ABCD framework ensures every learning objective specifies who will learn, what they will do, under what conditions, and to what degree of proficiency. This prompt generates complete objectives that pass the "can I actually assess this?" test.

## Prompt

```
Generate {{num_objectives}} learning objectives for the following lesson using the ABCD framework.

Topic: {{topic}}
Subject: {{subject}}
Grade Level: {{grade_level}}
Standards (if applicable): {{standards}}
Lesson Duration: {{duration}}

For each objective, clearly label:
- **A (Audience)**: Who is the learner?
- **B (Behavior)**: What observable action will the learner perform? Use a measurable verb.
- **C (Condition)**: Under what circumstances or with what resources?
- **D (Degree)**: What is the minimum acceptable performance level?

Requirements:
- Use only observable, measurable verbs (never "understand," "know," "learn," or "appreciate")
- Span at least two different Bloom's Taxonomy levels across the set of objectives
- Each objective must be assessable within the stated lesson duration
- If standards are provided, include the standard code in brackets before each objective

Output each objective as a single, well-crafted sentence that incorporates all four ABCD components naturally.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `num_objectives` | Number of objectives to generate | `4` |
| `topic` | Lesson topic | `Adding and subtracting fractions with unlike denominators` |
| `subject` | Subject area | `5th Grade Mathematics` |
| `grade_level` | Grade level | `5th grade` |
| `standards` | Relevant standards codes | `CCSS.MATH.CONTENT.5.NF.A.1` |
| `duration` | Lesson length | `45 minutes` |

## Example Output

1. [CCSS.MATH.CONTENT.5.NF.A.1] (Apply) Given two fractions with unlike denominators, 5th-grade students will find equivalent fractions with a common denominator and compute the sum or difference, solving at least 8 out of 10 problems correctly.

2. [CCSS.MATH.CONTENT.5.NF.A.1] (Understand) Using visual fraction models, 5th-grade students will explain why finding a common denominator is necessary before adding fractions, providing a written explanation that includes at least one concrete example.

3. [CCSS.MATH.CONTENT.5.NF.A.2] (Apply) Given a word problem involving the addition or subtraction of fractions with unlike denominators, 5th-grade students will solve the problem and express the answer in simplest form, correctly solving at least 3 out of 4 problems.

4. [CCSS.MATH.CONTENT.5.NF.A.1] (Analyze) After solving a set of fraction addition problems, 5th-grade students will identify and correct errors in two worked examples, accurately describing the mistake and providing the correct solution for both.

## Variations

1. **Differentiated Objectives**: Add "Generate one objective at each tier: approaching, on-level, and advanced" to create tiered objectives for the same topic.
2. **Assessment-First**: Provide the assessment first and ask the prompt to reverse-engineer objectives that match what is actually being tested.
3. **Student-Friendly Language**: Add "Also provide a student-facing version of each objective using 'I can' statements" for posting on the board.

## Best Model

Claude Sonnet 4.6 is ideal for this structured generation task. The clear framework and constraints make it unnecessary to use a larger model.
