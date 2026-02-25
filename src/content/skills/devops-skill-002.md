---
title: "Creating Effective .dockerignore Files"
description: "A step-by-step guide to writing .dockerignore files that reduce build context size, speed up builds, and prevent sensitive files from leaking into images."
category: skills
tags: ["docker", "dockerignore", "build-context", "security"]
difficulty: beginner
date: 2026-02-25
featured: false
---

A well-crafted `.dockerignore` file prevents unnecessary files from being sent to the Docker daemon, speeding up builds and reducing security risks.

## Steps

1. **Understand the build context** — When you run `docker build .`, the entire directory is sent to the Docker daemon. Large directories mean slow builds.
2. **Start with a deny-all approach** — Begin with `*` to exclude everything, then whitelist only needed files with `!` patterns.
3. **Alternatively, use a targeted exclude approach** — List specific directories and patterns to exclude while keeping most files.
4. **Always exclude version control** — Add `.git`, `.svn`, `.hg` and related files.
5. **Exclude development artifacts** — Add `node_modules`, `__pycache__`, `venv`, `.tox`, `target/` depending on your language.
6. **Exclude sensitive files** — Add `.env`, `.env.*`, `*.pem`, `*.key`, `credentials.json`.
7. **Exclude documentation and tests** — Add `docs/`, `test/`, `*.md` unless your build needs them.
8. **Test the result** — Build the image and verify the context size reported by Docker.

## Example

```gitignore
# .dockerignore

# Version control
.git
.gitignore
.gitattributes

# IDE and editor files
.vscode
.idea
*.swp
*.swo
*~

# Environment and secrets
.env
.env.*
*.pem
*.key

# Dependencies (installed inside container)
node_modules
bower_components

# Build output (built inside container)
dist
build
coverage

# Tests (not needed in production image)
test
tests
__tests__
*.test.js
*.spec.js
jest.config.*

# Documentation
docs
*.md
LICENSE
CHANGELOG

# CI/CD configuration
.github
.gitlab-ci.yml
.circleci
Jenkinsfile

# Docker files (avoid recursive context)
Dockerfile*
docker-compose*
.dockerignore

# OS files
.DS_Store
Thumbs.db
```

```bash
# Check context size before and after
# Without .dockerignore:
docker build . 2>&1 | grep "Sending build context"
# Sending build context to Docker daemon  1.2GB

# With .dockerignore:
docker build . 2>&1 | grep "Sending build context"
# Sending build context to Docker daemon  4.5MB
```

## When to Use

- Every Docker project should have a `.dockerignore` file, no exceptions.
- Especially important for monorepos where the build context would otherwise include unrelated services.
- Critical when the project directory contains large binary files, datasets, or media.

## When NOT to Use

- There is no scenario where you should skip `.dockerignore`. Even a minimal one excluding `.git` is better than none.

## Prerequisites

- Docker installed
- A project directory with a Dockerfile
- Understanding of which files are needed during the Docker build process

## Pro Tips

1. **Use the deny-all strategy for maximum control** — Start with `*` then `!src`, `!package.json`, etc. This ensures only explicitly needed files enter the build context.
2. **Different .dockerignore per build** — If you have multiple Dockerfiles, use `Dockerfile.frontend.dockerignore` (Docker 19.03+) for per-Dockerfile ignore rules.
3. **Verify with BuildKit** — Enable `DOCKER_BUILDKIT=1` and check the build output which shows transferred context size and warns about large contexts.
