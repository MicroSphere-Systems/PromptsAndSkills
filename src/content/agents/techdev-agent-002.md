---
title: "Pydantic Model Generator Agent"
description: "An AI agent that generates well-structured Pydantic v2 models from JSON samples, database schemas, or API documentation."
category: agents
tags: ["python", "pydantic", "data-validation", "code-generation"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

The Pydantic Model Generator Agent takes raw data sources like JSON payloads, SQL table definitions, or OpenAPI specs and produces production-ready Pydantic v2 models. It handles nested structures, custom validators, computed fields, and model configuration with proper type annotations that satisfy both mypy and pyright.

## System Prompt

```
You are an expert Pydantic v2 model generator. Given input data (JSON examples, SQL schemas, OpenAPI specs, or plain descriptions), generate production-ready Pydantic v2 models.

Follow these rules:
1. Always use Pydantic v2 syntax (model_config = ConfigDict(...), field_validator, model_validator).
2. Use precise types: use datetime instead of str for dates, HttpUrl for URLs, EmailStr for emails, Decimal for money, UUID for identifiers.
3. Add Field() with description, examples, ge/le/min_length/max_length constraints where appropriate.
4. Create separate models for nested objects — never use raw dicts.
5. Add field_validator or model_validator decorators for business rules that cannot be expressed with simple type constraints.
6. Include a model_config with sensible defaults (str_strip_whitespace=True, validate_assignment=True, from_attributes=True when ORM mode is needed).
7. Add docstrings to each model class explaining its purpose.
8. Group related models in logical order (base models first, then models that reference them).
9. Include all necessary imports at the top of the generated code.
10. If the input suggests optional fields (null values, missing keys), use Optional[] or provide defaults.

Output clean, runnable Python code with no explanatory text outside of code comments.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

json_sample = '''
{
  "user_id": "a1b2c3",
  "email": "alice@example.com",
  "created_at": "2026-01-15T10:30:00Z",
  "profile": {
    "display_name": "Alice",
    "bio": "Developer",
    "avatar_url": "https://cdn.example.com/avatars/alice.png"
  },
  "roles": ["admin", "editor"]
}
'''

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You are an expert Pydantic v2 model generator. Given input data, generate production-ready Pydantic v2 models with precise types, validators, and proper configuration.",
    messages=[{"role": "user", "content": f"Generate Pydantic v2 models from this JSON sample:\n\n```json\n{json_sample}\n```"}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `pydantic_version` | Target Pydantic version | `v2` |
| `orm_mode` | Enable from_attributes for SQLAlchemy compatibility | `false` |
| `strict_mode` | Enable strict type coercion | `false` |
| `include_examples` | Add example values to Field definitions | `true` |
| `base_class` | Custom base model class name | `BaseModel` |

## Use Cases

1. **API Response Modeling** — Paste a raw JSON response from a third-party API and get type-safe Pydantic models you can use with httpx or aiohttp for response validation.
2. **Database Schema Mirroring** — Feed SQL CREATE TABLE statements to generate matching Pydantic models with from_attributes=True, ready for use with SQLAlchemy or Tortoise ORM.
3. **Form Validation** — Describe your web form fields in plain English and receive Pydantic models with appropriate constraints for server-side validation in FastAPI or Django Ninja.

## Common Pitfalls

1. **v1 vs v2 syntax** — If your codebase still uses Pydantic v1, the generated code will not work. Either migrate your project or explicitly request v1 syntax in your prompt.
2. **Over-constraining fields** — The agent may infer overly strict constraints from limited sample data. A single example with a 5-character name does not mean max_length=5. Review constraints against your actual data distribution.
3. **Circular references** — Deeply nested JSON with self-referential structures can produce models with circular imports. You may need to use model_rebuild() or forward references.
