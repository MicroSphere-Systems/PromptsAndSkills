---
title: "Your First Claude Project"
description: "A step-by-step guide to building your first project using the Claude API, from setup to deployment."
category: "guides"
tags: ["claude", "api", "tutorial", "python", "beginner"]
difficulty: "beginner"
date: 2026-02-25
featured: false
---

# Your First Claude Project

This guide walks you through building a complete project with the Claude API -- a command-line tool that summarizes any webpage. By the end, you will understand how to authenticate, send messages, handle responses, and structure a real application.

## Prerequisites

- Python 3.10 or later
- An Anthropic API key (sign up at console.anthropic.com)
- Basic Python knowledge

## Step 1: Project Setup

Create a new directory and set up the project:

```bash
mkdir claude-summarizer && cd claude-summarizer
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install anthropic httpx beautifulsoup4
```

Create a `.env` file for your API key:

```text
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Step 2: Fetch Web Content

Create `fetcher.py` to retrieve and clean webpage content:

```python
import httpx
from bs4 import BeautifulSoup


def fetch_page(url: str) -> str:
    """Fetch a webpage and extract its main text content."""
    response = httpx.get(url, follow_redirects=True, timeout=30)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    # Remove script, style, and nav elements
    for tag in soup(["script", "style", "nav", "header", "footer"]):
        tag.decompose()

    text = soup.get_text(separator="\n", strip=True)

    # Truncate to ~10,000 characters to stay within token limits
    return text[:10000]
```

## Step 3: Call Claude

Create `summarizer.py` with the Claude API integration:

```python
import anthropic


def summarize(content: str, style: str = "concise") -> str:
    """Send content to Claude and get a summary back."""
    client = anthropic.Anthropic()  # Uses ANTHROPIC_API_KEY env var

    style_instructions = {
        "concise": "Provide a 3-5 sentence summary of the key points.",
        "detailed": "Provide a comprehensive summary with all major points, organized with bullet points.",
        "eli5": "Explain the content as if the reader is a beginner with no technical background.",
    }

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""Summarize the following webpage content.

{style_instructions.get(style, style_instructions["concise"])}

Content:
{content}""",
            }
        ],
    )

    return message.content[0].text
```

## Step 4: Build the CLI

Create `main.py` to tie everything together:

```python
import argparse
import sys

from fetcher import fetch_page
from summarizer import summarize


def main():
    parser = argparse.ArgumentParser(description="Summarize any webpage with Claude")
    parser.add_argument("url", help="URL to summarize")
    parser.add_argument(
        "--style",
        choices=["concise", "detailed", "eli5"],
        default="concise",
        help="Summary style (default: concise)",
    )
    args = parser.parse_args()

    print(f"Fetching {args.url}...")
    content = fetch_page(args.url)

    print(f"Summarizing ({args.style} style)...")
    summary = summarize(content, args.style)

    print("\n--- Summary ---\n")
    print(summary)


if __name__ == "__main__":
    main()
```

## Step 5: Run It

```bash
python main.py https://example.com/article --style detailed
```

Output:

```text
Fetching https://example.com/article...
Summarizing (detailed style)...

--- Summary ---

[Claude's summary appears here]
```

## Step 6: Add Error Handling

Update `main.py` to handle common failures:

```python
from anthropic import APIError, RateLimitError

try:
    content = fetch_page(args.url)
except httpx.HTTPStatusError as e:
    print(f"Failed to fetch URL: {e.response.status_code}")
    sys.exit(1)

try:
    summary = summarize(content, args.style)
except RateLimitError:
    print("Rate limited. Wait a moment and try again.")
    sys.exit(1)
except APIError as e:
    print(f"API error: {e.message}")
    sys.exit(1)
```

## What You Have Learned

- How to set up the Anthropic Python SDK
- How to construct messages and send them to Claude
- How to process the API response
- How to handle errors properly
- How to structure a real project (not just a single script)

## Next Steps

- **Add streaming** -- Use `client.messages.stream()` for a better UX with longer content
- **Add caching** -- Save summaries to avoid re-processing the same URL
- **Build a web UI** -- Wrap this in a Flask or FastAPI app
- **Try tool use** -- Let Claude call your `fetch_page` function as a tool instead of fetching manually
