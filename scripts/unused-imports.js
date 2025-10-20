#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Unused Imports Detection');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const findings = [];
let filesScanned = 0;

// Find all TypeScript/JavaScript files
function findSourceFiles() {
  try {
    const result = execSync(
      'find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/build/*" ! -path "*/.next/*"',
      { encoding: 'utf8' }
    );
    
    return result.trim().split('\n').filter(f => f);
  } catch (error) {
    console.error('❌ Error finding source files');
    return [];
  }
}

// Check for unused imports using ESLint
function checkWithESLint() {
  console.log('🔍 Checking with ESLint...\n');
  
  try {
    execSync(
      'npx eslint . --ext .ts,.tsx,.js,.jsx --rule "no-unused-vars: error" --format json',
      { encoding: 'utf8', stdio: 'pipe' }
    );
    console.log('✅ No unused variables found by ESLint\n');
    return [];
  } catch (error) {
    try {
      const output = error.stdout?.toString() || '[]';
      const results = JSON.parse(output);
      
      let unusedCount = 0;
      results.forEach(file => {
        if (file.messages && file.messages.length > 0) {
          file.messages.forEach(msg => {
            if (msg.ruleId === 'no-unused-vars') {
              unusedCount++;
              findings.push({
                file: file.filePath,
                line: msg.line,
                column: msg.column,
                message: msg.message
              });
            }
          });
        }
      });
      
      if (unusedCount > 0) {
        console.log(`⚠️  Found ${unusedCount} unused variable(s) by ESLint\n`);
      }
      
      return findings;
    } catch (parseError) {
      console.log('⚠️  Could not parse ESLint output\n');
      return [];
    }
  }
}

// Check for unused exports using ts-prune (if available)
function checkWithTsPrune() {
  console.log('🔍 Checking for unused exports...\n');
  
  try {
    const result = execSync('npx ts-prune --error', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log('✅ No unused exports found\n');
    return [];
  } catch (error) {
    // ts-prune might not be available or might find issues
    const output = error.stdout?.toString() || error.stderr?.toString() || '';
    
    if (output.includes('command not found') || output.includes('Cannot find module')) {
      console.log('ℹ️  ts-prune not available (optional)\n');
      return [];
    }
    
    if (output.trim()) {
      const lines = output.split('\n').filter(l => l.trim() && !l.includes('used in module'));
      if (lines.length > 0) {
        console.log(`⚠️  Found ${lines.length} unused export(s)\n`);
        console.log('Unused exports:');
        lines.slice(0, 10).forEach(line => {
          console.log(`   ${line}`);
        });
        if (lines.length > 10) {
          console.log(`   ... and ${lines.length - 10} more`);
        }
        console.log('');
      }
    }
    
    return [];
  }
}

// Simple pattern-based check for common unused import patterns
function simpleUnusedCheck() {
  console.log('🔍 Running simple pattern check...\n');
  
  const files = findSourceFiles();
  filesScanned = files.length;
  
  console.log(`Scanning ${filesScanned} file(s)...\n`);
  
  let issuesFound = 0;
  
  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Check for import statements
        const importMatch = line.match(/import\s+(?:{([^}]+)}|(\w+))\s+from/);
        if (importMatch) {
          const imports = importMatch[1] 
            ? importMatch[1].split(',').map(i => i.trim())
            : [importMatch[2]];
          
          imports.forEach(importName => {
            // Remove 'as' aliases
            const cleanName = importName.split(' as ')[0].trim();
            
            // Simple check: is the import used in the rest of the file?
            const restOfFile = lines.slice(index + 1).join('\n');
            
            // Very basic check - not perfect but catches obvious cases
            const regex = new RegExp(`\\b${cleanName}\\b`, 'g');
            const matches = restOfFile.match(regex);
            
            if (!matches || matches.length === 0) {
              issuesFound++;
              // Only report first 20 to avoid spam
              if (issuesFound <= 20) {
                console.log(`⚠️  Potentially unused: ${cleanName}`);
                console.log(`   File: ${filePath}:${index + 1}`);
                console.log('');
              }
            }
          });
        }
      });
    } catch (error) {
      // Skip files that can't be read
    }
  });
  
  if (issuesFound > 20) {
    console.log(`   ... and ${issuesFound - 20} more potential issues\n`);
  } else if (issuesFound === 0) {
    console.log('✅ No obvious unused imports found\n');
  }
  
  return issuesFound;
}

// Print summary and recommendations
function printSummary() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary\n');
  
  console.log(`Files scanned: ${filesScanned}`);
  console.log(`Issues found: ${findings.length}`);
  console.log('');
  
  if (findings.length > 0) {
    console.log('🔴 Unused Variables:\n');
    findings.slice(0, 10).forEach(finding => {
      console.log(`   ${finding.message}`);
      console.log(`   at ${finding.file}:${finding.line}:${finding.column}`);
      console.log('');
    });
    
    if (findings.length > 10) {
      console.log(`   ... and ${findings.length - 10} more\n`);
    }
  }
  
  console.log('💡 Recommendations:\n');
  console.log('   1. Run ESLint with --fix to automatically remove unused imports:');
  console.log('      npx eslint . --ext .ts,.tsx,.js,.jsx --fix\n');
  console.log('   2. Install ts-prune for better unused export detection:');
  console.log('      npm install --save-dev ts-prune\n');
  console.log('   3. Configure your IDE to highlight unused imports\n');
  console.log('   4. Use import organization tools like organize-imports-cli\n');
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Main execution
function main() {
  const eslintFindings = checkWithESLint();
  checkWithTsPrune();
  
  // Only run simple check if ESLint didn't find much
  if (eslintFindings.length === 0) {
    simpleUnusedCheck();
  }
  
  printSummary();
  
  // Exit with error code if there are findings
  process.exit(findings.length > 0 ? 1 : 0);
}

main();
