---
title: "Docker Build Automation Pipeline Prompt"
description: "A prompt that generates CI/CD pipeline configurations for automated Docker image building, testing, and publishing."
category: prompts
tags: ["docker", "ci-cd", "automation", "build-pipeline"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt generates complete CI/CD pipeline configurations that build, test, scan, and publish Docker images with proper tagging strategies and caching.

## Prompt

```
Generate a CI/CD pipeline for automated Docker image building:

CI Platform: {{ci_platform}}
Application: {{application}}
Registry: {{registry}}
Branching Strategy: {{branching_strategy}}
Required Checks: {{required_checks}}

The pipeline must:
1. Build the Docker image using BuildKit
2. Run unit tests inside the container
3. Scan for vulnerabilities (fail on Critical severity)
4. Tag images following the strategy:
   - PRs: pr-{{PR_NUMBER}}
   - Main branch: latest + git SHA + semantic version
   - Tags: semver from git tag
5. Push to the container registry
6. Use layer caching from the registry for fast rebuilds
7. Support multi-architecture builds (amd64/arm64) for release tags
8. Send notifications on failure

Provide the complete pipeline configuration file ready to commit.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ci_platform` | CI/CD system | "GitHub Actions" or "GitLab CI" |
| `application` | App being built | "Go REST API" |
| `registry` | Container registry | "ghcr.io/myorg" |
| `branching_strategy` | Git workflow | "GitHub Flow (main + feature branches)" |
| `required_checks` | Quality gates | "unit tests, linting, vulnerability scan, SBOM" |

## Example Output

```yaml
# .github/workflows/docker-build.yml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      security-events: write

    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=pr
            type=sha,prefix=
            type=semver,pattern={{version}}
            type=raw,value=latest,enable={{is_default_branch}}

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=registry,ref=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:buildcache
          cache-to: type=registry,ref=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:buildcache,mode=max
```

## Variations

1. **GitLab CI** — Adapt for GitLab CI with kaniko builder (no Docker-in-Docker required) and GitLab Container Registry.
2. **Monorepo Multi-Image** — Build multiple images from a monorepo with path-based triggers so only changed services are rebuilt.
3. **Release Pipeline** — Separate build and deploy stages with manual approval gates for production deployments.

## Best Model

Claude Sonnet 4.6 generates accurate CI pipeline configurations across platforms with proper secret handling and caching.
