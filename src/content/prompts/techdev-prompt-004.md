---
title: "Pytest Test Case Generator Prompt"
description: "A prompt that generates comprehensive pytest test cases with fixtures, parametrization, and edge case coverage for Python functions."
category: prompts
tags: ["python", "pytest", "testing", "test-generation"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt generates thorough pytest test suites for Python functions. It creates test cases covering happy paths, edge cases, error conditions, and boundary values. It uses parametrize for data-driven tests, fixtures for setup/teardown, and proper assertion patterns with descriptive test names.

## Prompt

```
Generate comprehensive pytest test cases for the following Python code:

```{{language}}
{{code_under_test}}
```

Follow these rules:
1. NAMING: Use descriptive test names that explain the scenario: test_<function>_<scenario>_<expected_behavior>
2. STRUCTURE: Arrange each test using Arrange-Act-Assert pattern with clear sections.
3. COVERAGE: Include tests for:
   - Happy path (normal expected inputs)
   - Edge cases (empty inputs, single elements, boundary values)
   - Error cases (invalid inputs that should raise exceptions)
   - Type edge cases (None, wrong types if not type-checked)
4. PARAMETRIZE: Use @pytest.mark.parametrize for tests that differ only in input/output data.
5. FIXTURES: Create fixtures for complex setup that is shared across tests.
6. ASSERTIONS: Use specific assertions (assert x == y, not assert x). Use pytest.raises for exception testing with match patterns. Use pytest.approx for floating point comparisons.
7. MOCKING: Use pytest-mock (mocker fixture) to mock external dependencies. Only mock at boundaries, not internal implementation.
8. ASYNC: If testing async code, use @pytest.mark.asyncio and async def test functions.

Additional context: {{test_context}}
Focus areas: {{focus_areas}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `code_under_test` | The Python code to test | `def calculate_discount(price, tier): ...` |
| `language` | Language marker | `python` |
| `test_context` | Context about the project | `FastAPI app with SQLAlchemy` |
| `focus_areas` | Areas to emphasize | `edge cases, error handling` |

## Example Output

```python
import pytest
from decimal import Decimal
from app.pricing import calculate_discount

class TestCalculateDiscount:
    @pytest.mark.parametrize("price,tier,expected", [
        (Decimal("100.00"), "gold", Decimal("80.00")),
        (Decimal("100.00"), "silver", Decimal("90.00")),
        (Decimal("100.00"), "bronze", Decimal("95.00")),
    ])
    def test_applies_correct_discount_per_tier(self, price, tier, expected):
        result = calculate_discount(price, tier)
        assert result == expected

    def test_zero_price_returns_zero(self):
        result = calculate_discount(Decimal("0"), "gold")
        assert result == Decimal("0")

    def test_unknown_tier_raises_value_error(self):
        with pytest.raises(ValueError, match="Unknown tier"):
            calculate_discount(Decimal("100"), "platinum")

    def test_negative_price_raises_value_error(self):
        with pytest.raises(ValueError, match="Price must be non-negative"):
            calculate_discount(Decimal("-10"), "gold")
```

## Variations

1. **Integration tests** — Generate tests that use a real test database with transaction rollback instead of mocks, suitable for testing complex query logic.
2. **Property-based tests** — Generate Hypothesis-based property tests that verify invariants across random inputs instead of specific example cases.
3. **Snapshot tests** — Generate tests using pytest-snapshot for complex output structures where maintaining expected values manually is impractical.

## Best Model

Claude Sonnet 4.6 generates solid test cases for most functions. Use Claude Opus 4.6 when the code under test has complex state machines, concurrent behavior, or subtle edge cases that require deeper reasoning to identify.
