---
title: "Building FastAPI CRUD Endpoints with SQLAlchemy"
description: "A step-by-step guide to creating production-ready FastAPI CRUD endpoints with async SQLAlchemy, Pydantic models, and proper error handling."
category: skills
tags: ["python", "fastapi", "sqlalchemy", "crud"]
difficulty: intermediate
date: 2026-02-25
featured: false
---

Building CRUD endpoints in FastAPI requires coordinating Pydantic models for request/response validation, SQLAlchemy models for database operations, and dependency injection for session management. This skill walks through the complete pattern from database setup to tested endpoints.

## Steps

1. **Set up the async database engine** — Create an `AsyncEngine` with `create_async_engine()` and a session factory with `async_sessionmaker`. Define a `get_db` dependency that yields sessions with proper cleanup.

2. **Define your SQLAlchemy model** — Create a mapped class using the declarative style with `mapped_column()` for each field. Use appropriate SQL types and constraints.

3. **Create Pydantic schemas** — Define separate models for Create (input), Update (partial input with optional fields), and Response (output with `from_attributes=True`).

4. **Write the Create endpoint** — POST handler that validates input with the Create schema, creates the ORM object, commits, and returns the Response schema.

5. **Write the Read endpoint** — GET handler with path parameter for single item and query parameters for list with pagination.

6. **Write the Update endpoint** — PATCH/PUT handler that loads the existing record, applies changes from the Update schema (excluding unset fields), and commits.

7. **Write the Delete endpoint** — DELETE handler that returns 204 No Content on success, 404 if the item does not exist.

8. **Add error handling** — Create a common `get_or_404` utility that raises HTTPException with 404 status when a resource is not found.

## Example

```python
from uuid import UUID, uuid4
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Article
from app.schemas import ArticleCreate, ArticleUpdate, ArticleResponse

router = APIRouter(prefix="/articles", tags=["articles"])

async def get_or_404(db: AsyncSession, article_id: UUID) -> Article:
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
async def create_article(body: ArticleCreate, db: AsyncSession = Depends(get_db)):
    article = Article(id=uuid4(), **body.model_dump())
    db.add(article)
    await db.commit()
    await db.refresh(article)
    return article

@router.get("/", response_model=list[ArticleResponse])
async def list_articles(
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Article).offset(offset).limit(limit))
    return result.scalars().all()

@router.get("/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: UUID, db: AsyncSession = Depends(get_db)):
    return await get_or_404(db, article_id)

@router.patch("/{article_id}", response_model=ArticleResponse)
async def update_article(
    article_id: UUID, body: ArticleUpdate, db: AsyncSession = Depends(get_db),
):
    article = await get_or_404(db, article_id)
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(article, field, value)
    await db.commit()
    await db.refresh(article)
    return article

@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_article(article_id: UUID, db: AsyncSession = Depends(get_db)):
    article = await get_or_404(db, article_id)
    await db.delete(article)
    await db.commit()
```

## When to Use

- You are building a REST API with standard CRUD operations over database resources.
- You need automatic request validation, OpenAPI documentation, and async database access.
- You want a consistent pattern across multiple resources that your team can follow.

## When NOT to Use

- Your API logic is primarily event-driven or real-time — consider WebSocket endpoints or message queues instead.
- You have complex multi-step workflows that do not map cleanly to CRUD — use a service layer with dedicated endpoints.
- You are building a GraphQL API — use Strawberry or Ariadne instead of REST endpoints.

## Prerequisites

- Python 3.10+, FastAPI, SQLAlchemy 2.0+ with async support
- An async database driver (asyncpg for PostgreSQL, aiosqlite for SQLite)
- Pydantic v2 for request/response models

## Pro Tips

1. **Transaction-per-request** — Use middleware or a dependency that wraps each request in a database transaction, committing on success and rolling back on error, instead of manual commit/rollback in each handler.
2. **Bulk operations** — For endpoints that need to create or update many items, use `session.execute(insert(Model).values(items))` for bulk inserts instead of adding items one by one.
3. **Soft delete** — Add an `is_deleted` boolean column and filter it out in queries instead of actually deleting records. Override the delete endpoint to set the flag instead of removing the row.
