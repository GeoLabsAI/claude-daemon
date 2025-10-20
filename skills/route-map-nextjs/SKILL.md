---
name: Next.js Route Map
description: Generates visual map and comprehensive documentation of all Next.js routes in the project. Invoke when user asks to "show routes", "list pages", "map Next.js structure", "find all endpoints", or "document API routes". Also use when exploring unfamiliar Next.js codebase, understanding app organization, or generating route documentation. Supports both App Router (Next.js 13+) and Pages Router, identifies dynamic routes, route groups, API endpoints, and provides statistics about the routing architecture.
allowed-tools: Bash, Read, Glob
---

# Next.js Route Map

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: route-map-nextjs activated]
```

Generate a visual map of all Next.js routes:

1. **Scan for route files**
   ```bash
   # App Router (Next.js 13+)
   find app -type f \( -name "page.tsx" -o -name "page.ts" -o -name "route.ts" \) 2>/dev/null
   
   # Pages Router (fallback)
   find pages -type f \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null
   ```

2. **Categorize routes**
   - Public pages
   - API routes
   - Dynamic routes ([param])
   - Route groups ((group))
   - Catch-all routes ([...param])

3. **Extract metadata**
   - Read each route file
   - Extract exported metadata (title, description)
   - Identify dynamic segments

4. **Generate visual map**

## Output Format

```
🗺️  Next.js Route Map
━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Pages (X total):
   /                     → app/page.tsx
   /about                → app/about/page.tsx
   /blog/[slug]          → app/blog/[slug]/page.tsx (dynamic)
   /(auth)/login         → app/(auth)/login/page.tsx (route group)

🔌 API Routes (Y total):
   GET  /api/users       → app/api/users/route.ts
   POST /api/auth        → app/api/auth/route.ts
   GET  /api/posts/[id]  → app/api/posts/[id]/route.ts (dynamic)

📊 Statistics:
   • Total routes: X
   • Dynamic routes: Y
   • API endpoints: Z
   • Route groups: W
```

## Additional Analysis

- Identify unused routes (no links to them)
- Check for missing error boundaries
- Verify loading states
- Suggest route organization improvements
