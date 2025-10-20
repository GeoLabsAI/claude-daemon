# Skills Documentation

This directory contains all skills for the claude-daemon plugin. Skills are model-invoked capabilities that Claude autonomously uses based on context.

## 📚 Table of Contents

- [What are Skills?](#what-are-skills)
- [Available Skills](#available-skills)
- [How Skills Work](#how-skills-work)
- [Creating Custom Skills](#creating-custom-skills)
- [Best Practices](#best-practices)

## What are Skills?

Skills are different from commands:
- **Skills** (what we have): Model-invoked, Claude decides when to use them
- **Commands** (not implemented): User-invoked with `/command` syntax
- **Agents** (not implemented): Specialized sub-agents for complex tasks

Skills are automatically selected by Claude based on your request context.

## Available Skills

### 🔍 Code Quality (3 skills)

#### lint-and-fix
**Purpose**: Automated code linting with ESLint

**When to use**:
- Before committing code
- When fixing code style issues
- During code reviews

**What it does**:
- Runs ESLint with `--fix` flag
- Reports remaining issues
- Suggests improvements
- Recommends pre-commit hooks

**Example trigger**:
```
"Lint my code"
"Fix code style issues"
"Run ESLint"
```

---

#### typescript-health-check
**Purpose**: Comprehensive TypeScript project health check

**When to use**:
- Setting up a new TypeScript project
- Reviewing TypeScript configuration
- Troubleshooting compilation issues

**What it does**:
- Checks tsconfig.json existence and validity
- Validates compiler options (strict, noUncheckedIndexedAccess, etc.)
- Counts TypeScript files
- Runs compilation check
- Detects 'any' type usage
- Provides actionable recommendations

**Example trigger**:
```
"Check TypeScript health"
"Is my TypeScript config correct?"
"Validate TypeScript setup"
```

---

#### detect-unused-imports
**Purpose**: Find and report unused imports and exports

**When to use**:
- Cleaning up codebase
- Optimizing imports
- Before refactoring

**What it does**:
- Detects unused imports with ESLint
- Finds unused exports with ts-prune
- Provides cleanup commands
- Warns about false positives

**Example trigger**:
```
"Find unused imports"
"Clean up imports"
"Detect dead code"
```

---

### 🗺️ Next.js (1 skill)

#### route-map-nextjs
**Purpose**: Generate comprehensive map of Next.js routes

**When to use**:
- Exploring project structure
- Documenting routes
- Understanding app organization

**What it does**:
- Scans App Router (Next.js 13+) and Pages Router
- Categorizes pages, API routes, dynamic routes
- Identifies route groups and catch-all routes
- Generates visual map with statistics

**Example trigger**:
```
"Show me all Next.js routes"
"Map Next.js structure"
"List all API endpoints"
```

---

### 🏪 State Management (1 skill)

#### zustand-store-audit
**Purpose**: Audit Zustand stores for best practices

**When to use**:
- Reviewing state management
- Checking Zustand usage
- Improving store quality

**What it does**:
- Finds all Zustand stores
- Checks structure (create, TypeScript typing)
- Validates best practices (immer, selectors)
- Checks performance (shallow equality)
- Verifies testing coverage
- Provides scored report

**Example trigger**:
```
"Audit Zustand stores"
"Check state management"
"Review Zustand usage"
```

---

### 📡 API (2 skills)

#### api-contract-checker
**Purpose**: Verify API contracts match implementation

**When to use**:
- Reviewing APIs
- Checking endpoint consistency
- Validating API design

**What it does**:
- Finds all API routes
- Verifies request/response contracts
- Checks type safety (Zod, Yup validation)
- Validates documentation (JSDoc, OpenAPI)
- Reports compliance percentage

**Example trigger**:
```
"Check API contracts"
"Validate API endpoints"
"Review API types"
```

---

#### api-smoke
**Purpose**: Run smoke tests on API endpoints

**When to use**:
- Testing APIs quickly
- Verifying endpoints work
- Health checks

**What it does**:
- Discovers API routes
- Runs smoke tests with curl
- Checks status codes
- Tests error handling
- Reports failures

**Requirements**:
- Development server running on localhost:3000
- MCP fetch server configured

**Example trigger**:
```
"Test API endpoints"
"Run API smoke tests"
"Check if APIs work"
```

---

### 🐙 GitHub (1 skill)

#### gh-pr-digest
**Purpose**: Fetch and summarize GitHub pull requests

**When to use**:
- Reviewing PRs
- Getting PR status
- Generating PR reports

**What it does**:
- Extracts repository info from git remote
- Fetches PR data via GitHub API
- Formats PR information (status, author, labels, reviews)
- Generates digest

**Requirements**:
- GITHUB_TOKEN environment variable
- MCP fetch server configured

**Example trigger**:
```
"Show me open PRs"
"GitHub PR digest"
"List pull requests"
```

---

### 🚫 Quality Guards (1 skill)

#### no-cyrillic-check
**Purpose**: Enforce English-only policy in code and documentation

**When to use**:
- Checking for non-English characters
- Enforcing language standards
- Before committing

**What it does**:
- Scans code and documentation files
- Detects Cyrillic characters
- Reports findings with file:line references
- Suggests English translations

**Example trigger**:
```
"Check for Cyrillic"
"Enforce English-only"
"Find non-English text"
```

---

## How Skills Work

### Skill Structure

Each skill is a directory containing a `SKILL.md` file:

```
skills/skill-name/
└── SKILL.md
```

### SKILL.md Format

```markdown
---
name: Skill Display Name
description: What this skill does. Use when [trigger scenarios].
allowed-tools: Bash, Read, Grep
mcp-servers: fetch  # Optional
---

# Skill Title

## Instructions

1. Step-by-step instructions for Claude
2. What to do and how to do it
3. What to output

## Best Practices

- Guidelines for using this skill
- Common patterns
- Things to avoid
```

### YAML Frontmatter Fields

- **name** (required): Display name of the skill
- **description** (required): What the skill does and when to use it
- **allowed-tools** (optional): Restrict which tools the skill can use
- **mcp-servers** (optional): Required MCP servers

## Creating Custom Skills

### Step 1: Create Directory

```bash
mkdir -p skills/my-custom-skill
```

### Step 2: Create SKILL.md

```markdown
---
name: My Custom Skill
description: Does something useful. Use when you need to do X.
allowed-tools: Bash, Read
---

# My Custom Skill

## Instructions

1. Do this
2. Then do that
3. Output results

## Best Practices

- Follow these guidelines
```

### Step 3: Register in plugin.json

Add to the `skills` array in `.claude-plugin/plugin.json`:

```json
{
  "skills": [
    "skills/my-custom-skill",
    ...
  ]
}
```

### Step 4: Test

```bash
node scripts/validate-plugin.js
```

## Best Practices

### Skill Design

1. **Single Responsibility**: Each skill should do one thing well
2. **Clear Triggers**: Description should clearly indicate when to use
3. **Actionable Output**: Provide clear, actionable results
4. **Error Handling**: Handle errors gracefully
5. **Documentation**: Include examples and best practices

### Writing Instructions

1. **Be Specific**: Clear step-by-step instructions
2. **Use Examples**: Show expected input/output
3. **Handle Edge Cases**: Account for common issues
4. **Provide Context**: Explain why, not just what

### Tool Restrictions

Use `allowed-tools` to restrict what a skill can do:

```yaml
allowed-tools: Bash, Read  # Only bash commands and file reading
```

Available tools:
- `Bash` - Shell commands
- `Read` - Read files
- `Edit` - Edit files
- `Grep` - Search files
- `Glob` - File pattern matching

### MCP Integration

For skills that need external services:

```yaml
mcp-servers: fetch, github
```

Make sure the MCP servers are configured in `plugin.json`.

## Skill Categories

### By Complexity

**Simple** (1-2 commands):
- lint-and-fix
- no-cyrillic-check

**Medium** (3-5 operations):
- typescript-health-check
- detect-unused-imports
- route-map-nextjs

**Complex** (multiple steps, external services):
- zustand-store-audit
- api-contract-checker
- api-smoke
- gh-pr-digest

### By Frequency

**High** (used often):
- lint-and-fix
- typescript-health-check

**Medium** (used regularly):
- detect-unused-imports
- api-contract-checker
- no-cyrillic-check

**Low** (used occasionally):
- route-map-nextjs
- zustand-store-audit
- api-smoke
- gh-pr-digest

## Troubleshooting

### Skill not found

1. Check skill is registered in `plugin.json`
2. Verify `SKILL.md` exists
3. Run validation: `node scripts/validate-plugin.js`

### Skill not triggering

1. Check description includes clear trigger words
2. Verify allowed-tools are sufficient
3. Check MCP servers are configured (if needed)

### Permission errors

1. Check `.claude/settings.json` permissions
2. Verify allowed-tools in SKILL.md
3. Check denied tools don't block required operations

### MCP server errors

1. Verify MCP server is configured in `plugin.json`
2. Check environment variables (GITHUB_TOKEN, etc.)
3. Test MCP server manually

## Examples

### Using Multiple Skills

Claude can chain skills automatically:

```
You: "Check my code quality"
Claude: 
  1. Uses lint-and-fix
  2. Uses typescript-health-check
  3. Uses detect-unused-imports
  4. Provides comprehensive report
```

### Skill Combinations

Common combinations:
- **Pre-commit**: lint-and-fix + typescript-health-check + no-cyrillic-check
- **API Review**: api-contract-checker + api-smoke
- **Code Cleanup**: detect-unused-imports + lint-and-fix
- **Project Overview**: route-map-nextjs + zustand-store-audit

## Related Documentation

- [Hooks Documentation](../hooks/README.md)
- [Templates](../templates/)
- [Configuration Examples](../config/)
- [Main README](../README.md)

---
