---
title: "Pydantic Model from JSON Schema Prompt"
description: "A prompt that generates Pydantic v2 models from JSON Schema definitions with full validation and custom types."
category: prompts
tags: ["python", "pydantic", "json-schema", "validation"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt takes a JSON Schema definition and produces Pydantic v2 models that validate against that schema. It maps JSON Schema types to Python types, handles $ref references as nested models, converts pattern validations to Pydantic field validators, and includes model configuration for JSON serialization.

## Prompt

```
Generate Pydantic v2 models from the following JSON Schema. Follow these rules:

1. Map JSON Schema types to Python types:
   - string → str (with format mappings: date-time → datetime, email → EmailStr, uri → HttpUrl, uuid → UUID)
   - integer → int
   - number → float or Decimal (use Decimal for currency)
   - boolean → bool
   - array → list[ItemType]
   - object → a new Pydantic model class

2. Handle JSON Schema keywords:
   - required → non-optional fields
   - enum → Literal[] or Python Enum
   - pattern → field_validator with regex
   - minimum/maximum → Field(ge=, le=)
   - minLength/maxLength → Field(min_length=, max_length=)
   - minItems/maxItems → Field(min_length=, max_length=) on lists
   - $ref → separate Pydantic model class
   - allOf → model inheritance or merged fields
   - oneOf/anyOf → Union types with discriminator

3. Add ConfigDict with:
   - populate_by_name=True for alias support
   - str_strip_whitespace=True
   - json_schema_extra for OpenAPI examples

4. Include all necessary imports.

JSON Schema:
```json
{{json_schema}}
```

Additional requirements: {{requirements}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `json_schema` | The JSON Schema definition | `{"type": "object", "properties": {...}}` |
| `requirements` | Extra requirements like ORM mode | `Enable from_attributes for SQLAlchemy` |

## Example Output

```python
from datetime import datetime
from decimal import Decimal
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, HttpUrl

class Address(BaseModel):
    street: str = Field(min_length=1, max_length=200)
    city: str
    state: str = Field(pattern=r"^[A-Z]{2}$")
    zip_code: str = Field(alias="zipCode", pattern=r"^\d{5}(-\d{4})?$")

class Customer(BaseModel):
    model_config = ConfigDict(populate_by_name=True, str_strip_whitespace=True)

    id: UUID
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    status: Literal["active", "inactive", "suspended"]
    address: Address
    balance: Decimal = Field(ge=0, decimal_places=2)
    created_at: datetime
```

## Variations

1. **OpenAPI to Pydantic** — Use OpenAPI 3.1 component schemas instead of raw JSON Schema. The prompt handles the additional OpenAPI metadata like examples and descriptions.
2. **TypeScript to Pydantic** — Provide TypeScript interface definitions instead of JSON Schema. The prompt maps TS types to Python equivalents.
3. **Recursive schemas** — For JSON Schemas with recursive $ref (like tree structures), the prompt generates models with `model_rebuild()` calls.

## Best Model

Claude Sonnet 4.6 is recommended for straightforward schema conversions. Use Claude Opus 4.6 for complex schemas with deep nesting, discriminated unions, and conditional validation rules that require careful type mapping.
