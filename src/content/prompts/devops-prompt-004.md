---
title: "Docker Image Size Reduction Audit Prompt"
description: "A prompt that audits Docker images and recommends specific changes to reduce image size by analyzing layers, packages, and build patterns."
category: prompts
tags: ["docker", "image-size", "audit", "optimization"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt performs a structured analysis of an existing Docker image or Dockerfile to identify specific size reduction opportunities with estimated savings.

## Prompt

```
Perform a Docker image size reduction audit on the following Dockerfile:

```
{{dockerfile_content}}
```

Current image size: {{current_size}}
Target image size: {{target_size}}

Analyze each layer and provide:
1. A table of each instruction's estimated layer size contribution
2. Specific recommendations ranked by size impact:
   - Base image alternatives with size comparison
   - Packages that can be removed or replaced with lighter alternatives
   - Files that can be excluded or cleaned in the same layer
   - Multi-stage build opportunities
   - BuildKit cache mount opportunities
3. A refactored Dockerfile implementing all recommendations
4. Expected final image size after all optimizations

Use dive-style analysis to identify the largest layers and focus optimization there.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `dockerfile_content` | The full Dockerfile to audit | Contents of Dockerfile |
| `current_size` | Current built image size | "1.2GB" |
| `target_size` | Desired image size | "under 200MB" |

## Example Output

```
## Layer Analysis

| Instruction | Estimated Size | Notes |
|------------|---------------|-------|
| FROM python:3.12 | 890MB | Full Debian + Python |
| RUN apt-get install gcc | 150MB | Build dependency |
| COPY requirements.txt | <1MB | |
| RUN pip install -r req | 320MB | Includes pip cache |
| COPY . . | 15MB | Includes tests, docs |

## Recommendations (by impact)

1. **Switch to python:3.12-slim-bookworm** — Saves ~700MB
2. **Multi-stage: compile in builder, copy wheels** — Saves ~150MB (removes gcc)
3. **Add --no-cache-dir to pip install** — Saves ~80MB
4. **Exclude tests and docs via .dockerignore** — Saves ~10MB

## Optimized Dockerfile
[refactored Dockerfile here]

Expected final size: ~180MB (85% reduction)
```

## Variations

1. **Running Image Audit** — Instead of a Dockerfile, analyze a running image using `docker history` and `docker inspect` output.
2. **Multi-Architecture Audit** — Compare image sizes across amd64 and arm64 architectures and recommend arch-specific optimizations.
3. **Security-Focused Audit** — Combine size reduction with CVE reduction, showing how smaller images also reduce attack surface.

## Best Model

Claude Sonnet 4.6 provides excellent Dockerfile analysis. For images with complex build systems or unusual dependencies, Claude Opus 4.6 offers deeper reasoning about trade-offs.
