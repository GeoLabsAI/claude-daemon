---
name: API Contract Checker
description: Validates that API endpoint implementations properly match their contracts by checking type safety, request/response schemas, validation, and documentation. Invoke when user asks to "check API", "validate endpoints", "review API contracts", "verify API types", or mentions API consistency. Also use when debugging API errors, before API releases, when establishing API standards, or when generating API documentation. Analyzes request validation (Zod, Yup), response types, error handling, status codes, and provides contract compliance score with specific improvement recommendations.
allowed-tools: Read, Grep, Glob
---

# API Contract Checker

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: api-contract-checker activated]
```

Verify that API implementations match their contracts:

1. **Find API routes**
   ```bash
   find app/api -type f -name "route.ts" 2>/dev/null || find pages/api -type f
   ```

2. **For each endpoint, verify:**

   **Request Contract:**
   - ✅ Request body schema defined
   - ✅ Query parameters documented
   - ✅ Headers specified
   - ✅ Validation implemented (Zod, Yup, etc.)

   **Response Contract:**
   - ✅ Response type defined
   - ✅ Status codes documented
   - ✅ Error responses specified
   - ✅ Consistent response structure

   **Documentation:**
   - ✅ JSDoc comments present
   - ✅ Example requests/responses
   - ✅ OpenAPI spec (if exists)

3. **Check for common issues:**

   ```typescript
   // ❌ BAD: No type safety
   export async function POST(request: Request) {
     const data = await request.json()
     return Response.json({ data })
   }

   // ✅ GOOD: Type-safe with validation
   const RequestSchema = z.object({
     name: z.string(),
     email: z.string().email()
   })

   interface SuccessResponse {
     data: User
   }

   export async function POST(request: Request) {
     const body = await request.json()
     const validated = RequestSchema.parse(body)
     const user = await createUser(validated)
     return Response.json<SuccessResponse>({ data: user }, { status: 201 })
   }
   ```

## Report Format

```
📡 API Contract Audit
━━━━━━━━━━━━━━━━━━━━━━━━━━

Endpoints analyzed: X
Issues found: Y

━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 CRITICAL:

POST /api/users
  ❌ No request validation
  ❌ Missing error handling
  ❌ Response type not defined

━━━━━━━━━━━━━━━━━━━━━━━━━━

🟡 WARNINGS:

GET /api/posts/[id]
  ⚠️  No JSDoc documentation
  ⚠️  Error responses not typed

━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ COMPLIANT:

GET /api/health
  ✅ Fully typed
  ✅ Documented
  ✅ Error handling present

━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Contract Compliance: 65%

Recommendations:
1. Add Zod validation to all endpoints
2. Define TypeScript types for all responses
3. Document error cases
4. Generate OpenAPI spec
```
