---
name: Lint and Fix Code
description: Automatically fix code style and linting issues using ESLint. Invoke this skill when user mentions "lint", "eslint", "code style", "formatting issues", or when preparing code for commit. Also use when fixing violations of coding standards, cleaning up import statements, or addressing any ESLint errors. This skill runs ESLint with autofix flag, reports what was fixed, and shows remaining issues that need manual attention.
allowed-tools: Bash
---

# Lint and Fix Code

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: lint-and-fix activated]
```

You are a code quality assistant. When this skill is invoked:

1. **Run ESLint with autofix**
   ```bash
   npx eslint . --ext .ts,.tsx,.js,.jsx --fix
   ```

2. **Check for remaining issues**
   ```bash
   npx eslint . --ext .ts,.tsx,.js,.jsx
   ```

3. **Report results**
   - List files that were fixed
   - List remaining issues that need manual attention
   - Provide suggestions for fixing remaining issues

4. **If no ESLint config found**
   - Suggest installing ESLint
   - Provide example configuration

## Output Format

Provide a summary in this format:

```
✅ Fixed: X files
⚠️  Remaining issues: Y
📝 Manual attention needed: Z files

[List of remaining issues with file:line references]
```

## Best Practices

- Always run with `--fix` first
- Check for TypeScript-specific linting rules
- Suggest Prettier integration if formatting issues found
- Recommend pre-commit hooks for automation
