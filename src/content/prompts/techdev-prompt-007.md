---
title: "Python Dependency Injection Refactoring Prompt"
description: "A prompt that refactors tightly coupled Python code to use dependency injection for improved testability and modularity."
category: prompts
tags: ["python", "dependency-injection", "refactoring", "architecture"]
difficulty: advanced
date: 2026-02-25
featured: false
---

This prompt analyzes tightly coupled Python code that creates its own dependencies internally and refactors it to accept dependencies through constructor injection. It introduces protocols for abstraction, creates factory functions for wiring, and demonstrates how the refactored code enables easy testing with mocks.

## Prompt

```
Refactor the following Python code to use dependency injection. Currently, the code creates its own dependencies internally, making it hard to test and tightly coupled to specific implementations.

```{{language}}
{{coupled_code}}
```

Follow these rules:
1. Identify all internal dependency creation (direct instantiation of clients, database connections, file handles, external service calls).
2. Extract each dependency behind a Protocol (structural typing interface).
3. Accept dependencies through __init__ parameters (constructor injection).
4. Create a factory function or composition root that wires real dependencies together.
5. Provide a test example showing how to inject mock/stub dependencies.
6. Do NOT use a DI container library unless the dependency graph has more than 10 nodes.
7. Maintain the same public API — callers should see no change in behavior.

DI approach: {{di_approach}}
Include tests: {{include_tests}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `coupled_code` | The tightly coupled code to refactor | `class OrderService: def process(self): db = Database()...` |
| `language` | Language marker | `python` |
| `di_approach` | DI style (manual, container) | `manual` |
| `include_tests` | Whether to include test examples | `yes` |

## Example Output

```python
from typing import Protocol

class PaymentGateway(Protocol):
    def charge(self, amount: Decimal, card_id: str) -> str: ...

class EmailSender(Protocol):
    def send(self, to: str, subject: str, body: str) -> None: ...

class OrderService:
    def __init__(
        self,
        db: DatabaseSession,
        payment: PaymentGateway,
        email: EmailSender,
    ) -> None:
        self._db = db
        self._payment = payment
        self._email = email

    def process_order(self, user_id: str, items: list[Item]) -> Order:
        user = self._db.get_user(user_id)
        charge_id = self._payment.charge(total, user.card_id)
        self._email.send(user.email, "Order Confirmed", f"Charge: {charge_id}")
        return self._db.save_order(user_id, items, charge_id)

# Composition root
def create_order_service() -> OrderService:
    return OrderService(
        db=PostgresSession(DATABASE_URL),
        payment=StripeClient(STRIPE_KEY),
        email=SMTPSender(SMTP_HOST),
    )

# Test example
def test_process_order():
    service = OrderService(db=FakeDB(), payment=FakePayment(), email=FakeEmail())
    order = service.process_order("user-1", [item])
    assert order.charge_id == "fake-charge-id"
```

## Variations

1. **FastAPI Depends** — Refactor using FastAPI's Depends() system instead of manual constructor injection, with dependency override for tests.
2. **Container-based** — Use the dependency-injector library with declarative containers for large applications with complex dependency graphs.
3. **Event-driven decoupling** — Replace direct dependency calls with an event bus, fully decoupling producers from consumers.

## Best Model

Claude Opus 4.6 is recommended for complex refactoring that involves analyzing multiple interconnected classes and designing clean protocol hierarchies. Claude Sonnet 4.6 works for simpler single-class refactoring.
