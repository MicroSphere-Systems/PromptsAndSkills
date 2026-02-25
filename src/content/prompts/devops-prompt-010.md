---
title: "Docker to Kubernetes Migration Prompt"
description: "A prompt that converts Docker Compose configurations to Kubernetes manifests, mapping compose concepts to K8s resources."
category: prompts
tags: ["docker", "kubernetes", "migration", "compose"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt takes a Docker Compose file and generates equivalent Kubernetes manifests, handling the translation of compose concepts like volumes, networks, and environment files to their K8s counterparts.

## Prompt

```
Convert the following Docker Compose configuration to Kubernetes manifests:

```yaml
{{compose_content}}
```

Target Kubernetes Version: {{k8s_version}}
Namespace: {{namespace}}
Storage Class: {{storage_class}}
Ingress Controller: {{ingress_controller}}

For each compose service, generate:
1. Deployment (or StatefulSet for stateful services)
2. Service (ClusterIP for internal, LoadBalancer/Ingress for external)
3. ConfigMap for non-sensitive environment variables
4. Secret for sensitive values (base64 encoded)
5. PersistentVolumeClaim for named volumes
6. HorizontalPodAutoscaler if replicas > 1
7. NetworkPolicy matching compose network isolation

Additional requirements:
- Set resource requests and limits based on compose resource constraints
- Convert health checks to liveness and readiness probes
- Use labels consistently (app, component, version)
- Include a Kustomization file for environment-specific overrides

Explain each mapping decision and note features that do not have a direct K8s equivalent.
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `compose_content` | Docker Compose YAML content | Full compose.yaml file |
| `k8s_version` | Target Kubernetes version | "1.29" |
| `namespace` | Kubernetes namespace | "production" |
| `storage_class` | StorageClass for PVCs | "gp3" or "standard" |
| `ingress_controller` | Ingress controller in use | "nginx" or "traefik" |

## Example Output

```yaml
# deployment-api.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: production
  labels:
    app: myapp
    component: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
      component: api
  template:
    metadata:
      labels:
        app: myapp
        component: api
    spec:
      containers:
        - name: api
          image: myapp-api:1.0.0
          ports:
            - containerPort: 8000
          envFrom:
            - configMapRef:
                name: api-config
            - secretRef:
                name: api-secrets
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 10
            periodSeconds: 30
          readinessProbe:
            httpGet:
              path: /health
              port: 8000
            initialDelaySeconds: 5
            periodSeconds: 10
```

## Variations

1. **Helm Chart Generation** — Instead of raw manifests, generate a Helm chart with values.yaml for environment-specific configuration.
2. **Kompose Comparison** — Run kompose alongside this prompt and compare the output, highlighting where manual refinement improves on automated conversion.
3. **ArgoCD Application** — Wrap the generated manifests in an ArgoCD Application resource for GitOps deployment.

## Best Model

Claude Opus 4.6 is recommended for complex compose-to-Kubernetes migrations where understanding architectural trade-offs between the two platforms is critical. Claude Sonnet 4.6 handles straightforward conversions well.
