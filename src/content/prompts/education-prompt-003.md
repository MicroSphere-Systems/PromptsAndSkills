---
title: "Exit Ticket Question Generator Prompt"
description: "Creates quick formative assessment exit ticket questions matched to specific lesson objectives with scoring criteria."
category: prompts
tags: ["exit-tickets", "formative-assessment", "lesson-planning", "quick-checks"]
difficulty: beginner
date: 2026-02-25
featured: false
---

Exit tickets should take three to five minutes and tell you exactly who got it and who did not. This prompt generates exit ticket questions that are tightly aligned to the lesson objective, appropriately brief, and include a quick-sort scoring guide for immediate instructional decisions.

## Prompt

```
Create an exit ticket for the following lesson.

Lesson Objective: {{objective}}
Grade Level: {{grade_level}}
Subject: {{subject}}
Time Available: {{time_limit}} minutes

Generate:
1. **Question 1 (Selected Response)**: A multiple-choice or true/false question that assesses the core concept. Include the correct answer and a brief explanation of why each distractor is wrong.
2. **Question 2 (Constructed Response)**: A short-answer question requiring students to explain, apply, or demonstrate the skill in 2-3 sentences.
3. **Quick-Sort Scoring Guide**:
   - **Got It** (Green): Description of what a fully proficient response looks like
   - **Almost** (Yellow): Description of partial understanding with specific indicators
   - **Not Yet** (Red): Description of significant misunderstanding with specific indicators
4. **Next-Day Response Plan**:
   - Green group: Suggested extension or enrichment activity
   - Yellow group: Targeted reteaching focus
   - Red group: Specific intervention approach

Keep all questions at the same Bloom's level as the objective or one level below. The exit ticket should be completable in {{time_limit}} minutes by an average student.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `objective` | The lesson's learning objective | `Students will identify the main idea and two supporting details in an informational text` |
| `grade_level` | Student grade level | `4th grade` |
| `subject` | Subject area | `English Language Arts` |
| `time_limit` | Minutes available for the exit ticket | `4` |

## Example Output

**Question 1 (Selected Response)**:
Read the paragraph below. What is the main idea?

"Honeybees are essential to agriculture. They pollinate over 80% of flowering crops, including apples, almonds, and blueberries. Without honeybees, grocery stores would lose about one-third of their products."

A) Honeybees make honey. (Incorrect — this is a true fact but not the main idea of this paragraph)
B) Honeybees are important for growing food. (Correct — this captures the central message)
C) Grocery stores sell many products. (Incorrect — this is a detail, not the main idea)
D) Almonds come from trees. (Incorrect — not discussed in the paragraph)

**Question 2 (Constructed Response)**:
In 2-3 sentences, explain the main idea of the paragraph above and list two details the author uses to support it.

**Quick-Sort Scoring Guide**:
- **Got It**: Correctly identifies the main idea AND lists two relevant supporting details
- **Almost**: Identifies the main idea OR supporting details but not both; may confuse a detail for the main idea
- **Not Yet**: Cannot identify the main idea; may copy a random sentence from the text

## Variations

1. **Digital Format**: Add "Format for Google Forms with automatic scoring for the selected-response question" to get a ready-to-deploy digital exit ticket.
2. **Visual Exit Ticket**: For younger students, add "Use a visual format such as a picture sort or drawing prompt" to make the ticket more accessible.
3. **Self-Assessment Combo**: Add "Include a brief student self-assessment scale (1-4) alongside the content questions" to build metacognitive skills.

## Best Model

Claude Sonnet 4.6 handles this efficiently. The task is well-structured and does not require the reasoning depth of a larger model.
