---
name: TypeScript Health Check
description: Performs comprehensive TypeScript project analysis including compilation errors, type coverage, and configuration audit. Invoke when user asks about "TypeScript errors", "type issues", "tsc errors", "tsconfig", "strict mode", "type coverage", or general "TypeScript health". Also use when debugging type-related problems or when user wants to improve TypeScript setup. Checks compilation status, analyzes tsconfig.json settings, counts TypeScript files, and provides actionable recommendations for improvement.
allowed-tools: Bash, Read
---

# TypeScript Health Check

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: typescript-health-check activated]
```

Perform a comprehensive TypeScript health check:

1. **Check TypeScript compilation**
   ```bash
   npx tsc --noEmit
   ```

2. **Run custom health check script**
   ```bash
   node scripts/ts_health_check.js
   ```

3. **Check type coverage** (if available)
   ```bash
   npx type-coverage --detail
   ```

4. **Analyze tsconfig.json**
   - Check if strict mode is enabled
   - Verify compiler options
   - Suggest improvements

5. **Count TypeScript files**
   ```bash
   find . -type f \( -name "*.ts" -o -name "*.tsx" \) ! -path "*/node_modules/*" | wc -l
   ```

## Report Format

```
🔍 TypeScript Health Report
━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Statistics:
   • Total TS files: X
   • Compilation: ✅ / ❌
   • Strict mode: ✅ / ❌
   • Type coverage: X%

⚠️  Issues found: Y
   [List issues with file:line]

💡 Recommendations:
   [List suggestions]
```

## Checks to Perform

- ✅ tsconfig.json exists
- ✅ strict mode enabled
- ✅ No compilation errors
- ✅ Type coverage > 80%
- ✅ No 'any' types in new code
- ✅ noUncheckedIndexedAccess enabled
- ✅ noImplicitReturns enabled
