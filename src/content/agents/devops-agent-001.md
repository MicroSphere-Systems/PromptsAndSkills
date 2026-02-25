---
title: "Docker Multi-Stage Build Optimizer Agent"
description: "An AI agent that analyzes Dockerfiles and recommends multi-stage build patterns to reduce image size and improve build performance."
category: agents
tags: ["docker", "multi-stage-builds", "optimization", "containers"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Building production Docker images that are both functional and lean requires careful orchestration of build stages. This agent analyzes your existing Dockerfiles and suggests multi-stage build refactorings that separate build-time dependencies from runtime artifacts, often reducing final image sizes by 80% or more.

## System Prompt

```
You are a Docker multi-stage build optimization expert. Your role is to analyze Dockerfiles and recommend multi-stage build patterns that minimize final image size while maintaining build performance.

When given a Dockerfile or application description:
1. Identify build-time vs runtime dependencies
2. Propose a multi-stage build with clearly named stages (e.g., builder, deps, runtime)
3. Use the smallest viable base image for the runtime stage (distroless, alpine, slim)
4. Ensure build cache is maximized by ordering layers from least to most frequently changed
5. Copy only the necessary artifacts between stages
6. Include health check instructions where applicable

Always explain WHY each stage exists and what size reduction the user can expect. Provide the complete optimized Dockerfile, not just snippets.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

dockerfile_content = open("Dockerfile").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are a Docker multi-stage build optimization expert. Your role is to analyze Dockerfiles and recommend multi-stage build patterns that minimize final image size while maintaining build performance.

When given a Dockerfile or application description:
1. Identify build-time vs runtime dependencies
2. Propose a multi-stage build with clearly named stages (e.g., builder, deps, runtime)
3. Use the smallest viable base image for the runtime stage (distroless, alpine, slim)
4. Ensure build cache is maximized by ordering layers from least to most frequently changed
5. Copy only the necessary artifacts between stages
6. Include health check instructions where applicable

Always explain WHY each stage exists and what size reduction the user can expect. Provide the complete optimized Dockerfile, not just snippets.""",
    messages=[
        {"role": "user", "content": f"Optimize this Dockerfile for production:\n\n{dockerfile_content}"}
    ]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `target_base` | Preferred runtime base image family | `distroless` |
| `max_stages` | Maximum number of build stages | `4` |
| `include_healthcheck` | Add HEALTHCHECK instruction | `true` |
| `cache_mounts` | Use BuildKit cache mounts for package managers | `true` |
| `security_scan` | Suggest Trivy/Grype scan stage | `false` |

## Use Cases

1. **Node.js Production Images** — Separate npm install and build steps from the final runtime, dropping devDependencies and build tools from the production image.
2. **Go Binary Deployment** — Compile a static Go binary in a full SDK image, then copy it into a scratch or distroless image for a final image under 15MB.
3. **Python ML Services** — Install heavy compilation dependencies (gcc, python-dev) in a builder stage, then copy only compiled wheels into a slim Python runtime image.
4. **Java Spring Boot Apps** — Use a JDK image for compilation and a JRE-slim image for runtime, with layered jar extraction for better caching.

## Common Pitfalls

1. **Copying too much between stages** — Using `COPY --from=builder / /` defeats the purpose. Always copy only the specific directories or files needed at runtime.
2. **Ignoring .dockerignore** — Without a proper `.dockerignore`, the build context includes `node_modules`, `.git`, and test files, slowing down every build even with multi-stage patterns.
3. **Breaking layer cache** — Copying `package.json` and source code in the same layer means dependency installation reruns on every code change. Always copy dependency manifests first.
