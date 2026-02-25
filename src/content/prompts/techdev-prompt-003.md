---
title: "FastAPI Route Generator Prompt"
description: "A prompt that generates complete FastAPI route handlers with request validation, error responses, and OpenAPI documentation."
category: prompts
tags: ["python", "fastapi", "api", "code-generation"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

This prompt generates complete FastAPI route handlers from a description of the desired endpoint behavior. It produces Pydantic request/response models, proper HTTP status codes, dependency injection for authentication and database access, and OpenAPI-compliant documentation with example responses.

## Prompt

```
Generate a complete FastAPI endpoint with the following specification:

Resource: {{resource_name}}
HTTP Method: {{http_method}}
Path: {{path}}
Description: {{description}}

Requirements:
1. Create Pydantic v2 request and response models with proper types and validation.
2. Use the appropriate HTTP status code (200 for GET, 201 for POST creation, 204 for DELETE, etc.).
3. Include these response models in the route decorator: success response, 400 validation error, 404 not found, and any other relevant error responses.
4. Add dependency injection for:
   - Database session (Depends(get_db))
   - Authentication (Depends(get_current_user)) if the endpoint requires auth
5. Add proper docstring with summary and description for OpenAPI docs.
6. Include error handling with HTTPException for known error cases.
7. Return the response using the response model, not raw dicts.

Authentication required: {{auth_required}}
Database operations: {{db_operations}}
Additional context: {{context}}
```

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `resource_name` | The API resource name | `BlogPost` |
| `http_method` | HTTP method | `POST` |
| `path` | URL path pattern | `/api/v1/posts` |
| `description` | What the endpoint does | `Create a new blog post with tags` |
| `auth_required` | Whether auth is needed | `yes` |
| `db_operations` | Database operations needed | `insert post, link tags` |
| `context` | Additional requirements | `Tags are created if they don't exist` |

## Example Output

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/api/v1/posts", tags=["posts"])

class PostCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1)
    tags: list[str] = Field(default_factory=list, max_length=10)

class PostResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    title: str
    content: str
    tags: list[str]
    author_id: UUID
    created_at: datetime

@router.post(
    "/",
    response_model=PostResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a blog post",
    responses={409: {"description": "Post with this title already exists"}},
)
async def create_post(
    body: PostCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(get_current_user),
) -> PostResponse:
    """Create a new blog post. Tags are created if they don't exist."""
    existing = await db.execute(select(Post).where(Post.title == body.title))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Post title already exists")
    post = Post(title=body.title, content=body.content, author_id=user.id)
    db.add(post)
    await db.commit()
    return post
```

## Variations

1. **Batch endpoint** — Generate endpoints that accept and process lists of items, with partial success handling and detailed error reporting per item.
2. **File upload** — Generate endpoints using `UploadFile` and `File` for multipart form data with size limits and type validation.
3. **WebSocket** — Generate WebSocket endpoints with connection management, heartbeats, and JSON message validation.

## Best Model

Claude Sonnet 4.6 handles standard CRUD endpoint generation well. Use Claude Opus 4.6 for complex endpoints with multiple database operations, transaction management, and intricate authorization logic.
