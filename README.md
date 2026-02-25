# Prompts & Skills

**[promptandskills.com](https://promptandskills.com)** — The AI Developer's Arsenal.

A curated collection of prompts, skills, agents, beginner guides, and enterprise skill packs for the AI revolution.

## What's Inside

| Category | Description |
|----------|-------------|
| **Prompts** | Battle-tested prompts for Claude, ChatGPT, and other AI models |
| **Skills** | Technical skill files and patterns for AI development workflows |
| **Agents** | Agent templates, configurations, and orchestration patterns |
| **Guides** | Step-by-step beginner guides for AI-assisted development |
| **Enterprise** | Curated skill packs for teams adopting AI at scale |

## Tech Stack

- **[Astro](https://astro.build)** — Static site generator, zero JS shipped by default
- **Markdown** — All content authored as `.md` files with YAML frontmatter
- **Modern CSS** — CSS nesting, container queries, `@layer`, view transitions
- **GitHub Pages** — Hosting with auto-deploy via GitHub Actions

## Adding Content

Drop a `.md` file in the appropriate folder under `src/content/`:

```
src/content/
├── prompts/
├── skills/
├── agents/
├── guides/
└── enterprise/
```

Each file needs frontmatter:

```yaml
---
title: "Your Title"
description: "A brief description"
category: "prompts"
tags: ["tag1", "tag2"]
difficulty: "beginner"
date: 2026-02-25
featured: false
---

Your content here...
```

Push to `main` and GitHub Actions builds and deploys automatically.

## Development

```sh
npm install
npm run dev          # Local dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview production build locally
```

## License

All rights reserved.
