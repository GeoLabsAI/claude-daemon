#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 TypeScript Health Check');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const issues = [];
const warnings = [];
const recommendations = [];

// Check if tsconfig.json exists
function checkTsConfig() {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  
  if (!fs.existsSync(tsconfigPath)) {
    issues.push('❌ tsconfig.json not found');
    return null;
  }
  
  console.log('✅ tsconfig.json found');
  
  try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    return tsconfig;
  } catch (error) {
    issues.push('❌ tsconfig.json is not valid JSON');
    return null;
  }
}

// Check compiler options
function checkCompilerOptions(tsconfig) {
  if (!tsconfig || !tsconfig.compilerOptions) {
    issues.push('❌ No compilerOptions found in tsconfig.json');
    return;
  }
  
  const options = tsconfig.compilerOptions;
  
  // Check strict mode
  if (options.strict) {
    console.log('✅ Strict mode enabled');
  } else {
    warnings.push('⚠️  Strict mode is disabled');
    recommendations.push('💡 Enable strict mode for better type safety');
  }
  
  // Check noUncheckedIndexedAccess
  if (options.noUncheckedIndexedAccess) {
    console.log('✅ noUncheckedIndexedAccess enabled');
  } else {
    warnings.push('⚠️  noUncheckedIndexedAccess is disabled');
    recommendations.push('💡 Enable noUncheckedIndexedAccess to catch potential undefined errors');
  }
  
  // Check noImplicitReturns
  if (options.noImplicitReturns) {
    console.log('✅ noImplicitReturns enabled');
  } else {
    warnings.push('⚠️  noImplicitReturns is disabled');
    recommendations.push('💡 Enable noImplicitReturns to ensure all code paths return a value');
  }
  
  // Check skipLibCheck
  if (options.skipLibCheck === false) {
    warnings.push('⚠️  skipLibCheck is disabled (may slow down compilation)');
    recommendations.push('💡 Consider enabling skipLibCheck for faster builds');
  }
  
  // Check esModuleInterop
  if (options.esModuleInterop) {
    console.log('✅ esModuleInterop enabled');
  } else {
    warnings.push('⚠️  esModuleInterop is disabled');
    recommendations.push('💡 Enable esModuleInterop for better module compatibility');
  }
}

// Count TypeScript files
function countTypeScriptFiles() {
  try {
    const result = execSync(
      'find . -type f \\( -name "*.ts" -o -name "*.tsx" \\) ! -path "*/node_modules/*" ! -path "*/dist/*" ! -path "*/build/*" | wc -l',
      { encoding: 'utf8' }
    );
    const count = parseInt(result.trim());
    console.log(`\n📊 Statistics:`);
    console.log(`   • Total TypeScript files: ${count}`);
    return count;
  } catch (error) {
    warnings.push('⚠️  Could not count TypeScript files');
    return 0;
  }
}

// Check TypeScript compilation
function checkCompilation() {
  try {
    console.log('\n🔨 Checking TypeScript compilation...');
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    console.log('✅ TypeScript compilation successful');
    return true;
  } catch (error) {
    issues.push('❌ TypeScript compilation failed');
    console.log('❌ TypeScript compilation has errors');
    
    // Try to get error details
    try {
      const errorOutput = error.stdout?.toString() || error.stderr?.toString() || '';
      if (errorOutput) {
        console.log('\nCompilation errors:');
        console.log(errorOutput.split('\n').slice(0, 10).join('\n'));
        if (errorOutput.split('\n').length > 10) {
          console.log('... (more errors not shown)');
        }
      }
    } catch (e) {
      // Ignore error parsing errors
    }
    
    return false;
  }
}

// Check for common issues
function checkCommonIssues() {
  // Check for any type usage
  try {
    const result = execSync(
      'grep -r ": any" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v node_modules | wc -l',
      { encoding: 'utf8' }
    );
    const anyCount = parseInt(result.trim());
    if (anyCount > 0) {
      warnings.push(`⚠️  Found ${anyCount} usage(s) of 'any' type`);
      recommendations.push('💡 Replace "any" types with proper types for better type safety');
    }
  } catch (error) {
    // Ignore grep errors
  }
}

// Main execution
function main() {
  const tsconfig = checkTsConfig();
  
  if (tsconfig) {
    checkCompilerOptions(tsconfig);
  }
  
  const fileCount = countTypeScriptFiles();
  
  if (fileCount > 0) {
    checkCompilation();
    checkCommonIssues();
  }
  
  // Print summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Summary\n');
  
  if (issues.length > 0) {
    console.log('🔴 Issues found:');
    issues.forEach(issue => console.log(`   ${issue}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('🟡 Warnings:');
    warnings.forEach(warning => console.log(`   ${warning}`));
    console.log('');
  }
  
  if (recommendations.length > 0) {
    console.log('💡 Recommendations:');
    recommendations.forEach(rec => console.log(`   ${rec}`));
    console.log('');
  }
  
  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ TypeScript project is healthy!');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Exit with error code if there are issues
  process.exit(issues.length > 0 ? 1 : 0);
}

main();
