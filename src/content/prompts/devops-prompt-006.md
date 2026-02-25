---
title: "Docker Troubleshooting Diagnostic Prompt"
description: "A prompt that systematically diagnoses Docker container issues from error messages, logs, and symptoms."
category: prompts
tags: ["docker", "troubleshooting", "debugging", "diagnostics"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt takes a Docker error message or symptom description and walks through a systematic diagnostic process to identify and resolve the root cause.

## Prompt

```
Diagnose the following Docker issue:

Error/Symptom: {{error_message}}
Container Image: {{image_name}}
Docker Version: {{docker_version}}
Host OS: {{host_os}}
Additional Context: {{context}}

Perform a systematic diagnosis:
1. **Parse the error** — Explain what the error message means in plain language
2. **Identify root causes** — List the most likely causes ranked by probability
3. **Diagnostic commands** — Provide specific docker commands to confirm the root cause
4. **Resolution steps** — Give step-by-step fix instructions for each possible cause
5. **Prevention** — Suggest configuration changes to prevent recurrence

For each diagnostic command, explain what output to expect and how to interpret it.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `error_message` | The error or symptom observed | "OCI runtime create failed: container_linux.go:367" |
| `image_name` | Image being used | "myapp:latest" |
| `docker_version` | Docker Engine version | "24.0.7" |
| `host_os` | Host operating system | "Ubuntu 22.04" |
| `context` | Any additional relevant info | "Started failing after host kernel update" |

## Example Output

```markdown
## Error Analysis
"OCI runtime create failed" indicates the container runtime (runc) failed to
create the container's isolated environment. This is a low-level failure below
Docker's container management layer.

## Most Likely Causes
1. **Seccomp/AppArmor profile conflict** (70%) — A security profile is blocking
   a syscall the container needs
2. **Incompatible kernel version** (20%) — The container requires kernel features
   not available after the update
3. **Resource exhaustion** (10%) — No available PIDs, memory, or disk space

## Diagnostic Commands
```bash
# Check full error details
docker inspect --format='{{.State.Error}}' container_name

# Test with security profiles disabled
docker run --security-opt seccomp=unconfined --security-opt apparmor=unconfined myapp:latest

# Check kernel version
uname -r

# Check system resources
docker system df
cat /proc/sys/kernel/pid_max
```

## Resolution
If running with seccomp=unconfined works, the issue is a missing syscall in
the default seccomp profile. Create a custom profile that allows the needed
syscall rather than disabling seccomp entirely.
```

## Variations

1. **Build Failure Diagnosis** — Focus on `docker build` errors including cache issues, network failures during package install, and permission problems.
2. **Networking Diagnosis** — Specialized for container-to-container and container-to-host networking issues with tcpdump and DNS debugging.
3. **Performance Diagnosis** — Focus on slow containers using `docker stats`, cgroup metrics, and profiling tools.

## Best Model

Claude Sonnet 4.6 excels at parsing error messages and suggesting diagnostic steps. Its broad training on Docker issues makes it effective for troubleshooting.
