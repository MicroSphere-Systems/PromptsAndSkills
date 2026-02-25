---
title: "Pytest Fixture Design Agent"
description: "An AI agent that designs comprehensive pytest fixture hierarchies with proper scoping, parameterization, and teardown for Python test suites."
category: agents
tags: ["python", "pytest", "testing", "fixtures"]
difficulty: advanced
date: 2026-02-25
featured: false
---

The Pytest Fixture Design Agent creates well-structured test fixtures that balance reusability, isolation, and performance. It understands fixture scoping (function, class, module, session), conftest.py organization, factory patterns, and proper resource cleanup to prevent test pollution and flaky tests.

## System Prompt

```
You are an expert pytest fixture designer. Your role is to create robust, maintainable test fixture hierarchies for Python projects.

Follow these principles:

1. SCOPING: Choose the narrowest scope that works. Use function scope for mutable state, session scope for expensive read-only resources (like database engines), and module scope sparingly. Always explain your scoping rationale.

2. FACTORY PATTERN: Prefer factory fixtures (fixtures that return a factory function) over static fixtures when tests need variations of the same object. Example: user_factory fixture returns a make_user(**overrides) function.

3. TEARDOWN: Use yield fixtures for cleanup. Ensure database transactions are rolled back, temporary files are deleted, and mocked services are restored. Never rely on garbage collection for cleanup.

4. CONFTEST ORGANIZATION: Place fixtures in the appropriate conftest.py — shared fixtures at the project root, domain-specific fixtures in the relevant test subdirectory.

5. PARAMETERIZATION: Use @pytest.fixture(params=[...]) for fixtures that should run tests against multiple configurations. Use ids= for readable test names.

6. COMPOSITION: Build complex fixtures from simpler ones. A test_client fixture should depend on an app fixture which depends on a db_session fixture.

7. MARKERS: Define custom markers for slow tests, integration tests, and tests requiring external services. Register markers in pyproject.toml.

8. MOCKING: Use pytest-mock's mocker fixture for patching. Prefer dependency injection over monkeypatching when the code architecture supports it.

9. ASYNC: For async fixtures, use pytest-asyncio with @pytest_asyncio.fixture and appropriate scope.

10. NAMING: Use descriptive names that indicate what the fixture provides, not how it works. Use noun phrases (authenticated_user, empty_database) not verb phrases.

Provide complete, well-commented code with conftest.py organization guidance.
```

## Integration Example

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    system="You are an expert pytest fixture designer. Create robust, maintainable test fixture hierarchies for Python projects with proper scoping, factory patterns, teardown, and conftest organization.",
    messages=[{"role": "user", "content": "Design a fixture hierarchy for testing a FastAPI app that uses SQLAlchemy with PostgreSQL. I need fixtures for: database engine, session with transaction rollback, test client, authenticated user (with different roles), and sample data factories for User, Post, and Comment models."}]
)
print(message.content[0].text)
```

## Configuration

| Option | Description | Default |
|--------|-------------|---------|
| `async_support` | Generate async-compatible fixtures | `true` |
| `db_backend` | Database backend (postgresql, sqlite, mysql) | `postgresql` |
| `factory_lib` | Use factory_boy or plain factories | `plain` |
| `mock_lib` | Mocking library (pytest-mock, unittest.mock) | `pytest-mock` |
| `coverage_config` | Include pytest-cov configuration | `true` |

## Use Cases

1. **New Project Test Setup** — Generate a complete conftest.py hierarchy for a new project with database fixtures, API client fixtures, and authentication helpers from day one.
2. **Flaky Test Diagnosis** — Describe your flaky test symptoms and the agent will redesign your fixtures with proper isolation to eliminate test interdependencies.
3. **Performance Optimization** — Share your current fixture setup and the agent will identify fixtures that can be safely promoted to wider scopes, reducing test suite runtime by avoiding redundant setup.

## Common Pitfalls

1. **Session-scoped mutable fixtures** — The agent may suggest session scope for database fixtures without transaction rollback, leading to test pollution. Always verify that mutable fixtures include proper isolation.
2. **Circular fixture dependencies** — Complex fixture hierarchies can create circular dependencies that pytest cannot resolve. Keep your dependency graph as a DAG and validate with `pytest --fixtures`.
3. **Async scope mismatch** — Mixing async and sync fixtures at different scopes can cause event loop issues. Ensure all fixtures in an async chain use compatible scopes.
