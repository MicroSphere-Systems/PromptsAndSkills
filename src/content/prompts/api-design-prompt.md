---
title: "REST API Design Prompt"
description: "A prompt for designing clean, consistent REST APIs with proper resource modeling and error handling."
category: "prompts"
tags: ["api-design", "rest", "architecture", "backend", "openapi"]
difficulty: "intermediate"
date: 2026-02-25
featured: false
---

# REST API Design Prompt

Use this prompt to get an LLM to help you design a well-structured REST API from scratch. It covers resource modeling, endpoint design, error handling, and documentation.

## The Prompt

```text
You are an expert API architect. Help me design a REST API for the following system.
Follow these design principles:

## Principles
- RESTful resource-oriented design (nouns, not verbs)
- Consistent naming conventions (plural nouns, kebab-case)
- Proper HTTP method semantics (GET reads, POST creates, PUT replaces,
  PATCH updates, DELETE removes)
- Meaningful HTTP status codes
- Pagination, filtering, and sorting on list endpoints
- HATEOAS links where valuable
- Versioning strategy

## For Each Resource, Provide:

### 1. Resource Model
- Field names, types, and constraints
- Required vs optional fields
- Relationships to other resources

### 2. Endpoints
For each endpoint:
- HTTP method and path
- Request body schema (if applicable)
- Query parameters (for filtering, pagination, sorting)
- Response body schema
- HTTP status codes and when each is returned

### 3. Error Response Format
Use a consistent error envelope:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": [
      { "field": "email", "issue": "Invalid email format" }
    ]
  }
}

### 4. Authentication & Authorization
- Which endpoints require authentication?
- What authorization model (RBAC, ABAC, scopes)?
- What does each role have access to?

### 5. Rate Limiting & Pagination
- Default and max page sizes
- Cursor-based vs offset pagination (and why)
- Rate limit headers

Here is the system I need an API for:
```

## Example Usage

Append your system description after the prompt:

```text
A project management tool where:
- Users belong to organizations
- Organizations have multiple projects
- Projects contain tasks with assignees, statuses, due dates, and labels
- Tasks can have comments and file attachments
- Users can be admins, members, or viewers within an organization
```

## What You Get Back

A well-structured API design covering:

- `GET /api/v1/organizations/:orgId/projects` -- list projects with pagination
- `POST /api/v1/projects/:projectId/tasks` -- create a task
- Properly nested vs flat resource paths with clear reasoning
- Request/response JSON examples for every endpoint
- An error catalog with standard error codes

## Follow-Up Prompts

```text
Now generate an OpenAPI 3.1 specification for this API design in YAML format.
```

```text
What are the potential N+1 query problems in this design and how would
you solve them with compound documents or sparse fieldsets?
```

```text
Design the webhook event payloads for task.created, task.updated,
and task.completed events.
```

## Tips

- **Start with the domain model** before jumping to endpoints. Get the resources and relationships right first.
- **Ask about edge cases** -- "What happens if a user is removed from an org but has assigned tasks?"
- **Request pagination examples** -- Make sure the cursor/offset strategy is fully specified with example responses.
- **Think about idempotency** -- Ask which operations should be idempotent and how to implement that.
