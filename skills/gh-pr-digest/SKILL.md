---
name: GitHub PR Digest
description: Fetches and generates comprehensive summary of GitHub pull requests including status, reviews, labels, and recent activity. Invoke when user asks about "PRs", "pull requests", "PR status", "review status", "GitHub activity", or wants PR summary. Also use when starting work day to check PR queue, before standup meetings, when tracking team progress, or when generating reports. Uses GitHub API to fetch PR data, formats information with author, labels, review status, creation dates, and highlights both open PRs needing attention and recently merged ones. Requires GITHUB_TOKEN environment variable.
allowed-tools: Bash
mcp-servers: fetch
---

# GitHub PR Digest

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: gh-pr-digest activated]
```

Fetch and summarize GitHub pull requests:

1. **Get repository information**
   - Extract owner and repo from git remote
   ```bash
   git remote get-url origin
   ```

2. **Fetch PR data using GitHub API**
   ```bash
   curl -H "Authorization: token $GITHUB_TOKEN" \
        https://api.github.com/repos/{owner}/{repo}/pulls
   ```

3. **Parse and format PR information**
   - PR number and title
   - Author
   - Status (open, closed, merged)
   - Labels
   - Created/updated dates
   - Review status

4. **Generate digest**

## Output Format

```
📋 GitHub PR Digest
━━━━━━━━━━━━━━━━━━━━━━━━━━

Repository: owner/repo
Total PRs: X open, Y closed

━━━━━━━━━━━━━━━━━━━━━━━━━━

🟢 Open PRs:

#123 - feat: Add new feature
   👤 Author: username
   🏷️  Labels: enhancement, needs-review
   📅 Created: 2 days ago
   ✅ Reviews: 2 approved

#124 - fix: Bug fix
   👤 Author: username
   🏷️  Labels: bug, priority-high
   📅 Created: 1 day ago
   ⏳ Reviews: pending

━━━━━━━━━━━━━━━━━━━━━━━━━━

Recently Merged:

#122 - docs: Update README
   👤 Author: username
   ✅ Merged: 3 days ago
```

## Prerequisites

- GITHUB_TOKEN environment variable set
- MCP fetch server configured
- Repository is on GitHub
