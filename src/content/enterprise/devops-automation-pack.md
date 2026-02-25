---
title: "DevOps AI Automation Pack"
description: "AI-powered workflows for incident response, infrastructure review, deployment analysis, and runbook generation."
category: "enterprise"
tags: ["enterprise", "devops", "automation", "incident-response", "infrastructure"]
difficulty: "advanced"
date: 2026-02-25
featured: false
---

# DevOps AI Automation Pack

A collection of AI prompts and workflows for DevOps teams looking to automate incident analysis, infrastructure reviews, and operational documentation.

## What's Included

### 1. Incident Analysis Prompt

When an incident occurs, use this prompt to quickly analyze logs and identify root causes.

```text
You are a senior SRE analyzing a production incident. I will provide logs,
metrics, and context. Perform a structured analysis:

## 1. Timeline
Reconstruct the sequence of events with timestamps.

## 2. Blast Radius
- Which services are affected?
- How many users are impacted?
- Is the issue spreading?

## 3. Root Cause Hypotheses
List 3-5 possible causes ranked by likelihood. For each:
- Evidence supporting this hypothesis
- Evidence against it
- How to confirm or rule it out

## 4. Immediate Mitigation
What can we do right now to stop the bleeding? Options:
- Rollback (is the last deploy suspect?)
- Feature flag toggle
- Scale up resources
- Failover to secondary

## 5. Post-Incident Actions
- What monitoring gaps allowed this to go undetected?
- What runbook should be created or updated?
- What architectural change would prevent recurrence?

Incident context:
```

### 2. Infrastructure Review Prompt

Analyze Terraform, CloudFormation, or Kubernetes configs for issues.

```text
You are an infrastructure security reviewer. Analyze the following
infrastructure-as-code configuration and identify:

## Security Issues
- Overly permissive IAM policies or security groups
- Unencrypted storage or data in transit
- Public exposure of internal services
- Missing audit logging

## Reliability Concerns
- Single points of failure
- Missing health checks or auto-recovery
- Insufficient redundancy
- No backup configuration

## Cost Optimization
- Oversized instances or resources
- Resources that could use spot/preemptible instances
- Unused or orphaned resources
- Missing auto-scaling configuration

## Best Practices
- Tagging strategy compliance
- Naming convention consistency
- Module usage and DRY violations

For each finding, provide severity (critical/warning/info) and a specific fix.

Configuration:
```

### 3. Deployment Risk Assessment

Evaluate a deployment before it goes out.

```text
Assess the risk of this deployment based on the following information:

Changes included:
[paste PR descriptions or changelog]

Deployment context:
- Time: [day/time]
- Last deployment: [when]
- On-call engineer: [name]
- Feature flags available: [yes/no]

Evaluate:
1. **Change risk** -- How likely are these changes to cause issues?
   (database migrations, API changes, new dependencies)
2. **Timing risk** -- Is this a risky time to deploy?
   (Friday evening, during high traffic, near a holiday)
3. **Rollback plan** -- Can this be easily rolled back?
4. **Monitoring readiness** -- Will we know quickly if something goes wrong?

Return a risk score (low/medium/high) with reasoning and a go/no-go recommendation.
```

### 4. Runbook Generator

Automatically generate operational runbooks from incident postmortems.

```text
Based on the following incident postmortem, generate an operational runbook
that on-call engineers can follow if this issue recurs.

The runbook must include:

## Title and Trigger
- Clear title describing the scenario
- What alerts or symptoms indicate this runbook should be used

## Diagnosis Steps
1. Step-by-step commands to confirm the issue
2. Expected output at each step
3. Decision tree: if X, go to step Y

## Mitigation Steps
1. Ordered steps to resolve the issue
2. Each step should include the exact command or action
3. Include rollback instructions if a step makes things worse

## Verification
- How to confirm the issue is resolved
- What metrics or logs to monitor after resolution

## Escalation
- When to escalate (time limit, severity threshold)
- Who to contact and how

Incident postmortem:
```

## Integration Architecture

```text
Alert Fires (PagerDuty/Opsgenie)
    |
    v
[Log Aggregator] -- pulls recent logs from Datadog/Splunk/ELK
    |
    v
[AI Analyzer] -- runs incident analysis prompt
    |
    v
[Slack Bot] -- posts analysis summary to incident channel
    |
    v
[Runbook Matcher] -- suggests relevant runbooks from library
```

## Getting Started

### Phase 1: Manual (Week 1)
Copy these prompts into Claude or ChatGPT during incidents. Evaluate the quality of analysis against your team's actual findings.

### Phase 2: Semi-Automated (Week 2-4)
Build a Slack bot or CLI tool that wraps these prompts with your monitoring APIs. Engineers trigger analysis with a slash command.

### Phase 3: Fully Automated (Month 2+)
Connect directly to your alerting pipeline. When an alert fires, automatically pull context, run the analysis, and post to the incident channel before the on-call engineer even opens their laptop.

## Cost and Performance Notes

- Use Claude Sonnet for most analysis tasks (good balance of quality and speed)
- Use Claude Opus for complex multi-system incidents that need deeper reasoning
- Average analysis takes 5-15 seconds and costs under $0.05
- Cache infrastructure configs to avoid re-fetching on every review
