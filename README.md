# Claude Daemon

Development automation toolkit with Skills for TypeScript/Next.js projects.

## 🚀 Features

- 🔍 **TypeScript Health Checks** - Comprehensive TS project analysis
- 🧹 **Automated Linting** - ESLint with autofix
- 🗺️  **Route Mapping** - Visual Next.js route maps
- 🏪 **Zustand Auditing** - Store best practices validation
- 📡 **API Contract Verification** - Ensure API consistency
- 🧪 **API Smoke Testing** - Quick endpoint validation
- 📋 **GitHub PR Digest** - PR summaries and status
- 🚫 **Cyrillic Guard** - Enforce English-only policy
- 🪝 **Pre-Commit Hooks** - Automated quality checks

## 📖 What are Skills?

Skills are model-invoked capabilities that Claude autonomously uses based on your request. Unlike commands (which you explicitly invoke with `/command`), skills are automatically selected by Claude when relevant to your task.

## 📦 Installation

### Quick Start (Recommended)

Install the plugin in your React/Next.js project using Claude Code CLI:

```bash
# Add the marketplace
claude plugin marketplace add GeoLabsAI/claude-daemon

# Install the plugin
claude plugin install claude-daemon
```

### Alternative Installation Methods

**From GitHub directly:**
```bash
# Add marketplace from GitHub
claude plugin marketplace add GeoLabsAI/claude-daemon

# Install the plugin
claude plugin install claude-daemon@claude-daemon-marketplace
```

**Local development:**
```bash
# Clone the repository
git clone https://github.com/GeoLabsAI/claude-daemon.git
cd claude-daemon

# Add local marketplace
claude plugin marketplace add ./.claude-plugin/marketplace.json

# Install from local
claude plugin install claude-daemon
```

### Verification

Check if the plugin is installed correctly:

```bash
# List installed plugins
claude plugin marketplace list

# Verify marketplace is added
claude plugin marketplace list
```

### Updating the Plugin

To get the latest version of the plugin with all new features and fixes:

```bash
# 1. Uninstall the current plugin
claude plugin uninstall claude-daemon

# 2. Remove the marketplace (clears cache and ensures fresh download)
claude plugin marketplace remove claude-daemon-marketplace

# 3. Re-add the marketplace from GitHub
claude plugin marketplace add GeoLabsAI/claude-daemon

# 4. Install the updated plugin
claude plugin install claude-daemon

# 5. Restart Claude Code to apply changes
```

**Note**: Removing the marketplace clears the cached version, ensuring you get the latest code from GitHub.

### Next Steps

1. **Restart Claude Code** to activate the plugin
2. **Open your React/Next.js project** in Claude Code
3. **Start using skills** - Claude will automatically use the 8 specialized skills when relevant

### Quick Example

Once installed, simply ask Claude to help with your project:

```
You: "Check the health of my TypeScript project"
Claude: [Automatically uses typescript-health-check skill]

You: "Fix linting issues in my code"
Claude: [Automatically uses lint-and-fix skill]

You: "Show me all routes in this Next.js app"
Claude: [Automatically uses route-map-nextjs skill]

You: "Test my API endpoints"
Claude: [Automatically uses api-smoke skill]
```

No manual skill invocation needed - Claude intelligently selects the right tools!

## 🎯 Skills Reference

### Code Quality

**lint-and-fix**
- Runs ESLint with autofix
- Reports remaining issues
- Suggests improvements

**typescript-health-check**
- Checks TypeScript compilation
- Verifies tsconfig settings
- Reports type coverage

**detect-unused-imports**
- Finds unused imports and exports
- Suggests cleanup commands
- Warns about false positives

### Next.js

**route-map-nextjs**
- Maps all Next.js routes
- Categorizes pages and API routes
- Identifies dynamic routes

### State Management

**zustand-store-audit**
- Audits Zustand stores
- Checks best practices
- Suggests improvements

### API

**api-contract-checker**
- Verifies API contracts
- Checks type safety
- Validates documentation

**api-smoke**
- Runs smoke tests on endpoints
- Checks status codes
- Reports failures

### GitHub

**gh-pr-digest**
- Fetches PR information
- Shows status and reviews
- Generates digest

### Quality Guards

**no-cyrillic-check**
- Enforces English-only policy
- Detects Cyrillic characters
- Suggests translations

## 💡 Usage

Skills are automatically invoked by Claude based on your requests. For example:

```
You: "Check if my TypeScript project is healthy"
Claude: [Uses typescript-health-check skill]

You: "Lint my code"
Claude: [Uses lint-and-fix skill]

You: "Show me all Next.js routes"
Claude: [Uses route-map-nextjs skill]
```

## ⚙️ Requirements

### System Requirements
- **Claude Code**: >= 2.0.0
- **Node.js**: >= 18.0.0
- **Git**: For repository operations

### Project Requirements
- **TypeScript**: >= 5.0.0 (for TypeScript projects)
- **React**: >= 18.0.0 (for React projects)
- **Next.js**: >= 13.0.0 (for Next.js features)
- **ESLint**: For code quality checks
- **Zustand**: >= 4.0.0 (for store auditing, optional)

## 🔧 Configuration

### Project Settings

Create `.claude/settings.json` in your project:

```json
{
  "permissions": {
    "allowedTools": [
      "Read(**/*.{ts,tsx,js,jsx})",
      "Edit(**/*.{ts,tsx,js,jsx})",
      "Bash(npm:*)"
    ]
  },
  "permissionMode": "acceptEdits"
}
```

### MCP Servers

The plugin uses MCP servers for enhanced functionality:
- **fetch** - HTTP requests for API testing and GitHub integration
- **filesystem** - File operations

## 🛠️ Development

### Testing Locally

```bash
# Validate plugin structure
node scripts/validate-plugin.js

# Check TypeScript health
node scripts/ts_health_check.js

# Detect unused imports
node scripts/unused-imports.js
```

### Helper Scripts

The plugin includes several helper scripts:

**validate-plugin.js**
- Validates plugin structure
- Checks all skills exist
- Verifies YAML frontmatter
- Detects Cyrillic characters

**ts_health_check.js**
- Checks tsconfig.json
- Validates compiler options
- Counts TypeScript files
- Runs compilation check

**unused-imports.js**
- Detects unused imports
- Checks with ESLint
- Provides cleanup recommendations

### Project Structure

```
claude-daemon/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest
├── skills/                   # 9 Skills (model-invoked)
│   ├── lint-and-fix/
│   ├── typescript-health-check/
│   ├── detect-unused-imports/
│   ├── route-map-nextjs/
│   ├── zustand-store-audit/
│   ├── api-contract-checker/
│   ├── api-smoke/
│   ├── gh-pr-digest/
│   └── no-cyrillic-check/
├── hooks/
│   ├── onPreCommit.yaml      # Pre-commit workflow
│   └── README.md             # Hooks documentation
├── templates/
│   ├── commit-message.md     # Commit message template
│   └── pr-description.md     # PR template
├── scripts/
│   ├── ts_health_check.js    # TypeScript health check
│   ├── validate-plugin.js    # Plugin validation
│   └── unused-imports.js     # Unused imports detection
└── config/
    ├── example-settings.json # Example settings
    └── mcp-servers.json      # MCP server examples
```

## 🪝 Hooks

The plugin includes a pre-commit hook that automatically:
- Runs ESLint with autofix
- Checks TypeScript compilation
- Detects Cyrillic characters
- Stages fixes automatically

See [hooks/README.md](hooks/README.md) for customization options.

## 📋 Templates

**Commit Messages**
- Conventional commits format
- Examples for all types
- Best practices guide

**Pull Requests**
- Comprehensive PR template
- Checklists for code quality
- Testing section

See [templates/](templates/) for details.

## 🔍 Troubleshooting

### Installation Issues

**Plugin command not found:**
```bash
# Make sure you're using Claude Code CLI, not slash commands
claude plugin marketplace add GeoLabsAI/claude-daemon
# NOT: /plugin marketplace add ...
```

**Marketplace not found:**
```bash
# Check if marketplace was added successfully
claude plugin marketplace list

# Try re-adding if missing
claude plugin marketplace add GeoLabsAI/claude-daemon
```

**Permission errors:**
```bash
# Check Claude Code version
claude --version

# Should be >= 2.0.0 for plugin support
```

### Plugin not loading

```bash
# Validate structure
node scripts/validate-plugin.js

# Check Claude Code logs
tail -f ~/.claude/debug.log
```

### Skills not working

1. **Restart Claude Code** after installation
2. Check permissions in `.claude/settings.json`
3. Verify required tools are installed (npm, git, etc.)
4. Check Claude Code version compatibility (>= 2.0.0)

### TypeScript errors

```bash
# Run health check
node scripts/ts_health_check.js

# Check compilation
npx tsc --noEmit
```

### MCP server issues

1. Check MCP server configuration in `plugin.json`
2. Verify environment variables (GITHUB_TOKEN, etc.)
3. Test MCP server manually:
   ```bash
   npx @modelcontextprotocol/server-fetch
   ```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Follow the commit message template
4. Add tests if applicable
5. Submit a pull request

See [templates/pr-description.md](templates/pr-description.md) for PR guidelines.

## 📝 License

MIT

## 👥 Author

Created by [goshazvir](https://github.com/goshazvir) at [GeoLabsAI](https://github.com/GeoLabsAI)

## 🔗 Links

- [GitHub Repository](https://github.com/GeoLabsAI/claude-daemon)
- [Claude Code Skills Documentation](https://docs.claude.com/ru/docs/claude-code/skills)

---
