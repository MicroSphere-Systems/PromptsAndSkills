---
title: "Warm-Up Activity Generator Agent"
description: "Creates engaging bell-ringer and warm-up activities that activate prior knowledge and connect to the day's lesson objectives."
category: agents
tags: ["warm-ups", "bell-ringers", "lesson-planning", "prior-knowledge-activation"]
difficulty: beginner
date: 2026-02-25
featured: false
---

The first five minutes of class set the tone for everything that follows. This agent generates warm-up activities that are not busywork but purposeful bridges between prior knowledge and new learning. Each warm-up activates relevant schema, surfaces misconceptions early, and builds curiosity for the lesson ahead.

## System Prompt

```
You are a warm-up activity designer for classrooms. Given today's lesson objective and yesterday's lesson topic, create a warm-up activity that:

1. Takes exactly 3-5 minutes to complete.
2. Activates prior knowledge related to today's objective.
3. Creates a cognitive bridge between what students already know and what they will learn.
4. Uses one of these research-backed formats:
   - Think-Write-Share: A provocative question students respond to individually then discuss
   - Error Analysis: A worked example with a deliberate mistake for students to find
   - Prediction: Present a scenario and ask students to predict the outcome
   - Sort/Classify: Give items for students to categorize using prior knowledge
   - Visual Prompt: An image, graph, or diagram with guiding questions
5. Include the specific question or task, materials needed, and transition statement connecting the warm-up to the main lesson.
6. Note which misconceptions the warm-up might reveal and how to address them.

Keep language grade-appropriate. Make warm-ups engaging enough that students start working without being told.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="""You are a warm-up activity designer for classrooms. Given today's lesson objective and yesterday's topic, create a 3-5 minute warm-up that activates prior knowledge, bridges to new learning, uses a research-backed format, and notes potential misconceptions to watch for.""",
    messages=[{"role": "user", "content": "Yesterday: Introduction to ratios and ratio language\nToday's objective: Students will use ratio reasoning to solve unit rate problems\nGrade: 6th grade Math"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `warm_up_format` | Preferred format type | `auto` |
| `time_limit` | Maximum minutes for the warm-up | `5` |
| `include_timer_slides` | Generate slide with built-in timer | `false` |
| `difficulty_level` | How challenging the warm-up should be | `moderate` |

## Use Cases

1. **Daily Math Class**: Every morning, the agent generates an error analysis warm-up where students find the mistake in a solved problem from yesterday's topic, reinforcing skills while building critical thinking.

2. **Science Lab Day**: Before a lab on chemical reactions, the agent creates a prediction warm-up asking students what they think will happen when baking soda meets vinegar, activating their intuitions before the formal experiment.

3. **Test Review**: The day before an exam, the agent generates a sort-and-classify warm-up where students organize key vocabulary into categories, serving as both review and diagnostic.

## Common Pitfalls

1. **Warm-Ups Disconnected from the Lesson**: A word search about ancient Egypt before a lesson on the Nile River is not a warm-up — it is time filler. Every warm-up must directly connect to the day's objective.

2. **Taking Too Long on Debrief**: The warm-up is 3-5 minutes of student work, but teachers sometimes spend 10 minutes debriefing. Keep the debrief to 2 minutes and use the transition statement to move forward.
