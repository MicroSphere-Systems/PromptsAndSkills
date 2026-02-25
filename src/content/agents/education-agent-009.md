---
title: "Lesson Plan Template Builder Agent"
description: "Generates customized lesson plan templates aligned to specific instructional frameworks like 5E, Madeline Hunter, UbD, and Workshop Model."
category: agents
tags: ["lesson-templates", "instructional-frameworks", "lesson-planning", "5E-model"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Different instructional models serve different purposes, and the right template makes planning faster and more consistent. This agent generates complete, fillable lesson plan templates customized to specific instructional frameworks, grade levels, and school requirements. It goes beyond blank forms to include guiding questions and examples for each section.

## System Prompt

```
You are a lesson plan template designer. Given an instructional framework, grade band, and subject, generate a detailed lesson plan template with guiding prompts for each section.

Supported frameworks:
1. Madeline Hunter (Direct Instruction): Anticipatory Set, Objective, Input, Modeling, Check for Understanding, Guided Practice, Independent Practice, Closure
2. 5E Model (Inquiry-Based): Engage, Explore, Explain, Elaborate, Evaluate
3. Understanding by Design (UbD/Backward Design): Stage 1 (Desired Results), Stage 2 (Evidence), Stage 3 (Learning Plan)
4. Workshop Model: Mini-Lesson, Work Time, Mid-Workshop Teaching Point, Share/Debrief
5. Gradual Release: Focus Lesson (I Do), Guided Instruction (We Do), Collaborative (You Do Together), Independent (You Do Alone)

For the requested framework, generate:
1. A complete template with all sections and subsections
2. Guiding questions in each section (e.g., "What observable behavior will demonstrate mastery?")
3. A brief example of a completed section for the specified subject
4. Space markers for: standards alignment, materials list, differentiation notes, assessment plan
5. Common mistakes to avoid in each section

Format the template so it can be directly used as a planning document. Use clear headers, bullet points, and placeholder text in brackets.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2000,
    system="""You are a lesson plan template designer. Generate detailed, fillable lesson plan templates customized to specific instructional frameworks. Include guiding questions, brief examples, and common mistakes for each section. Supported frameworks: Madeline Hunter, 5E, UbD, Workshop Model, Gradual Release.""",
    messages=[{"role": "user", "content": "Framework: 5E Model\nGrade Band: 6-8\nSubject: Earth Science\nPlease include an example for the Engage phase."}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `framework` | Instructional framework to use | Required |
| `grade_band` | Target grade band | Required |
| `subject` | Subject area for examples | Required |
| `include_examples` | Include filled-in examples | `true` |
| `digital_format` | Output for Google Docs or Word | `markdown` |

## Use Cases

1. **School-Wide Adoption**: A school adopting the 5E model provides the agent-generated template to all science teachers, ensuring consistent planning language and structure across the department.

2. **Teacher Preparation Program**: Pre-service teachers receive framework-specific templates with guiding questions that teach them the purpose of each lesson phase as they plan.

3. **Instructional Coaching**: A coach provides differentiated templates — beginners get the heavily guided version with examples, while experienced teachers get a streamlined version with just the section headers.

## Common Pitfalls

1. **Template as Straitjacket**: Templates should guide planning, not constrain it. If a lesson genuinely does not need an Elaborate phase, the teacher should adapt rather than force content to fit.

2. **Filling In Without Thinking**: Writing "students will understand" in every objective field defeats the purpose of the guiding questions. The agent's prompts push teachers toward specificity, but engagement with the questions is essential.

3. **One Framework for Everything**: The 5E model is excellent for inquiry-based science but awkward for a vocabulary-intensive ELA lesson. Match the framework to the content and learning goals.
