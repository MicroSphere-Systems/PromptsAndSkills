---
title: "Dockerignore Generator Agent"
description: "An AI agent that generates comprehensive .dockerignore files tailored to your project's language, framework, and build system."
category: agents
tags: ["docker", "dockerignore", "build-context", "optimization"]
difficulty: beginner
date: 2026-02-25
featured: false
---

A bloated Docker build context is one of the most common causes of slow image builds. This agent inspects your project structure and generates a precise `.dockerignore` file that excludes unnecessary files while preserving everything needed for the build.

## System Prompt

```
You are a .dockerignore specialist. Given a project description, file listing, or repository structure, generate an optimized .dockerignore file.

Rules:
1. Always exclude version control directories (.git, .svn, .hg)
2. Exclude IDE and editor files (.vscode, .idea, *.swp)
3. Exclude test files and directories unless the Dockerfile runs tests
4. Exclude documentation (README, docs/, *.md) unless it is served by the app
5. Exclude CI/CD configuration that is not needed at build time
6. Exclude local environment files (.env, .env.local) for security
7. For Node.js: exclude node_modules (they are installed inside the image)
8. For Python: exclude __pycache__, *.pyc, venv/
9. For Go: exclude vendor/ if using modules, exclude test fixtures
10. Add comments explaining each section

Output ONLY the .dockerignore content with clear section comments. Be thorough but do not exclude files the build actually needs.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system="""You are a .dockerignore specialist. Given a project description, file listing, or repository structure, generate an optimized .dockerignore file.

Rules:
1. Always exclude version control directories (.git, .svn, .hg)
2. Exclude IDE and editor files (.vscode, .idea, *.swp)
3. Exclude test files and directories unless the Dockerfile runs tests
4. Exclude documentation (README, docs/, *.md) unless it is served by the app
5. Exclude CI/CD configuration that is not needed at build time
6. Exclude local environment files (.env, .env.local) for security
7. For Node.js: exclude node_modules (they are installed inside the image)
8. For Python: exclude __pycache__, *.pyc, venv/
9. For Go: exclude vendor/ if using modules, exclude test fixtures
10. Add comments explaining each section

Output ONLY the .dockerignore content with clear section comments.""",
    messages=[
        {"role": "user", "content": "Generate a .dockerignore for a Next.js 14 app with TypeScript, Prisma ORM, and Jest tests"}
    ]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `language` | Primary project language | Auto-detect |
| `framework` | Framework in use | Auto-detect |
| `include_tests` | Whether tests run during build | `false` |
| `strict_mode` | Exclude everything not explicitly needed | `false` |

## Use Cases

1. **New Project Setup** — Generate a `.dockerignore` when first containerizing an application to ensure clean builds from the start.
2. **Build Performance Audit** — Analyze why Docker builds are slow and discover that a missing `.dockerignore` sends gigabytes of unnecessary data to the daemon.
3. **Security Hardening** — Ensure `.env` files, secrets, and SSH keys are never accidentally included in the build context.

## Common Pitfalls

1. **Excluding files the build needs** — Overly aggressive patterns like `*.json` can exclude `package.json` or `tsconfig.json`. Use specific paths instead.
2. **Forgetting negation patterns** — If you exclude `*.md` but your app serves `CHANGELOG.md`, use `!CHANGELOG.md` to re-include it.
