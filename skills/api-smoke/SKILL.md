---
name: API Smoke Tests
description: Executes automated smoke tests on all API endpoints to verify basic functionality, response codes, and error handling. Invoke when user mentions "test API", "smoke test", "check endpoints", "verify API works", "health check", or after deploying changes. Also use when debugging API issues, after refactoring backend code, or when validating that development server is working correctly. Automatically discovers all API routes, tests each endpoint with appropriate HTTP methods, verifies status codes, and reports which endpoints pass or fail with detailed error messages. Requires development server running on localhost:3000.
allowed-tools: Bash
mcp-servers: fetch
---

# API Smoke Tests

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: api-smoke activated]
```

Run smoke tests on all API endpoints:

1. **Discover API routes**
   ```bash
   find app/api -type f -name "route.ts" 2>/dev/null || find pages/api -type f
   ```

2. **Extract endpoints and methods**
   - Parse route files
   - Identify HTTP methods (GET, POST, PUT, DELETE)
   - Build endpoint list

3. **Run smoke tests**
   For each endpoint:
   ```bash
   curl -X GET http://localhost:3000/api/endpoint \
        -H "Content-Type: application/json" \
        -w "\nStatus: %{http_code}\n" \
        -s
   ```

4. **Verify responses**
   - Check status codes
   - Verify response structure
   - Test error handling

## Test Scenarios

- ✅ Health check endpoints (expect 200)
- ✅ Protected endpoints without auth (expect 401)
- ✅ Invalid requests (expect 400)
- ✅ Not found routes (expect 404)

## Report Format

```
🧪 API Smoke Test Results
━━━━━━━━━━━━━━━━━━━━━━━━━━

Tested: X endpoints
✅ Passed: Y
❌ Failed: Z

Details:
✅ GET  /api/health        → 200 OK
✅ GET  /api/users         → 200 OK
❌ POST /api/auth          → 500 Internal Server Error
⚠️  GET  /api/protected    → 401 Unauthorized (expected)

Failed tests:
[Detailed error messages]
```

## Prerequisites

- Development server must be running on localhost:3000
- Set BASE_URL environment variable if different port
- MCP fetch server must be configured
