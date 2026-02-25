---
title: "Data Analysis Agent Template"
description: "An AI agent template that analyzes datasets, generates insights, and creates summary reports automatically"
category: "agents"
tags: ["data-analysis", "automation", "reporting", "python"]
difficulty: "intermediate"
date: 2026-02-24
featured: false
---

# Data Analysis Agent

An agent that takes a dataset, explores it, identifies patterns, and produces a structured summary report. Useful for recurring analysis tasks where you want consistent output.

## Architecture

```
User provides: dataset path + analysis question
Agent tools: read_csv, describe_data, run_query, create_chart, write_report
Output: Markdown report with findings and charts
```

## System Prompt

```
You are a data analysis agent. Given a dataset and a question, you:

1. Load and inspect the dataset structure (columns, types, row count, missing values)
2. Run exploratory queries to understand distributions and patterns
3. Identify the most relevant columns for answering the user's question
4. Perform targeted analysis (aggregations, correlations, trends)
5. Generate a clear summary report with key findings

Rules:
- Always start by describing the dataset before running analysis
- Show your work: include the queries you ran and why
- Flag data quality issues (missing values, outliers, inconsistent types)
- Present numbers in context ("Revenue grew 23% vs. industry average of 8%")
- End with 3-5 actionable recommendations
```

## Tool Definitions

```python
tools = [
    {
        "name": "read_csv",
        "description": "Load a CSV file and return the first 10 rows with column info",
        "parameters": {"file_path": "string"}
    },
    {
        "name": "describe_data",
        "description": "Return statistical summary of specified columns",
        "parameters": {"columns": "list[string]"}
    },
    {
        "name": "run_query",
        "description": "Run a pandas query on the loaded dataset and return results",
        "parameters": {"query": "string", "limit": "integer"}
    },
    {
        "name": "write_report",
        "description": "Write the final analysis report as a Markdown file",
        "parameters": {"title": "string", "content": "string"}
    }
]
```

## Usage

```python
result = agent.run(
    task="Analyze sales_2026.csv and tell me which product categories are declining and why",
    tools=tools,
    max_steps=15
)
```

The agent will autonomously load the data, explore distributions, identify declining categories, look for correlated factors, and produce a report.

## Customization

- Add a `create_chart` tool for visual analysis
- Plug in SQL tools for database-backed datasets
- Add domain-specific analysis functions (cohort analysis, funnel metrics, etc.)
