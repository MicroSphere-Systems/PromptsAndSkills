---
title: "Choosing and Using Slim Docker Base Images"
description: "A guide to selecting the right minimal base image for your application, including Alpine, Distroless, and Slim variants."
category: skills
tags: ["docker", "base-images", "alpine", "distroless"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

The base image you choose determines your container's size, security posture, and compatibility. This skill helps you navigate the options and pick the right minimal image.

## Steps

1. **Inventory runtime requirements** — List all shared libraries, system binaries, and runtimes your app needs.
2. **Check glibc vs musl compatibility** — If your app uses C extensions, verify they work with Alpine's musl libc.
3. **Evaluate the options** — Compare Alpine, Slim Debian, Distroless, UBI Micro, and Scratch for your use case.
4. **Test with the smallest option first** — Start with the smallest viable image and move up if you hit compatibility issues.
5. **Pin the image version** — Use a specific tag like `python:3.12.1-slim-bookworm`, never `:latest`.
6. **Verify with a security scan** — Scan the final image to confirm the smaller base has fewer CVEs.

## Example

```dockerfile
# Option 1: Alpine (5MB base, musl libc)
FROM python:3.12-alpine
# Pros: Tiny, fast pulls. Cons: May need build deps for C extensions.
RUN apk add --no-cache libpq  # runtime-only PostgreSQL client lib
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache-dir /wheels/*.whl

# Option 2: Slim Debian (80MB base, glibc)
FROM python:3.12-slim-bookworm
# Pros: Full glibc compatibility. Cons: Larger than Alpine.
RUN apt-get update && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Option 3: Distroless (2MB base, no shell)
FROM gcr.io/distroless/python3-debian12
# Pros: Minimal attack surface, no shell. Cons: No debugging tools.
COPY --from=builder /app /app

# Option 4: Scratch (0MB base)
FROM scratch
# Pros: Absolute minimum. Cons: Only for static binaries.
COPY --from=builder /app/myapp /myapp
ENTRYPOINT ["/myapp"]
```

```bash
# Size comparison
docker images --format "{{.Repository}}:{{.Tag}} {{.Size}}"
# myapp:alpine      52MB
# myapp:slim        135MB
# myapp:distroless  48MB
# myapp:scratch     12MB
```

## When to Use

- Use **Alpine** for interpreted languages where you need a shell for debugging and package management.
- Use **Slim Debian** when Alpine compatibility is problematic (numpy, pandas, cryptography).
- Use **Distroless** for compiled applications in production where no shell access is acceptable.
- Use **Scratch** for statically compiled Go or Rust binaries with zero dependencies.

## When NOT to Use

- Do not use Scratch or Distroless when you need to exec into the container for debugging in non-production environments.
- Do not use Alpine for data science workloads where compilation of C extensions takes 10x longer than on glibc.

## Prerequisites

- Understanding of your application's system-level dependencies
- Multi-stage build knowledge (to compile in a full image and copy to a minimal one)
- Access to test the application on the chosen base image

## Pro Tips

1. **Use `docker run --rm -it image sh` to explore** — Before committing to a base image, interactively explore it to verify required files and libraries are present.
2. **Check with `ldd`** — Run `ldd /path/to/binary` inside the container to identify missing shared libraries.
3. **Consider Chainguard Images** — Chainguard offers distroless-style images with regular CVE patches and SBOM support as an alternative to Google's distroless.
