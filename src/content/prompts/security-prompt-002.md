---
title: "XSS Vulnerability Scanner Prompt"
description: "A prompt for detecting cross-site scripting vulnerabilities in templates and JavaScript with context-aware encoding recommendations."
category: prompts
tags: ["xss", "owasp", "web-security", "templates"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

# XSS Vulnerability Scanner Prompt

This prompt instructs an AI model to find XSS vulnerabilities in web templates and client-side JavaScript. It distinguishes between reflected, stored, and DOM-based XSS and provides context-appropriate encoding fixes.

## Prompt

```text
Analyze the following {{file_type}} code for cross-site scripting (XSS) vulnerabilities.

Categorize each finding as:
- **Reflected XSS**: User input directly rendered in response
- **Stored XSS**: Database content rendered without sanitization
- **DOM-based XSS**: Client-side JS writing to dangerous sinks

For each vulnerability:
1. **Location**: File and line
2. **Type**: Reflected / Stored / DOM-based
3. **Source**: Where tainted data enters
4. **Sink**: Where it is rendered unsafely
5. **Context**: HTML body / attribute / JavaScript / URL / CSS
6. **Fix**: The correct encoding for that context

Template/code to analyze:
{{code}}

Framework in use: {{framework}}

Consider the framework's auto-escaping behavior. Only flag cases where:
- Auto-escaping is explicitly bypassed (|safe, dangerouslySetInnerHTML, {!! !!})
- Data is inserted into a JavaScript or URL context where auto-escaping does not help
- innerHTML, document.write, or eval is used with user data
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `file_type` | Type of file being reviewed | `Jinja2 template`, `React component`, `EJS template` |
| `code` | Template or JavaScript source code | Contents of a template file |
| `framework` | Web framework being used | `Django`, `React`, `Express+EJS` |

## Example Output

**Finding 1**
- **Location**: `profile.html`, line 15
- **Type**: Stored XSS
- **Source**: `user.bio` field from database
- **Sink**: `{{ user.bio | safe }}` in Jinja2 template
- **Context**: HTML body
- **Fix**: Remove the `|safe` filter or sanitize with bleach before storing:
```python
import bleach
user.bio = bleach.clean(user.bio, tags=['p', 'b', 'i', 'a'], attributes={'a': ['href']})
```

## Variations

1. **CSP-aware review** — Include your Content-Security-Policy header and ask the model to evaluate which XSS vectors the CSP would block and which it would not.
2. **DOM-only audit** — Focus exclusively on client-side JavaScript by providing bundled JS and asking for DOM sink analysis.
3. **With DOMPurify validation** — Ask the model to verify that DOMPurify is correctly configured where used.

## Best Model

Claude Sonnet 4.6 works well for individual templates. For tracing data flow from backend to frontend across multiple files, use Claude Opus 4.6.
