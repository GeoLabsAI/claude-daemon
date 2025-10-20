# Commit Message Template

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Code style (formatting, missing semi-colons, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or updating tests
- **build**: Changes to build system or dependencies
- **ci**: Changes to CI configuration
- **chore**: Other changes that don't modify src or test files

## Scope

The scope should be the name of the affected component/module:
- auth
- api
- ui
- database
- skills
- hooks
- templates
- etc.

## Subject

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize first letter
- No period (.) at the end
- Maximum 50 characters

## Body

- Use imperative, present tense
- Include motivation for the change
- Contrast with previous behavior
- Wrap at 72 characters

## Footer

- Reference issues: `Closes #123`, `Fixes #456`
- Breaking changes: `BREAKING CHANGE: description`

## Examples

### Feature

```
feat(auth): add OAuth2 login with Google

Implement OAuth2 authentication flow using Google provider.
Add user session management with JWT tokens.
Include refresh token rotation for security.

Closes #123
```

### Bug Fix

```
fix(api): prevent race condition in user creation

Add transaction wrapper around user creation to prevent
duplicate users when multiple requests arrive simultaneously.

Fixes #456
```

### Breaking Change

```
feat(api): change response format for user endpoints

BREAKING CHANGE: User API responses now return camelCase
instead of snake_case. Update your client code accordingly.

Before: { user_name: "John" }
After: { userName: "John" }
```

### Skill Addition

```
feat(skills): add TypeScript health check skill

Implement comprehensive TypeScript project health check.
Verifies compilation, strict mode, and type coverage.
Provides actionable recommendations.

Closes #789
```

### Documentation

```
docs(readme): update installation instructions

Add detailed steps for local development setup.
Include troubleshooting section for common issues.
```

## Co-authorship

When pair programming or using AI assistance:

```
feat(ui): redesign dashboard layout
```

## Best Practices

1. **Keep commits atomic** - One logical change per commit
2. **Write clear subjects** - Should complete: "This commit will..."
3. **Explain why, not what** - Code shows what changed, commit explains why
4. **Reference issues** - Always link to related issues
5. **Use conventional commits** - Makes changelog generation easier
