# promptandskills.com — Design Document

**Date:** 2026-02-25
**Domain:** promptandskills.com
**Status:** Approved

## Overview

A static content site for AI prompts, skills, agents, beginner guides, and enterprise skill packs. Dark techy aesthetic, SEO-optimized, monetized via Google AdSense. No login/signup. Daily content additions via Markdown files pushed to GitHub.

## Audiences

1. **AI Beginners** — need guides and ready-made prompts
2. **AI Developers** — need technical skills and agent patterns
3. **Enterprise Teams** — need curated skill packs and integration guides

## Tech Stack

| Component | Choice |
|-----------|--------|
| Static Site Generator | Astro |
| Content Format | Markdown with YAML frontmatter |
| Content Management | Astro Content Collections (5 collections) |
| Syntax Highlighting | Shiki (built into Astro) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Revenue | Google AdSense |

## Site Architecture

### Routes

```
/ (homepage)
/prompts/ (listing)
/prompts/[slug]/ (detail)
/skills/ (listing)
/skills/[slug]/ (detail)
/agents/ (listing)
/agents/[slug]/ (detail)
/guides/ (listing)
/guides/[slug]/ (detail)
/enterprise/ (listing)
/enterprise/[slug]/ (detail)
/categories/ (browse all tags)
/about/
```

### Content Folder Structure

```
src/content/
├── prompts/
├── skills/
├── agents/
├── guides/
└── enterprise/
```

### Frontmatter Schema

```yaml
---
title: string (required)
description: string (required)
category: "prompts" | "skills" | "agents" | "guides" | "enterprise"
tags: string[]
difficulty: "beginner" | "intermediate" | "advanced"
date: date (required)
featured: boolean (default: false)
---
```

## Homepage Layout (top to bottom)

1. **Hero** — dark gradient, animated terminal typing effect, headline, search bar
2. **Category Cards** — 5-card grid (icon, item count, tagline per category)
3. **Ad Unit #1** — between categories and featured content
4. **Featured/Latest** — 6-8 latest or featured items across all categories
5. **Stats Bar** — auto-counted totals (prompts, skills, agents, etc.)
6. **Footer** — about link, category links, tagline, copyright

## Listing Pages

- Filter bar: tags, difficulty, sort by date
- Card grid: title, description snippet, difficulty badge, date, tag chips
- Static pagination: 12 items per page
- Desktop sidebar: popular tags, latest additions, one ad unit
- Mobile: sidebar below grid, filters as dropdown

## Detail Pages

- Breadcrumb navigation
- Title + metadata header (date, difficulty, tags, read time)
- Rendered Markdown body with Shiki syntax highlighting
- Copy-to-clipboard button (Astro island — only JS on the page)
- Related content: 3-4 items from same category/matching tags
- Ad unit after content body, before related content

## Visual Design System

### Colors

- Background: `#0a0a0f` (near-black)
- Card surfaces: `#12121a`
- Primary accent: `#00ff88` (terminal green)
- Secondary accent: `#7c3aed` (electric purple)
- Text primary: `#e4e4e7`
- Text secondary: `#a1a1aa`
- Code blocks: `#1a1a2e`

### Typography

- Headings: Space Grotesk
- Body: Inter
- Code/prompts: JetBrains Mono

### CSS Techniques

- CSS custom properties for theming
- CSS Grid + Container Queries for responsive layouts
- CSS `@layer` for specificity management
- Native CSS nesting
- `color-mix()` for state variations
- View Transitions API for page navigation
- Scroll-driven animations for card entrances

### Difficulty Badges

- Beginner: `#00ff88` (green)
- Intermediate: `#fbbf24` (amber)
- Advanced: `#ef4444` (red)

### Card Design

- Border: `1px solid #1e1e2e`
- Hover: glow box-shadow with green accent, `scale(1.02)`
- Border radius: `12px`

## SEO Strategy

- Auto `<title>`: "[Page Title] — Prompts & Skills"
- Auto `<meta description>` from frontmatter
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (Article schema)
- Canonical URLs
- Auto-generated sitemap.xml (`@astrojs/sitemap`)
- robots.txt

## Google AdSense

- Ad script in `<head>` layout (loaded once)
- Max 3 ad units per page
- Placements in layout templates (not in content files)
- Positions: between homepage sections, listing sidebar, after detail content

## Performance Targets

- Lighthouse: 95+ all metrics
- Zero JS except copy-to-clipboard island
- Sub-1-second load on 3G

## Daily Workflow

1. Write `.md` file with frontmatter
2. Place in correct `src/content/{category}/` folder
3. `git add, commit, push`
4. GitHub Actions builds (~30 seconds)
5. Live on promptandskills.com
