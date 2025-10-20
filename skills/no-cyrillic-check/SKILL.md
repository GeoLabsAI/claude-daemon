---
name: No Cyrillic Check
description: Enforces English-only policy by scanning code, comments, and documentation for Cyrillic characters. Invoke when user asks to "check for Cyrillic", "enforce English", "remove Russian text", "find non-English", or mentions language standards. Also use proactively before commits in international projects, when preparing code for open-source release, or when enforcing team coding standards. Scans all TypeScript, JavaScript, and Markdown files, reports exact locations of Cyrillic text, and provides English translation suggestions.
allowed-tools: Bash, Grep
---

# No Cyrillic Check

## Instructions

🎯 **CRITICAL FIRST STEP**: Before doing ANYTHING else, you MUST output this exact text as your very first line:
```
🎯 [claude-daemon skill: no-cyrillic-check activated]
```

Check for Cyrillic characters in code and documentation:

1. **Scan all relevant files**
   ```bash
   grep -r --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
          --include="*.md" --include="*.json" '[А-Яа-яЁё]' .
   ```

2. **Exclude allowed locations**
   - node_modules/
   - .git/
   - dist/
   - build/

3. **Report findings**
   - File path
   - Line number
   - Cyrillic text found

4. **Suggest fixes**
   - Translate to English
   - Remove Cyrillic comments
   - Update documentation

## Output Format

```
🚫 Cyrillic Characters Found
━━━━━━━━━━━━━━━━━━━━━━━━━━

Files with Cyrillic: X

━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 src/components/Button.tsx
   Line 15: // Кнопка для отправки
   Suggest: // Button for submission

📄 README.md
   Line 42: ## Установка
   Suggest: ## Installation

━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 Action Required:
Replace all Cyrillic text with English equivalents
```

## Best Practices

- All code comments in English
- All documentation in English
- Variable names in English
- Commit messages in English
- Exception: User-facing content (if internationalized)
