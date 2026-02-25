---
title: "Insecure Deserialization Review Prompt"
description: "A prompt for identifying dangerous deserialization patterns across Python, Java, PHP, and Node.js codebases."
category: prompts
tags: ["deserialization", "owasp", "rce", "code-review"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Insecure Deserialization Review Prompt

This prompt guides an AI to detect insecure deserialization patterns that could lead to remote code execution, privilege escalation, or data tampering. It covers the most dangerous functions across popular languages.

## Prompt

```text
Review the following {{language}} code for insecure deserialization vulnerabilities.

Dangerous functions to check:

**Python**: pickle.loads, pickle.load, yaml.load (without SafeLoader), shelve.open, marshal.loads
**Java**: ObjectInputStream.readObject, XMLDecoder, readUnshared
**PHP**: unserialize with user input
**Node.js**: node-serialize, funcster, js-yaml.load (without safe schema)
**.NET**: BinaryFormatter.Deserialize, SoapFormatter, TypeNameHandling.All

For each finding:
1. **Function**: The dangerous deserialization call
2. **Data source**: Where the untrusted input originates
3. **Impact**: What an attacker could achieve (RCE, privilege escalation, data tampering)
4. **Proof of concept**: A safe demonstration of the risk (no actual exploit)
5. **Safe alternative**: Replacement code using a safe serialization format

Code to review:
{{code}}

Also check for:
- Deserialized data used to instantiate classes or call methods dynamically
- Cache backends using pickle or native serialization
- Session stores using native serialization instead of JSON
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `language` | Programming language | `Python`, `Java`, `PHP` |
| `code` | Source code to analyze | File handling data import or session management |

## Example Output

**Finding 1**
- **Function**: `pickle.loads(request.data)` at line 45
- **Data source**: Raw HTTP request body from unauthenticated endpoint
- **Impact**: Remote code execution — pickle can instantiate arbitrary Python objects and execute `__reduce__` methods
- **Safe alternative**:
```python
import json
data = json.loads(request.data)
# Validate against schema
from jsonschema import validate
validate(instance=data, schema=expected_schema)
```

## Variations

1. **Dependency check** — Include your requirements.txt or pom.xml and ask the model to flag libraries known to contain gadget chains usable through deserialization.
2. **Redis/Memcached focus** — Specifically audit cache get/set patterns for serialization format choices.
3. **Migration plan** — Ask the model to generate a migration plan for replacing pickle-based serialization with JSON across an entire codebase.

## Best Model

Claude Opus 4.6 is recommended for Java codebases where gadget chain analysis requires understanding of classpath dependencies. Claude Sonnet 4.6 is sufficient for Python and Node.js.
