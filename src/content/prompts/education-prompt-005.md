---
title: "Bell Ringer and Warm-Up Generator Prompt"
description: "Generates engaging warm-up activities that activate prior knowledge and create cognitive bridges to the day's lesson."
category: prompts
tags: ["warm-ups", "bell-ringers", "prior-knowledge", "lesson-openers"]
difficulty: beginner
date: 2026-02-25
featured: false
---

A good warm-up primes the brain for learning. This prompt creates purposeful bell-ringer activities that are not busywork — they connect yesterday's learning to today's objective and surface misconceptions early enough to address them during instruction.

## Prompt

```
Create a warm-up activity for the start of class.

Today's Lesson Objective: {{todays_objective}}
Yesterday's Topic: {{yesterdays_topic}}
Grade Level: {{grade_level}}
Subject: {{subject}}
Available Time: {{time}} minutes

Design a warm-up that:
1. Takes exactly {{time}} minutes for students to complete independently
2. Activates prior knowledge from {{yesterdays_topic}}
3. Builds a bridge to {{todays_objective}}
4. Uses one of these formats:
   - **Think-Write-Share**: A thought-provoking question students answer individually then discuss
   - **Error Analysis**: A worked example with a deliberate mistake to find and fix
   - **Prediction**: A scenario where students predict what will happen based on prior knowledge
   - **Quick Sort**: Items to classify using concepts from previous lessons
   - **Visual Prompt**: An image, graph, or data set with 2-3 guiding questions

Provide:
- The specific warm-up task with all content included (not just a description)
- Expected student responses (correct and common misconceptions)
- A 30-second transition statement connecting the warm-up to today's lesson
- One question to ask during the warm-up debrief

Format the warm-up so it could be projected on a screen or printed as-is.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `todays_objective` | Today's learning objective | `Students will solve one-step inequalities and graph solutions on a number line` |
| `yesterdays_topic` | What was taught in the previous lesson | `Solving one-step equations using inverse operations` |
| `grade_level` | Student grade level | `7th grade` |
| `subject` | Subject area | `Mathematics` |
| `time` | Minutes for the warm-up | `4` |

## Example Output

**Format: Error Analysis**

**Directions**: Marcus solved the equation below. Find his mistake, explain what he did wrong, and solve it correctly.

Marcus's work:
```
3x + 7 = 22
3x + 7 - 7 = 22
3x = 22
x = 22/3
x = 7.33
```

**Expected correct response**: Marcus forgot to subtract 7 from both sides. The second line should read 3x + 7 - 7 = 22 - 7, giving 3x = 15, so x = 5.

**Common misconception to watch for**: Students who say "Marcus divided wrong" have not identified the real error (failing to apply the operation to both sides).

**Transition statement**: "You just found an error in equation-solving. Today, we are going to use those same inverse operation skills, but instead of equations with an equals sign, we will work with inequalities using greater-than and less-than symbols."

## Variations

1. **Spiral Review**: Replace the "yesterday's topic" connection with "a topic from two weeks ago" to create spaced retrieval warm-ups.
2. **Student-Created**: Add "Design the warm-up so that students create the error analysis problem for a partner" to increase engagement.
3. **Data-Driven**: Add "Base the warm-up on common errors from yesterday's exit ticket data" and provide specific error patterns.

## Best Model

Claude Sonnet 4.6 is well-suited for this task. Warm-up generation is straightforward and benefits from speed over depth.
