---
title: "Building MCP Servers"
description: "A practical guide to building Model Context Protocol servers that extend Claude and other AI assistants with custom tools."
category: "skills"
tags: ["mcp", "claude", "tools", "server", "typescript"]
difficulty: "advanced"
date: 2026-02-25
featured: true
---

# Building MCP Servers

The Model Context Protocol (MCP) lets you extend AI assistants like Claude with custom tools, resources, and prompts. This guide walks through building an MCP server from scratch using TypeScript.

## What Is MCP?

MCP is an open protocol that standardizes how AI applications connect to external data sources and tools. Instead of building custom integrations for every AI platform, you build one MCP server and any MCP-compatible client can use it.

**Key concepts:**

- **Tools** -- Functions the AI can call (e.g., query a database, call an API)
- **Resources** -- Data the AI can read (e.g., files, database records, documentation)
- **Prompts** -- Reusable prompt templates with parameters

## Project Setup

```bash
mkdir my-mcp-server && cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

## Building Your First Server

Create `src/index.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

// Define a tool
server.tool(
  "get-weather",
  "Get current weather for a city",
  {
    city: z.string().describe("City name"),
    units: z.enum(["celsius", "fahrenheit"]).default("celsius"),
  },
  async ({ city, units }) => {
    // Your implementation here -- call a weather API, database, etc.
    const temp = units === "celsius" ? "22C" : "72F";
    return {
      content: [
        {
          type: "text",
          text: `Weather in ${city}: ${temp}, partly cloudy`,
        },
      ],
    };
  }
);

// Define a resource
server.resource(
  "config",
  "config://app",
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify({ version: "1.0", environment: "production" }),
      },
    ],
  })
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Connecting to Claude Desktop

Add your server to Claude Desktop's configuration file:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["path/to/my-mcp-server/dist/index.js"]
    }
  }
}
```

On macOS this file lives at `~/Library/Application Support/Claude/claude_desktop_config.json`. On Windows it is at `%APPDATA%\Claude\claude_desktop_config.json`.

## Best Practices

1. **Validate inputs with Zod** -- The SDK uses Zod schemas for input validation. Define precise schemas with descriptions so the AI knows how to use your tools.

2. **Return structured data** -- Return JSON or well-formatted text. The AI processes structured data more reliably than free-form text.

3. **Handle errors gracefully** -- Return error messages in the content rather than throwing exceptions. The AI can then report the error to the user.

4. **Keep tools focused** -- Each tool should do one thing well. Prefer multiple specific tools over one "do everything" tool.

5. **Add descriptions** -- Every tool, parameter, and resource should have a clear description. The AI uses these descriptions to decide when and how to use your tools.

## Testing Your Server

Use the MCP Inspector to test your server interactively:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

This opens a web UI where you can call your tools, read resources, and verify everything works before connecting to a real AI client.

## Next Steps

- Add authentication for sensitive operations
- Implement resource subscriptions for real-time updates
- Publish your server to npm for others to use
- Explore the [MCP specification](https://spec.modelcontextprotocol.io) for advanced features
