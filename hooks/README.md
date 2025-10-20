# Hooks Documentation

Hooks are automated workflows that run at specific points in your development process. They help maintain code quality and consistency by running checks automatically.

## Available Hooks

### onPreCommit

Runs before each commit to ensure code quality.

**Location**: `hooks/onPreCommit.yaml`

**What it does**:
1. **Runs ESLint** - Automatically fixes code style issues
2. **Checks TypeScript** - Verifies TypeScript compilation and configuration
3. **Checks for Cyrillic** - Ensures English-only policy is maintained
4. **Stages fixes** - Automatically stages any fixes made by the linter

**When it runs**: Before every `git commit`

**Skills used**:
- `lint-and-fix`
- `typescript-health-check`
- `no-cyrillic-check`

## How Hooks Work

Hooks are defined in YAML format and specify a sequence of steps to execute. Each step can either:
- Call a **skill** (model-invoked capability)
- Execute a **command** (shell command)

### Hook Structure

```yaml
name: Hook Name
description: What this hook does

steps:
  - name: Step 1 Name
    skill: skill-name
    
  - name: Step 2 Name
    command: shell command
```

## Customizing Hooks

You can customize hooks to fit your workflow:

### Example: Add unused imports check

```yaml
name: Pre-Commit Checks
description: Run automated checks before committing code

steps:
  - name: Run linter
    skill: lint-and-fix
    
  - name: Check TypeScript
    skill: typescript-health-check
    
  - name: Check for unused imports
    skill: detect-unused-imports
    
  - name: Check for Cyrillic
    skill: no-cyrillic-check
    
  - name: Stage fixes
    command: git add -u
```

### Example: Add API contract check

```yaml
name: Pre-Commit Checks
description: Run automated checks before committing code

steps:
  - name: Run linter
    skill: lint-and-fix
    
  - name: Check TypeScript
    skill: typescript-health-check
    
  - name: Check API contracts
    skill: api-contract-checker
    
  - name: Check for Cyrillic
    skill: no-cyrillic-check
    
  - name: Stage fixes
    command: git add -u
```

## Disabling Hooks

If you need to skip hooks for a specific commit:

```bash
git commit --no-verify -m "commit message"
```

**Note**: Use this sparingly and only when absolutely necessary.

## Best Practices

1. **Keep hooks fast** - Hooks should complete in seconds, not minutes
2. **Make hooks idempotent** - Running multiple times should be safe
3. **Provide clear feedback** - Users should understand what's happening
4. **Auto-fix when possible** - Fix issues automatically rather than just reporting
5. **Stage fixes automatically** - Don't make users manually stage fixes

## Troubleshooting

### Hook fails with permission error

Make sure the hook file has correct permissions:
```bash
chmod +x hooks/onPreCommit.yaml
```

### Hook runs too slowly

Consider removing expensive checks or running them only in CI:
- Move comprehensive checks to CI/CD
- Keep only fast checks in pre-commit hooks
- Use caching where possible

### Hook prevents valid commits

If a hook is incorrectly blocking commits:
1. Review the hook configuration
2. Check if the skill is working correctly
3. Temporarily disable with `--no-verify` if urgent
4. Fix the hook configuration

## Creating New Hooks

You can create additional hooks for other git events:

### onPostCommit

Runs after a successful commit:

```yaml
name: Post-Commit Actions
description: Run actions after commit

steps:
  - name: Generate changelog
    command: npm run changelog
```

### onPrePush

Runs before pushing to remote:

```yaml
name: Pre-Push Checks
description: Run comprehensive checks before push

steps:
  - name: Run all tests
    command: npm test
    
  - name: Check TypeScript
    skill: typescript-health-check
    
  - name: API smoke tests
    skill: api-smoke
```

## Integration with Git

To integrate hooks with git, you can use tools like:
- **husky** - Git hooks made easy
- **lint-staged** - Run linters on staged files
- **commitlint** - Lint commit messages

Example with husky:

```bash
npm install --save-dev husky
npx husky init
```

Then in `.husky/pre-commit`:

```bash
#!/bin/sh
claude run hooks/onPreCommit.yaml
```

## Examples

### Minimal Hook

```yaml
name: Quick Check
description: Fast pre-commit check

steps:
  - name: Lint
    skill: lint-and-fix
```

### Comprehensive Hook

```yaml
name: Comprehensive Check
description: Full pre-commit validation

steps:
  - name: Run linter
    skill: lint-and-fix
    
  - name: Check TypeScript
    skill: typescript-health-check
    
  - name: Check unused imports
    skill: detect-unused-imports
    
  - name: Check API contracts
    skill: api-contract-checker
    
  - name: Check for Cyrillic
    skill: no-cyrillic-check
    
  - name: Run tests
    command: npm test
    
  - name: Stage fixes
    command: git add -u
```

## Related Documentation

- [Skills Documentation](../skills/)
- [Commit Message Template](../templates/commit-message.md)
- [Contributing Guidelines](../README.md)

---
