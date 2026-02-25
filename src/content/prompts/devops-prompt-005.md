---
title: "Docker Security Hardening Checklist Prompt"
description: "A prompt that generates a comprehensive security hardening checklist for Docker containers, covering runtime, image, and host-level protections."
category: prompts
tags: ["docker", "security", "hardening", "compliance"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt produces a tailored Docker security hardening checklist based on your specific deployment scenario, compliance requirements, and risk profile.

## Prompt

```
Generate a Docker security hardening checklist for the following deployment:

Application Type: {{application_type}}
Exposure Level: {{exposure_level}}
Compliance Requirements: {{compliance}}
Orchestrator: {{orchestrator}}
Registry: {{registry}}

Cover these security domains:
1. **Image Security**: Base image selection, vulnerability scanning, SBOM, signing
2. **Build Security**: Secret management during build, reproducible builds, provenance
3. **Runtime Security**: Resource limits, capabilities, read-only filesystem, seccomp
4. **Network Security**: Network policies, TLS, inter-service authentication
5. **Host Security**: Docker daemon configuration, socket protection, user namespaces
6. **Supply Chain**: Image provenance, content trust, registry access control
7. **Monitoring**: Audit logging, runtime anomaly detection, compliance scanning

For each item provide:
- [ ] Checklist item description
- Risk level: Critical / High / Medium / Low
- Implementation command or configuration snippet
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `application_type` | What the application does | "Payment processing API" |
| `exposure_level` | Network exposure | "Internet-facing" or "internal only" |
| `compliance` | Regulatory requirements | "PCI-DSS" or "SOC 2" or "none" |
| `orchestrator` | Container orchestrator | "Kubernetes" or "Docker Compose" or "ECS" |
| `registry` | Container registry used | "AWS ECR" or "Docker Hub" or "GitHub Container Registry" |

## Example Output

```markdown
## Docker Security Hardening Checklist — Payment API (PCI-DSS)

### Image Security
- [x] Use distroless or minimal base images — Risk: High
  `FROM gcr.io/distroless/python3-debian12`
- [ ] Scan images for CVEs before deployment — Risk: Critical
  `trivy image --severity CRITICAL,HIGH myapp:latest`
- [ ] Sign images with cosign — Risk: High
  `cosign sign --key cosign.key registry/myapp:v1.2.3`

### Runtime Security
- [ ] Drop all Linux capabilities — Risk: Critical
  `docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myapp`
- [ ] Enable read-only root filesystem — Risk: High
  `docker run --read-only --tmpfs /tmp:rw,noexec,nosuid myapp`
- [ ] Set no-new-privileges — Risk: High
  `docker run --security-opt no-new-privileges myapp`
- [ ] Apply memory limits — Risk: Medium
  `docker run --memory 512m --memory-swap 512m myapp`

### Network Security
- [ ] Use encrypted overlay networks — Risk: High
  `docker network create --opt encrypted --driver overlay secure_net`
- [ ] Enable mutual TLS between services — Risk: Critical
```

## Variations

1. **Quick Development Audit** — Simplified checklist focusing on the top 10 most impactful security controls for development environments.
2. **Kubernetes-Specific** — Extend with Pod Security Standards, NetworkPolicy, and RBAC considerations.
3. **Compliance Mapping** — Map each checklist item to specific compliance framework controls (CIS Docker Benchmark, PCI-DSS, NIST).

## Best Model

Claude Opus 4.6 is recommended for compliance-specific hardening checklists where deep understanding of regulatory requirements is needed. Claude Sonnet 4.6 works well for general security hardening.
