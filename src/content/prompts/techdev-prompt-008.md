---
title: "Python Exception Hierarchy Design Prompt"
description: "A prompt that generates custom exception class hierarchies with error codes, structured context, and user-facing message translation."
category: prompts
tags: ["python", "exceptions", "error-handling", "design"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt designs a complete custom exception hierarchy for a Python application. It creates a base exception class with error codes and context data, domain-specific exceptions that inherit from it, and a mapping layer that translates internal exceptions to HTTP status codes and user-safe messages.

## Prompt

```
Design a custom exception hierarchy for a {{domain}} application.

Requirements:
1. Base exception class with:
   - Error code (string enum like "PAYMENT_DECLINED", "USER_NOT_FOUND")
   - Structured context dict for logging (request_id, user_id, etc.)
   - User-safe message (no internal details)
   - HTTP status code mapping
   - Timestamp

2. Domain-specific exception subclasses for these error categories:
{{error_categories}}

3. An exception handler that:
   - Translates exceptions to API error responses
   - Logs full details (including context) at appropriate levels
   - Returns only user-safe messages to clients
   - Includes request correlation ID

4. Helper functions for common patterns:
   - raise_for_not_found(resource, identifier)
   - raise_for_permission(user, action, resource)
   - raise_for_validation(field, message)

Framework: {{framework}}
Logging format: {{log_format}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `domain` | Application domain | `e-commerce` |
| `error_categories` | List of error types needed | `payment, inventory, shipping, auth` |
| `framework` | Web framework | `fastapi` |
| `log_format` | Logging format preference | `json` |

## Example Output

```python
from enum import StrEnum
from datetime import datetime, UTC

class ErrorCode(StrEnum):
    PAYMENT_DECLINED = "PAYMENT_DECLINED"
    INSUFFICIENT_INVENTORY = "INSUFFICIENT_INVENTORY"
    USER_NOT_FOUND = "USER_NOT_FOUND"

class AppError(Exception):
    def __init__(
        self,
        code: ErrorCode,
        message: str,
        user_message: str = "An unexpected error occurred",
        status_code: int = 500,
        context: dict | None = None,
    ):
        self.code = code
        self.message = message
        self.user_message = user_message
        self.status_code = status_code
        self.context = context or {}
        self.timestamp = datetime.now(UTC)
        super().__init__(message)

class PaymentError(AppError):
    def __init__(self, message: str, context: dict | None = None):
        super().__init__(
            code=ErrorCode.PAYMENT_DECLINED,
            message=message,
            user_message="Payment could not be processed",
            status_code=402,
            context=context,
        )
```

## Variations

1. **Django REST Framework** — Generate exception classes compatible with DRF's exception handling and APIException base class.
2. **gRPC error mapping** — Map exceptions to gRPC status codes instead of HTTP status codes, with proper error details proto messages.
3. **Multi-language errors** — Add i18n support with error message translation keys instead of hardcoded strings, compatible with gettext or similar.

## Best Model

Claude Sonnet 4.6 handles exception hierarchy design well for most applications. Use Claude Opus 4.6 when the error domain is complex with overlapping categories that need careful inheritance design.
