---
title: "Lesson Pacing Guide Generator Prompt"
description: "Creates minute-by-minute pacing guides for any class period length using the gradual release of responsibility model."
category: prompts
tags: ["pacing-guide", "time-management", "gradual-release", "lesson-structure"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Running out of time is the most common lesson execution problem. This prompt generates a detailed, minute-by-minute pacing guide that ensures direct instruction stays short, student practice gets protected time, and closure actually happens.

## Prompt

```
Create a minute-by-minute pacing guide for the following lesson.

Topic: {{topic}}
Learning Objective: {{objective}}
Class Period Length: {{period_length}} minutes
Grade Level: {{grade_level}}
Subject: {{subject}}
Instructional Model: {{model}}

Structure the pacing guide using the {{model}} framework. For each segment, provide:
- **Time Stamp**: Exact start and end times (e.g., 0:00-0:05)
- **Phase Name**: Name of the instructional phase
- **Teacher Actions**: What the teacher is doing
- **Student Actions**: What students are doing
- **Key Question**: One important question to ask during this phase
- **Transition Cue**: Signal to move to the next phase

Additional requirements:
- Direct instruction segments must not exceed 12 consecutive minutes for elementary or 15 for secondary
- Include at least two formative check-for-understanding moments
- Build in 1-minute transition buffers between major phase shifts
- Include a "running behind" contingency: what to shorten if 5 minutes are lost

End with a summary table showing the percentage of class time devoted to each phase.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `topic` | Lesson topic | `Comparing and contrasting characters in fiction` |
| `objective` | Learning objective | `Students will compare two characters using textual evidence in a Venn diagram` |
| `period_length` | Class length in minutes | `50` |
| `grade_level` | Grade level | `4th grade` |
| `subject` | Subject area | `English Language Arts` |
| `model` | Instructional framework | `Gradual Release (I Do, We Do, You Do)` |

## Example Output

| Time | Phase | Teacher | Students | Key Question |
|------|-------|---------|----------|--------------|
| 0:00-0:05 | Warm-Up | Circulates, monitors | Quick-write: "What makes a character interesting?" | "What did you notice about yourself as a reader?" |
| 0:05-0:07 | Objective & Agenda | Posts and reads objective | Read objective, preview agenda | -- |
| 0:07-0:17 | I Do (Modeling) | Models character comparison using a think-aloud with a projected text | Watch, take notes on anchor chart | "What evidence am I using to support this comparison?" |
| 0:17-0:18 | Transition | Distributes Venn diagrams | Move to partner seating | -- |
| 0:18-0:30 | We Do (Guided) | Guides class through one comparison together | Contribute ideas, fill in shared Venn diagram | "How is this character's motivation different from the other's?" |
| 0:30-0:31 | Transition | Gives independent directions | Read directions | -- |
| 0:31-0:43 | You Do (Independent) | Confers with individual students | Complete Venn diagram independently with new character pair | "What text evidence supports that trait?" |
| 0:43-0:48 | Closure | Facilitates share-out | Share one comparison with partner, then one pair shares with class | "What was the most surprising similarity you found?" |
| 0:48-0:50 | Exit Ticket | Collects tickets | Complete 2-question exit ticket | -- |

**Running Behind Contingency**: If 5 minutes behind by the We Do phase, reduce independent practice from 12 to 8 minutes and combine closure with exit ticket into a 3-minute written reflection.

## Variations

1. **Block Schedule**: Set period_length to 90 and add "Include a brain break at the midpoint and two practice cycles" for block scheduling.
2. **5E Model**: Change the model to "5E (Engage, Explore, Explain, Elaborate, Evaluate)" for inquiry-based science lessons.
3. **Workshop Model**: Use "Workshop (Mini-Lesson, Work Time, Mid-Workshop, Share)" for reader's or writer's workshop formats.

## Best Model

Claude Sonnet 4.6 handles pacing guides well. The structured output format makes this a reliable task for mid-tier models.
