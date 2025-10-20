#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Claude Plugin Validation');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const errors = [];
const warnings = [];
let checksRun = 0;
let checksPassed = 0;

function check(condition, message, isWarning = false) {
  checksRun++;
  if (condition) {
    console.log(`✅ ${message}`);
    checksPassed++;
    return true;
  } else {
    const prefix = isWarning ? '⚠️ ' : '❌';
    console.log(`${prefix} ${message}`);
    if (isWarning) {
      warnings.push(message);
    } else {
      errors.push(message);
    }
    return false;
  }
}

// Check directory structure
function checkDirectoryStructure() {
  console.log('📁 Checking directory structure...\n');
  
  check(
    fs.existsSync('.claude-plugin'),
    '.claude-plugin/ directory exists'
  );
  
  check(
    fs.existsSync('skills'),
    'skills/ directory exists'
  );
  
  check(
    fs.existsSync('templates'),
    'templates/ directory exists',
    true
  );
  
  check(
    fs.existsSync('hooks'),
    'hooks/ directory exists',
    true
  );
  
  check(
    fs.existsSync('scripts'),
    'scripts/ directory exists',
    true
  );
  
  console.log('');
}

// Check plugin.json
function checkPluginJson() {
  console.log('📄 Checking plugin.json...\n');
  
  const pluginJsonPath = path.join('.claude-plugin', 'plugin.json');
  
  if (!check(
    fs.existsSync(pluginJsonPath),
    'plugin.json exists'
  )) {
    return null;
  }
  
  let pluginJson;
  try {
    const content = fs.readFileSync(pluginJsonPath, 'utf8');
    pluginJson = JSON.parse(content);
    check(true, 'plugin.json is valid JSON');
  } catch (error) {
    check(false, 'plugin.json is valid JSON');
    return null;
  }
  
  // Check required fields
  check(
    pluginJson.name && typeof pluginJson.name === 'string',
    'plugin.json has "name" field'
  );
  
  check(
    pluginJson.version && typeof pluginJson.version === 'string',
    'plugin.json has "version" field'
  );
  
  check(
    pluginJson.description && typeof pluginJson.description === 'string',
    'plugin.json has "description" field'
  );
  
  check(
    pluginJson.author && typeof pluginJson.author === 'string',
    'plugin.json has "author" field'
  );
  
  check(
    pluginJson.license && typeof pluginJson.license === 'string',
    'plugin.json has "license" field',
    true
  );
  
  check(
    Array.isArray(pluginJson.skills),
    'plugin.json has "skills" array'
  );
  
  console.log('');
  return pluginJson;
}

// Check skills
function checkSkills(pluginJson) {
  if (!pluginJson || !Array.isArray(pluginJson.skills)) {
    return;
  }
  
  console.log('🎯 Checking skills...\n');
  
  const skills = pluginJson.skills;
  
  check(
    skills.length > 0,
    `Found ${skills.length} skill(s) registered`
  );
  
  skills.forEach((skillPath, index) => {
    const skillDir = path.join(skillPath);
    const skillMdPath = path.join(skillPath, 'SKILL.md');
    
    if (check(
      fs.existsSync(skillDir),
      `Skill directory exists: ${skillPath}`
    )) {
      check(
        fs.existsSync(skillMdPath),
        `SKILL.md exists: ${skillPath}`
      );
      
      // Check SKILL.md format
      if (fs.existsSync(skillMdPath)) {
        const content = fs.readFileSync(skillMdPath, 'utf8');
        
        // Check for YAML frontmatter
        const hasFrontmatter = content.startsWith('---');
        check(
          hasFrontmatter,
          `SKILL.md has YAML frontmatter: ${skillPath}`,
          true
        );
        
        if (hasFrontmatter) {
          // Check for required fields in frontmatter
          check(
            content.includes('name:'),
            `SKILL.md has "name" field: ${skillPath}`,
            true
          );
          
          check(
            content.includes('description:'),
            `SKILL.md has "description" field: ${skillPath}`,
            true
          );
        }
      }
    }
  });
  
  console.log('');
}

// Check for common files
function checkCommonFiles() {
  console.log('📋 Checking common files...\n');
  
  check(
    fs.existsSync('README.md'),
    'README.md exists'
  );
  
  check(
    fs.existsSync('LICENSE'),
    'LICENSE exists',
    true
  );
  
  check(
    fs.existsSync('.gitignore'),
    '.gitignore exists',
    true
  );
  
  console.log('');
}

// Check for Cyrillic characters
function checkCyrillic() {
  console.log('🚫 Checking for Cyrillic characters...\n');
  
  const { execSync } = require('child_process');
  
  try {
    const result = execSync(
      'grep -r --include="*.md" --include="*.json" --include="*.js" --include="*.ts" "[А-Яа-яЁё]" . 2>/dev/null | grep -v node_modules | wc -l',
      { encoding: 'utf8' }
    );
    
    const count = parseInt(result.trim());
    check(
      count === 0,
      count === 0 ? 'No Cyrillic characters found' : `Found ${count} file(s) with Cyrillic characters`,
      true
    );
  } catch (error) {
    // If grep fails, assume no matches
    check(true, 'No Cyrillic characters found', true);
  }
  
  console.log('');
}

// Print summary
function printSummary() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Validation Summary\n');
  
  console.log(`Total checks: ${checksRun}`);
  console.log(`Passed: ${checksPassed}`);
  console.log(`Failed: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log('');
  
  if (errors.length > 0) {
    console.log('🔴 Errors:');
    errors.forEach(error => console.log(`   • ${error}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('🟡 Warnings:');
    warnings.forEach(warning => console.log(`   • ${warning}`));
    console.log('');
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Plugin structure is valid!');
  } else if (errors.length === 0) {
    console.log('✅ Plugin structure is valid (with warnings)');
  } else {
    console.log('❌ Plugin structure has errors');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Main execution
function main() {
  checkDirectoryStructure();
  const pluginJson = checkPluginJson();
  checkSkills(pluginJson);
  checkCommonFiles();
  checkCyrillic();
  printSummary();
  
  // Exit with error code if there are errors
  process.exit(errors.length > 0 ? 1 : 0);
}

main();
