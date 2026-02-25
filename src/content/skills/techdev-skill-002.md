---
title: "Building Pydantic v2 Models with Custom Validators"
description: "A step-by-step guide to creating Pydantic v2 models with field validators, model validators, and custom serialization logic."
category: skills
tags: ["python", "pydantic", "validation", "data-modeling"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Pydantic v2 provides a powerful validation system with field-level and model-level validators, custom serializers, and computed fields. This skill walks you through building production models that go beyond basic type checking to enforce business rules and custom serialization formats.

## Steps

1. **Define your model with typed fields** — Start with a BaseModel subclass using Python type annotations for each field. Use `Field()` for constraints like `ge`, `le`, `min_length`, `max_length`.

2. **Add field validators** — Decorate methods with `@field_validator('field_name')` to add custom validation logic that runs after type parsing. Use `mode='before'` for pre-parsing transformations.

3. **Add model validators** — Use `@model_validator(mode='after')` for cross-field validation that depends on multiple field values being present.

4. **Configure serialization** — Use `@field_serializer('field_name')` to customize how fields are serialized to JSON (e.g., formatting datetimes, converting enums to display strings).

5. **Add computed fields** — Use `@computed_field` for derived properties that should appear in serialized output but are not stored as fields.

6. **Set model configuration** — Define `model_config = ConfigDict(...)` with settings like `str_strip_whitespace`, `validate_assignment`, and `from_attributes`.

7. **Test your model** — Create instances with valid and invalid data to verify validators work. Use `model_validate()` for dict input and `model_validate_json()` for JSON strings.

## Example

```python
from datetime import datetime, UTC
from decimal import Decimal
from pydantic import (
    BaseModel, ConfigDict, Field, computed_field,
    field_validator, field_serializer, model_validator,
)

class LineItem(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, validate_assignment=True)

    product_name: str = Field(min_length=1, max_length=200)
    quantity: int = Field(ge=1, le=10_000)
    unit_price: Decimal = Field(ge=0, decimal_places=2)
    discount_percent: Decimal = Field(default=Decimal("0"), ge=0, le=100)

    @field_validator("product_name")
    @classmethod
    def normalize_product_name(cls, v: str) -> str:
        return v.strip().title()

    @field_serializer("unit_price", "discount_percent")
    def serialize_decimal(self, value: Decimal) -> str:
        return f"{value:.2f}"

    @computed_field
    @property
    def total(self) -> Decimal:
        discount_multiplier = 1 - (self.discount_percent / 100)
        return (self.unit_price * self.quantity * discount_multiplier).quantize(Decimal("0.01"))

class Invoice(BaseModel):
    invoice_number: str = Field(pattern=r"^INV-\d{6}$")
    items: list[LineItem] = Field(min_length=1)
    issued_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    @model_validator(mode="after")
    def validate_total_not_zero(self) -> "Invoice":
        total = sum(item.total for item in self.items)
        if total <= 0:
            raise ValueError("Invoice total must be greater than zero")
        return self

# Usage
invoice = Invoice(
    invoice_number="INV-000123",
    items=[
        {"product_name": "widget", "quantity": 5, "unit_price": "19.99", "discount_percent": "10"},
    ],
)
print(invoice.model_dump_json(indent=2))
```

## When to Use

- You are building API request/response models that need validation beyond basic types.
- You need to enforce business rules like cross-field constraints at the data layer.
- You want consistent serialization of complex types (Decimal, datetime, enums) across your API.
- You are working with external data (user input, API responses, CSV imports) that needs sanitization.

## When NOT to Use

- You just need a simple data container without validation — use a plain `dataclass` instead.
- Your validation logic is complex enough to warrant a separate service layer — keep models simple and validate in the business layer.
- You are building internal-only data structures that never touch I/O boundaries — the overhead of validation is unnecessary.

## Prerequisites

- Python 3.10 or later
- Pydantic v2.0+ installed (`pip install pydantic>=2.0`)
- Basic understanding of Python type annotations

## Pro Tips

1. **Discriminated unions** — Use `Literal` type fields as discriminators with `Union` types to let Pydantic automatically pick the right model variant when parsing mixed data.
2. **Reusable validators** — Extract common validators (email normalization, phone formatting) into standalone functions and reuse them across models with `@field_validator` in each.
3. **JSON Schema export** — Use `Model.model_json_schema()` to generate JSON Schema from your models, which you can feed directly to OpenAPI documentation or form generators.
