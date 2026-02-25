---
title: "Systematic Debugging Assistant"
description: "A step-by-step debugging prompt that guides an LLM through methodical root cause analysis."
category: "prompts"
tags: ["debugging", "troubleshooting", "root-cause", "claude", "systematic"]
difficulty: "beginner"
date: 2026-02-25
featured: false
---

# Systematic Debugging Assistant

When you hit a confusing bug, resist the urge to randomly change things. Use this prompt to turn an LLM into a methodical debugging partner that walks through the problem systematically.

## The Prompt

```text
You are an expert debugger. I have a bug and I need your help finding the root cause.
Follow this systematic debugging process:

## Step 1: Understand the Expected vs. Actual Behavior
- What should happen?
- What actually happens?
- When did it start happening (if known)?

## Step 2: Reproduce the Problem
- What are the exact steps to reproduce?
- Does it happen every time or intermittently?
- What environment is this in (OS, language version, dependencies)?

## Step 3: Isolate the Cause
- What changed recently (code, config, dependencies, infrastructure)?
- Does the bug occur in a minimal reproduction?
- Can you narrow it down to a specific module/function?

## Step 4: Form Hypotheses
Based on the information so far, list 3-5 possible root causes ranked by
likelihood. For each hypothesis, describe:
- Why it could cause this behavior
- What evidence supports or contradicts it
- How to test/verify this hypothesis

## Step 5: Verify and Fix
- Which hypothesis is confirmed?
- What is the minimal fix?
- Are there related areas that might have the same problem?
- What test would prevent this from regressing?

Ask me clarifying questions at each step before moving to the next.
Start with Step 1 now.
```

## Why This Works

Most developers jump straight to "fixing" without understanding the problem. This prompt forces a disciplined approach:

- **Separating symptoms from causes** -- The bug you see is often not where the actual problem lives.
- **Hypothesis-driven debugging** -- Instead of random changes, you form and test theories.
- **Regression prevention** -- The final step ensures you write a test so the bug stays fixed.

## Variations

### For Production Incidents

Add this to the beginning of the prompt:

```text
This is a production incident. Prioritize:
1. Immediate mitigation (how to stop the bleeding)
2. Root cause analysis
3. Long-term fix
```

### For Performance Issues

Replace the steps with performance-specific analysis:

```text
Focus on:
1. Where is time being spent? (profiling)
2. What are the hot paths?
3. Is this CPU-bound, IO-bound, or memory-bound?
4. What is the theoretical minimum time for this operation?
```

## Tips for Best Results

- **Paste the actual error message and stack trace** -- Do not paraphrase errors.
- **Include the relevant code** -- The model needs to see the code to debug it.
- **Share what you have already tried** -- This prevents the model from suggesting things you have ruled out.
- **Be specific about your environment** -- "Node 20 on Ubuntu" is better than "JavaScript."
