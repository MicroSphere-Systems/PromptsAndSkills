---
title: "Automated Code Review Agent"
description: "Build an AI agent that reviews pull requests, checks for bugs, and posts inline feedback automatically."
category: "agents"
tags: ["agent", "code-review", "automation", "github", "ci-cd"]
difficulty: "advanced"
date: 2026-02-25
featured: false
---

# Automated Code Review Agent

This guide walks through building an AI-powered code review agent that integrates with GitHub to automatically review pull requests and post inline comments.

## How It Works

```text
GitHub PR Opened/Updated
    |
    v
[Webhook Handler] -- receives PR events
    |
    v
[Diff Fetcher] -- gets changed files and diffs
    |
    v
[AI Reviewer] -- analyzes each file for issues
    |
    v
[Comment Poster] -- posts inline review comments on the PR
```

## System Prompt for the Reviewer

```text
You are an automated code review agent. You will receive a git diff for a pull
request. Review the changes and identify issues.

## Review Criteria
- Bugs and logical errors
- Security vulnerabilities (injection, auth bypass, data exposure)
- Performance problems (N+1 queries, unnecessary allocations)
- Missing error handling
- Breaking API changes without version bumps

## Rules
- ONLY comment on the changed lines (the diff), not existing code
- Be specific -- reference exact line numbers and variable names
- Provide a fix or suggestion with each issue
- Use severity levels: critical, warning, suggestion
- If the code looks good, say so -- do not manufacture issues
- Keep comments concise and actionable

## Output Format
Return a JSON array of review comments:
[
  {
    "file": "src/api/users.ts",
    "line": 42,
    "severity": "critical",
    "comment": "SQL injection vulnerability. The user input is interpolated
    directly into the query string. Use parameterized queries instead.",
    "suggestion": "const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);"
  }
]
```

## Implementation

### Webhook Handler

```typescript
import { Webhooks } from "@octokit/webhooks";
import { Octokit } from "@octokit/rest";
import Anthropic from "@anthropic-ai/sdk";

const webhooks = new Webhooks({ secret: process.env.WEBHOOK_SECRET! });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const anthropic = new Anthropic();

webhooks.on("pull_request.opened", handlePR);
webhooks.on("pull_request.synchronize", handlePR);

async function handlePR({ payload }) {
  const { owner, repo } = parseRepo(payload.repository.full_name);
  const prNumber = payload.pull_request.number;

  // Fetch the diff
  const { data: files } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: prNumber,
  });

  // Review each changed file
  for (const file of files) {
    if (file.status === "removed") continue;

    const comments = await reviewFile(file);

    // Post comments on the PR
    for (const comment of comments) {
      await octokit.pulls.createReviewComment({
        owner,
        repo,
        pull_number: prNumber,
        body: formatComment(comment),
        path: file.filename,
        line: comment.line,
        commit_id: payload.pull_request.head.sha,
      });
    }
  }
}
```

### AI Review Function

```typescript
async function reviewFile(file: { filename: string; patch?: string }) {
  if (!file.patch) return [];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Review this diff for ${file.filename}:\n\n${file.patch}`,
      },
    ],
    system: CODE_REVIEW_SYSTEM_PROMPT,
  });

  return JSON.parse(extractText(response));
}
```

## Deployment Options

**GitHub Actions (simplest):** Run the agent as a GitHub Actions workflow triggered on `pull_request` events. No server needed.

**Webhook server:** Deploy as a small service (AWS Lambda, Cloudflare Workers, or a VPS) that receives GitHub webhook events.

**GitHub App:** For organization-wide deployment, build a GitHub App that can be installed on multiple repositories.

## Configuration

Create a `.ai-review.yml` in your repository root to configure the agent:

```yaml
# Files to skip
ignore:
  - "*.md"
  - "*.json"
  - "package-lock.json"
  - "dist/**"

# Minimum severity to post (critical, warning, suggestion)
min_severity: warning

# Maximum comments per PR
max_comments: 20

# Custom review instructions
extra_instructions: |
  This project uses Express.js with TypeScript.
  We use Zod for request validation.
  All database queries go through the repository pattern.
```

## Best Practices

1. **Filter noise** -- Skip generated files, lock files, and non-code assets.
2. **Batch comments** -- Submit all comments as a single review rather than individual comments to avoid notification spam.
3. **Rate limit** -- Add delays between API calls to stay within rate limits.
4. **Graceful degradation** -- If the AI service is down, do not block the PR. Log the error and continue.
5. **Human override** -- Always let maintainers dismiss or override AI suggestions.
