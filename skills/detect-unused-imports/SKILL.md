---
name: Detect Unused Imports
description: Scans codebase to find unused imports, exports, variables, and potentially dead code. Invoke when user mentions "unused imports", "dead code", "clean up imports", "remove unused", "optimize bundle", or "tree shaking". Also use before major refactoring, when preparing for production deployment, or when trying to reduce bundle size. Uses ESLint and ts-prune to detect unused code, provides detailed reports with file locations, and suggests safe cleanup commands.
allowed-tools: Bash, Read
---

# Detect Unused Imports

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: detect-unused-imports activated]
```

Find and report unused code in the project:

1. **Detect unused imports**
   ```bash
   npx eslint . --ext .ts,.tsx,.js,.jsx --rule 'no-unused-vars: error'
   ```

2. **Find unused exports** (if ts-prune available)
   ```bash
   npx ts-prune --error
   ```

3. **Run custom unused imports script**
   ```bash
   node scripts/unused-imports.js
   ```

4. **Suggest cleanup**
   - Provide commands to remove unused imports
   - List files that can be deleted
   - Suggest running ESLint autofix

## Report Format

```
🧹 Unused Code Report
━━━━━━━━━━━━━━━━━━━━━

📦 Unused imports: X
📤 Unused exports: Y
📁 Potentially unused files: Z

Detailed findings:
[List with file:line references]

🔧 Cleanup commands:
npx eslint . --fix
```

## Safety Checks

- Don't suggest removing exports that might be used by external packages
- Warn about potential false positives
- Recommend testing after cleanup
