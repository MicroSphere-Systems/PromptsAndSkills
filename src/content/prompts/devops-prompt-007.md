---
title: "Docker Registry Migration Prompt"
description: "A prompt that plans and generates scripts for migrating container images between registries with minimal downtime."
category: prompts
tags: ["docker", "registry", "migration", "containers"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt generates a complete migration plan and automation scripts for moving container images between registries, handling re-tagging, verification, and CI/CD updates.

## Prompt

```
Plan a container image registry migration:

Source Registry: {{source_registry}}
Target Registry: {{target_registry}}
Number of Images: {{image_count}}
Authentication: {{auth_method}}
CI/CD Platform: {{cicd_platform}}

Generate:
1. A pre-migration checklist (access verification, storage estimation, policy review)
2. A bash script that:
   - Lists all images and tags in the source registry
   - Pulls each image, re-tags it for the target registry, and pushes it
   - Verifies digest matches between source and target
   - Handles multi-architecture manifests correctly
   - Logs progress and failures
3. A rollback plan if issues are discovered
4. CI/CD configuration updates to point to the new registry
5. A post-migration verification checklist

Include error handling, rate limiting, and parallel transfer options.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `source_registry` | Current registry | "Docker Hub (docker.io)" |
| `target_registry` | Destination registry | "AWS ECR (123456789.dkr.ecr.us-east-1.amazonaws.com)" |
| `image_count` | Approximate number of images | "150 images, ~500 tags total" |
| `auth_method` | How registries are authenticated | "Docker Hub token + AWS IAM role" |
| `cicd_platform` | CI/CD system to update | "GitHub Actions" |

## Example Output

```bash
#!/bin/bash
# Registry Migration: Docker Hub -> AWS ECR
set -euo pipefail

SOURCE="docker.io/myorg"
TARGET="123456789.dkr.ecr.us-east-1.amazonaws.com"
LOG_FILE="migration_$(date +%Y%m%d_%H%M%S).log"

# Authenticate to both registries
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "$TARGET"

# Get list of repositories
repos=$(curl -s "https://hub.docker.com/v2/repositories/myorg/?page_size=100" | jq -r '.results[].name')

for repo in $repos; do
    # Create ECR repository if it doesn't exist
    aws ecr create-repository --repository-name "$repo" 2>/dev/null || true

    # Get all tags
    tags=$(curl -s "https://hub.docker.com/v2/repositories/myorg/$repo/tags/?page_size=100" | jq -r '.results[].name')

    for tag in $tags; do
        echo "[$(date)] Migrating $repo:$tag" | tee -a "$LOG_FILE"
        docker pull "$SOURCE/$repo:$tag"
        docker tag "$SOURCE/$repo:$tag" "$TARGET/$repo:$tag"
        docker push "$TARGET/$repo:$tag"
        echo "[$(date)] Completed $repo:$tag" | tee -a "$LOG_FILE"
    done
done
```

## Variations

1. **Skopeo-Based Migration** — Use `skopeo copy` instead of docker pull/push for faster transfers that do not require local storage.
2. **Multi-Cloud Migration** — Handle migrations between different cloud providers (ECR to GCR to ACR) with cross-cloud authentication.
3. **Incremental Sync** — Set up ongoing synchronization for a gradual migration where both registries are active during a transition period.

## Best Model

Claude Opus 4.6 is recommended for complex migrations involving multiple authentication schemes and CI/CD platform updates. Claude Sonnet 4.6 works well for straightforward single-registry migrations.
