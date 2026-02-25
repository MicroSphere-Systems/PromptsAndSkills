---
title: "Python Dataclass Conversion Prompt"
description: "A prompt that converts plain Python classes, NamedTuples, and dictionaries into modern dataclasses with proper typing and configuration."
category: prompts
tags: ["python", "dataclasses", "refactoring", "typing"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt converts existing data representations into well-structured Python dataclasses. It handles conversion from plain classes with __init__, NamedTuples, TypedDicts, and raw dictionaries, adding slots, frozen configurations, and proper field definitions for modern Python 3.10+ code.

## Prompt

```
Convert the following Python data representation into a modern dataclass:

```{{language}}
{{source_code}}
```

Follow these rules:
1. Add @dataclass(slots=True) for memory efficiency (Python 3.10+).
2. Use frozen=True if the data is immutable (value objects, config, DTOs). Use mutable dataclass if the data needs to change after creation.
3. Use precise type annotations: datetime, Decimal, Path, UUID, Enum instead of generic str/int.
4. Use field(default_factory=...) for mutable defaults (lists, dicts, sets).
5. Add __post_init__ for computed fields or validation that runs on creation.
6. Add kw_only=True if the dataclass has more than 5 fields (prevents positional argument mistakes).
7. Include factory classmethods like from_dict(), from_row() for common creation patterns.
8. Add a to_dict() method if serialization is needed.
9. Keep the same public interface — callers should not need to change.

Mutability requirement: {{mutability}}
Include serialization: {{include_serialization}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `source_code` | The code to convert | `class Point: def __init__(self, x, y): ...` |
| `language` | Language marker | `python` |
| `mutability` | Whether the object should be mutable | `immutable` |
| `include_serialization` | Whether to add to_dict/from_dict | `yes` |

## Example Output

```python
from dataclasses import dataclass, field, asdict
from datetime import datetime
from decimal import Decimal
from uuid import UUID, uuid4

@dataclass(slots=True, frozen=True, kw_only=True)
class OrderItem:
    product_id: UUID
    name: str
    quantity: int = field(metadata={"min": 1})
    unit_price: Decimal
    order_id: UUID = field(default_factory=uuid4)
    created_at: datetime = field(default_factory=datetime.now)

    @property
    def total(self) -> Decimal:
        return self.unit_price * self.quantity

    @classmethod
    def from_dict(cls, data: dict) -> "OrderItem":
        return cls(
            product_id=UUID(data["product_id"]),
            name=data["name"],
            quantity=data["quantity"],
            unit_price=Decimal(data["unit_price"]),
        )

    def to_dict(self) -> dict:
        d = asdict(self)
        d["total"] = str(self.total)
        return d
```

## Variations

1. **attrs conversion** — If the project uses attrs instead of dataclasses, generate attrs classes with @attrs.define and attrs.field() with validators.
2. **Pydantic model** — When runtime validation is needed, convert to Pydantic BaseModel instead of a plain dataclass, adding field validators.
3. **NamedTuple preservation** — When immutability and tuple unpacking are needed, convert to typing.NamedTuple with type annotations instead of dataclass.

## Best Model

Claude Sonnet 4.6 handles dataclass conversions efficiently. This is a straightforward transformation that does not typically require the reasoning depth of Claude Opus 4.6.
