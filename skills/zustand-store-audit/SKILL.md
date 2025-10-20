---
name: Zustand Store Audit
description: Comprehensive audit of Zustand state management stores checking for best practices, performance issues, and common anti-patterns. Invoke when user mentions "Zustand", "state management review", "store audit", "check stores", or when debugging state-related bugs. Also use when experiencing performance issues with state updates, before major refactoring of state logic, or when establishing state management patterns in a project. Validates proper TypeScript typing, checks for direct mutations, verifies immer usage, analyzes selector patterns, and provides detailed recommendations with code examples.
allowed-tools: Read, Grep, Glob
---

# Zustand Store Audit

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: zustand-store-audit activated]
```

Audit all Zustand stores in the project:

1. **Find all stores**
   ```bash
   find . -type f \( -name "*store*.ts" -o -name "*store*.tsx" -o -name "*Store*.ts" \) ! -path "*/node_modules/*"
   ```

2. **Check each store for:**

   **Structure:**
   - ✅ Uses `create` from zustand
   - ✅ Proper TypeScript typing
   - ✅ State and actions separated
   - ✅ No direct state mutation

   **Best Practices:**
   - ✅ Uses immer for complex updates
   - ✅ Selectors for derived state
   - ✅ Proper action naming (verbs)
   - ✅ No business logic in store

   **Performance:**
   - ✅ Shallow equality checks where needed
   - ✅ Proper selector usage
   - ✅ No unnecessary re-renders

   **Testing:**
   - ✅ Store has tests
   - ✅ Actions are tested
   - ✅ Edge cases covered

3. **Common issues to detect:**

   ```typescript
   // ❌ BAD: Direct mutation
   set((state) => {
     state.items.push(item)
   })

   // ✅ GOOD: Immutable update
   set((state) => ({
     items: [...state.items, item]
   }))

   // ✅ BETTER: With immer
   set(produce((state) => {
     state.items.push(item)
   }))
   ```

## Report Format

```
🏪 Zustand Store Audit
━━━━━━━━━━━━━━━━━━━━━━━━━━

Stores found: X

━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Store: userStore.ts
   ✅ Structure: Good
   ⚠️  Best Practices: 2 issues
   ✅ Performance: Good
   ❌ Testing: No tests found

   Issues:
   1. Line 15: Missing immer for complex updates
   2. Line 28: Business logic should be extracted

━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Overall Score: 75/100

Recommendations:
1. Add immer middleware to all stores
2. Extract business logic to services
3. Add unit tests for stores
4. Use selectors for derived state
```

## Best Practices

- Use immer for nested updates
- Proper TypeScript types
- Separation of concerns
- Testing strategies
- Performance optimizations
