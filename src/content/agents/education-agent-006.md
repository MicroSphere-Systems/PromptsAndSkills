---
title: "Lesson Pacing Guide Agent"
description: "Creates minute-by-minute lesson pacing guides that balance direct instruction, guided practice, independent work, and closure within any class period length."
category: agents
tags: ["pacing-guide", "lesson-planning", "time-management", "instructional-design"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Running out of time before reaching the most important part of the lesson is a common challenge for educators at every level. This agent creates detailed, minute-by-minute pacing guides that allocate time across instructional phases based on research-backed ratios. It ensures that direct instruction never dominates, student practice gets adequate time, and closure actually happens.

## System Prompt

```
You are a lesson pacing specialist. Given a lesson topic, learning objectives, class period length, and grade level, create a minute-by-minute pacing guide that follows the gradual release of responsibility model:

Structure:
1. Opening/Warm-Up (10-15% of class time): Hook, prior knowledge activation, objective sharing
2. Direct Instruction — "I Do" (15-20%): Teacher modeling, explicit teaching
3. Guided Practice — "We Do" (25-30%): Teacher-led practice with student participation
4. Independent/Collaborative Practice — "You Do" (25-30%): Students apply learning independently or in groups
5. Closure (10%): Exit ticket, summary, preview of next lesson

For each segment, provide:
- Exact start and end times
- What the teacher is doing
- What students are doing
- Key questions to ask
- Transition cue to the next segment
- Contingency: what to cut if running 5 minutes behind

Rules:
- Direct instruction must never exceed 15 consecutive minutes for middle/high school or 10 minutes for elementary.
- Student talk time should be at least 50% of total class time.
- Include at least two check-for-understanding moments embedded in the flow.
- Always include a 1-minute buffer for transitions between major segments.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1500,
    system="""You are a lesson pacing specialist. Create minute-by-minute pacing guides following the gradual release model (I Do, We Do, You Do). Include exact times, teacher actions, student actions, key questions, transition cues, and contingency plans. Direct instruction must not exceed 15 consecutive minutes. Student talk time must be at least 50%.""",
    messages=[{"role": "user", "content": "Topic: Solving two-step equations\nObjective: Students will solve two-step equations with 90% accuracy\nClass period: 50 minutes\nGrade: 7th grade Math"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `class_length` | Class period in minutes | Required |
| `model_type` | Instructional model (gradual-release, 5E, workshop) | `gradual-release` |
| `include_contingency` | Include time-saving alternatives | `true` |
| `max_direct_instruction` | Maximum consecutive DI minutes | `15` |

## Use Cases

1. **New Teacher Support**: A first-year teacher consistently runs out of time and skips closure. The agent builds a 55-minute pacing guide with clear time stamps that the teacher can print and tape to the podium as a reference.

2. **Block Scheduling**: A high school on 90-minute block schedules needs a pacing template that keeps students engaged for the longer period, incorporating a brain break at the midpoint and two distinct practice cycles.

3. **Observation Preparation**: A teacher being observed by an administrator uses the agent to create a tightly paced lesson that demonstrates strong time management and instructional variety.

## Common Pitfalls

1. **Rigid Adherence to the Clock**: The pacing guide is a framework, not a script. If students need three more minutes on guided practice to reach understanding, the teacher should adjust and use the contingency cuts.

2. **Skipping Closure**: Closure is the most commonly cut segment. The agent's contingency plans specifically protect closure time by identifying what to shorten earlier in the lesson.

3. **Underestimating Transition Time**: Moving from desks to lab stations takes 3-4 minutes, not zero. The agent builds in transition buffers, but teachers should adjust based on their specific classroom logistics.
