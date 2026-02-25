---
title: "Python Package pyproject.toml Generator Prompt"
description: "A prompt that generates a complete pyproject.toml configuration for Python packages with build system, dependencies, and tool settings."
category: prompts
tags: ["python", "packaging", "pyproject", "configuration"]
difficulty: beginner
date: 2026-02-25
featured: false
---

This prompt generates a complete pyproject.toml file for a Python package. It covers build system configuration, project metadata, dependency specifications with version constraints, optional dependency groups, entry points for CLI tools, and tool configurations for ruff, mypy, pytest, and coverage.

## Prompt

```
Generate a complete pyproject.toml for a Python package with these details:

Package name: {{package_name}}
Description: {{description}}
Python version requirement: {{python_version}}
Build system: {{build_system}}

Runtime dependencies:
{{dependencies}}

Development tool preferences:
- Linter/Formatter: {{linter}}
- Type checker: {{type_checker}}
- Test framework: {{test_framework}}

CLI entry points (if any): {{entry_points}}

Follow these rules:
1. Use the specified build system (hatchling, setuptools, flit, or pdm-backend).
2. Pin major versions for critical dependencies, use >= for flexible ones.
3. Create optional dependency groups: [dev] for development, [test] for testing, [docs] for documentation.
4. Configure tool sections for the specified linter, type checker, and test framework.
5. Set Python version requirement using requires-python.
6. Include proper project metadata: name, version, description, readme, license, authors, classifiers, urls.
7. Configure ruff with sensible defaults (select E, F, I, N, UP, B rules).
8. Configure mypy with strict mode settings.
9. Configure pytest with sensible defaults (testpaths, asyncio_mode if needed).
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `package_name` | PyPI package name | `my-awesome-lib` |
| `description` | One-line description | `A library for data processing` |
| `python_version` | Minimum Python version | `>=3.10` |
| `build_system` | Build backend | `hatchling` |
| `dependencies` | List of runtime deps | `httpx>=0.25, pydantic>=2.0` |
| `linter` | Linter choice | `ruff` |
| `type_checker` | Type checker choice | `mypy` |
| `test_framework` | Test framework choice | `pytest` |
| `entry_points` | CLI commands | `mycli = my_lib.cli:main` |

## Example Output

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "dataflow"
version = "0.1.0"
description = "ETL pipeline utilities for Python"
readme = "README.md"
license = {text = "MIT"}
requires-python = ">=3.10"
authors = [{name = "Your Name", email = "you@example.com"}]
classifiers = [
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
]
dependencies = [
    "httpx>=0.25",
    "pydantic>=2.0",
    "sqlalchemy>=2.0",
]

[project.optional-dependencies]
dev = ["ruff>=0.4", "mypy>=1.10", "pre-commit>=3.0"]
test = ["pytest>=8.0", "pytest-asyncio>=0.23", "pytest-cov>=5.0"]
docs = ["mkdocs>=1.5", "mkdocstrings[python]>=0.24"]

[project.scripts]
dataflow = "dataflow.cli:main"

[tool.ruff]
target-version = "py310"
line-length = 88
select = ["E", "F", "I", "N", "UP", "B", "SIM", "RUF"]

[tool.mypy]
python_version = "3.10"
strict = true

[tool.pytest.ini_options]
testpaths = ["tests"]
asyncio_mode = "auto"
```

## Variations

1. **Monorepo setup** — Generate pyproject.toml for a monorepo with multiple packages using hatch workspaces or a custom build system.
2. **Minimal library** — Strip down to the absolute minimum pyproject.toml for a simple single-module library with no CLI or optional dependencies.
3. **Application config** — Generate pyproject.toml for a deployable application (not a library) with pinned dependencies and Docker-friendly build settings.

## Best Model

Claude Sonnet 4.6 handles pyproject.toml generation well. This is a template-style task that does not require advanced reasoning.
