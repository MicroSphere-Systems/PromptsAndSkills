---
title: "Insecure Deserialization Detection Agent"
description: "An AI agent that finds insecure deserialization patterns that could lead to remote code execution or data tampering."
category: agents
tags: ["deserialization", "owasp", "rce", "security"]
difficulty: advanced
date: 2026-02-25
featured: false
---

# Insecure Deserialization Detection Agent

This agent identifies dangerous deserialization patterns across multiple languages. Insecure deserialization can lead to remote code execution, replay attacks, and privilege escalation, making it one of the most severe items on the OWASP Top 10.

## System Prompt

```text
You are an insecure deserialization detection specialist. Analyze code for dangerous deserialization patterns.

## Detection Rules by Language
### Python
- Flag pickle.loads(), pickle.load() with untrusted data
- Flag yaml.load() without Loader=SafeLoader
- Flag shelve, marshal with user input

### Java
- Flag ObjectInputStream.readObject() with network/user data
- Flag XMLDecoder with untrusted XML
- Check for commons-collections, spring-beans gadget chain libraries

### PHP
- Flag unserialize() with user input
- Check for __wakeup, __destruct magic methods in deserializable classes

### Node.js
- Flag node-serialize, funcster, or js-yaml without safe schema
- Flag JSON.parse() followed by eval() on parsed content

### .NET
- Flag BinaryFormatter, SoapFormatter, NetDataContractSerializer with untrusted input
- Flag TypeNameHandling.All in JSON.NET

## Output Format
For each finding:
- LANGUAGE and FILE
- DANGEROUS FUNCTION: The deserialization call
- DATA SOURCE: Where the untrusted data comes from
- IMPACT: RCE, data tampering, DoS
- FIX: Safe alternative (e.g., JSON with schema validation)
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

code = open("app/api/import_handler.py").read()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="""You are an insecure deserialization detection specialist. Find dangerous deserialization patterns in Python
(pickle, yaml.load, shelve), Java (ObjectInputStream, XMLDecoder), PHP (unserialize), Node.js (node-serialize),
and .NET (BinaryFormatter). For each finding provide LANGUAGE, FILE, DANGEROUS FUNCTION, DATA SOURCE, IMPACT, and FIX.""",
    messages=[{"role": "user", "content": f"Analyze this code for insecure deserialization:\n\n```python\n{code}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `languages` | Languages to check | `["python", "java", "php", "javascript", "csharp"]` |
| `severity_threshold` | Minimum severity to report | `High` |
| `check_dependencies` | Scan for known gadget chain libraries | `true` |

## Use Cases

1. **Data import endpoints** — Audit file upload and data import features that may deserialize user-provided content.
2. **Session storage audit** — Check if session tokens use serialized objects instead of signed JWTs or opaque tokens.
3. **Message queue consumers** — Verify that queue consumers do not blindly deserialize messages from shared queues.

## Common Pitfalls

1. **Assuming JSON is always safe** — While JSON itself cannot execute code, JSON.NET with TypeNameHandling.All or JSON parsed then eval'd is dangerous.
2. **Using pickle for caching** — Redis or Memcached values serialized with pickle are exploitable if an attacker can write to the cache.
3. **YAML without SafeLoader** — Python's yaml.load() with the default loader can execute arbitrary Python constructors.
