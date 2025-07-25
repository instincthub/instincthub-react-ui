#!/usr/bin/env node

/**
 * Test Script for Component Examples
 * Tests all implemented component example routes for basic functionality
 */

const fs = require('fs');
const path = require('path');

// Define all example routes to test
const EXAMPLE_ROUTES = [
  // Forms components (26 routes)
  '/components/forms/action-dropdown',
  '/components/forms/animated-box',
  '/components/forms/checkboxes',
  '/components/forms/chips-input',
  '/components/forms/date-input',
  '/components/forms/date-input-picker',
  '/components/forms/drop-file',
  '/components/forms/email-list',
  '/components/forms/file-uploader',
  '/components/forms/filter-array',
  '/components/forms/filter-objects',
  '/components/forms/form-error',
  '/components/forms/input-amount',
  '/components/forms/input-number',
  '/components/forms/input-text',
  '/components/forms/input-textarea',
  '/components/forms/message-display',
  '/components/forms/multiple-email',
  '/components/forms/password-field',
  '/components/forms/phone-number-input',
  '/components/forms/radio-button',
  '/components/forms/search-field',
  '/components/forms/search-objects-from-db',
  '/components/forms/time-picker',
  '/components/forms/toggle-button',
  '/components/forms/uploads/ihub-file-uploader',

  // UI components (19 routes)
  '/components/ui/actions',
  '/components/ui/badges',
  '/components/ui/cards',
  '/components/ui/card-grid',
  '/components/ui/card-list',
  '/components/ui/color-picker',
  '/components/ui/content-view-or-edit',
  '/components/ui/content-viewer',
  '/components/ui/create-button',
  '/components/ui/dialogs',
  '/components/ui/dropdowns',
  '/components/ui/modals',
  '/components/ui/or-divider',
  '/components/ui/pagination',
  '/components/ui/random-gradient-image',
  '/components/ui/table-examples',
  '/components/ui/table-server-examples',
  '/components/ui/text-editor',
  '/components/charts',

  // Navigation components (4 routes)
  '/components/navbars/breadcrumb',
  '/components/navbars/responsive-navbar',
  '/components/navbars/sidenav',
  '/components/navbars/tabs',

  // Auth components (3 routes)
  '/components/auth/client-detector',
  '/components/auth/signup-form',
  '/components/auth/username-email-checker'
];

/**
 * Check if page.tsx file exists for a route
 */
function checkPageExists(route) {
  const pagePath = path.join(__dirname, 'src', '__examples__', 'src', 'app', route, 'page.tsx');
  return fs.existsSync(pagePath);
}

/**
 * Check if example component file exists for a route
 */
function checkExampleExists(route) {
  // Convert route to example component path
  let examplePath = route.replace('/components/', '');
  let category = examplePath.split('/')[0];
  let componentName = examplePath.split('/').slice(1).join('-');
  
  // Convert kebab-case to PascalCase
  componentName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Define file name variations to check
  const possibleFileNames = [
    `${componentName}Example.tsx`,
    `${componentName}Examples.tsx`,
    componentName.endsWith('s') ? `${componentName.slice(0, -1)}Examples.tsx` : `${componentName}sExamples.tsx`,
    // Special cases
    route === '/components/forms/checkboxes' ? 'CheckBoxesFieldExamples.tsx' : null,
    route === '/components/auth/username-email-checker' ? 'IsUsernameEmailTakenExample.tsx' : null,
    route === '/components/ui/text-editor' ? 'CustomTextEditorExample.tsx' : null,
    route === '/components/charts' ? '../ui/ChartExamples.tsx' : null,
    route === '/components/navbars/sidenav' ? 'SideNavbarExample.tsx' : null,
    route === '/components/forms/uploads/ihub-file-uploader' ? 'uploads/IhubFileUploaderSample.tsx' : null,
    route === '/components/ui/dialogs' ? 'DialogExample.tsx' : null,
    route === '/components/ui/modals' ? '../Modals.tsx' : null,
    route === '/components/ui/table-examples' ? 'TableExamples.tsx' : null,
    route === '/components/ui/table-server-examples' ? 'TableServerExamples.tsx' : null,
  ].filter(Boolean);
  
  // Check each possible file name
  for (const fileName of possibleFileNames) {
    const exampleFilePath = path.join(
      __dirname, 
      'src', 
      '__examples__', 
      'src', 
      'components', 
      category, 
      fileName
    );
    
    if (fs.existsSync(exampleFilePath)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check for potential import issues in example file
 */
function checkImports(route) {
  let examplePath = route.replace('/components/', '');
  let category = examplePath.split('/')[0];
  let componentName = examplePath.split('/').slice(1).join('-');
  
  componentName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Define file name variations to check (same as checkExampleExists)
  const possibleFileNames = [
    `${componentName}Example.tsx`,
    `${componentName}Examples.tsx`,
    componentName.endsWith('s') ? `${componentName.slice(0, -1)}Examples.tsx` : `${componentName}sExamples.tsx`,
    // Special cases
    route === '/components/forms/checkboxes' ? 'CheckBoxesFieldExamples.tsx' : null,
    route === '/components/auth/username-email-checker' ? 'IsUsernameEmailTakenExample.tsx' : null,
    route === '/components/ui/text-editor' ? 'CustomTextEditorExample.tsx' : null,
    route === '/components/charts' ? '../ui/ChartExamples.tsx' : null,
    route === '/components/navbars/sidenav' ? 'SideNavbarExample.tsx' : null,
    route === '/components/forms/uploads/ihub-file-uploader' ? 'uploads/IhubFileUploaderSample.tsx' : null,
    route === '/components/ui/dialogs' ? 'DialogExample.tsx' : null,
    route === '/components/ui/modals' ? '../Modals.tsx' : null,
    route === '/components/ui/table-examples' ? 'TableExamples.tsx' : null,
    route === '/components/ui/table-server-examples' ? 'TableServerExamples.tsx' : null,
  ].filter(Boolean);
  
  // Find the actual file that exists
  let exampleFilePath = null;
  for (const fileName of possibleFileNames) {
    const filePath = path.join(
      __dirname, 
      'src', 
      '__examples__', 
      'src', 
      'components', 
      category, 
      fileName
    );
    
    if (fs.existsSync(filePath)) {
      exampleFilePath = filePath;
      break;
    }
  }
  
  if (!exampleFilePath) {
    return { hasIssues: true, issues: ['Example file does not exist'] };
  }
  
  try {
    const content = fs.readFileSync(exampleFilePath, 'utf8');
    const issues = [];
    
    // Check for common import patterns
    if (!content.includes('from "../../../../index"') && !content.includes('from "../../../../') && 
        !content.includes('from "../../../index"') && !content.includes('from "../../../')) {
      issues.push('No imports from main index found');
    }
    
    // Check for "use client" directive
    if (!content.includes('"use client"')) {
      issues.push('Missing "use client" directive');
    }
    
    // Check for React import
    if (!content.includes('import React')) {
      issues.push('Missing React import');
    }
    
    return { hasIssues: issues.length > 0, issues };
  } catch (error) {
    return { hasIssues: true, issues: [`Error reading file: ${error.message}`] };
  }
}

/**
 * Run comprehensive tests
 */
function runTests() {
  console.log('🧪 Testing Component Examples...\n');
  console.log(`📊 Total routes to test: ${EXAMPLE_ROUTES.length}\n`);
  
  const results = {
    passed: 0,
    failed: 0,
    issues: []
  };
  
  EXAMPLE_ROUTES.forEach((route, index) => {
    console.log(`[${index + 1}/${EXAMPLE_ROUTES.length}] Testing: ${route}`);
    
    const pageExists = checkPageExists(route);
    const exampleExists = checkExampleExists(route);
    const importCheck = checkImports(route);
    
    if (pageExists && exampleExists && !importCheck.hasIssues) {
      console.log(`✅ PASS`);
      results.passed++;
    } else {
      console.log(`❌ FAIL`);
      results.failed++;
      
      const routeIssues = [];
      if (!pageExists) routeIssues.push('Page file missing');
      if (!exampleExists) routeIssues.push('Example component missing');
      if (importCheck.hasIssues) routeIssues.push(...importCheck.issues);
      
      results.issues.push({
        route,
        issues: routeIssues
      });
    }
    
    console.log(''); // Empty line for readability
  });
  
  // Summary
  console.log('📋 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📊 Success Rate: ${((results.passed / EXAMPLE_ROUTES.length) * 100).toFixed(1)}%`);
  
  if (results.issues.length > 0) {
    console.log('\n🔍 DETAILED ISSUES:');
    results.issues.forEach((item, index) => {
      console.log(`\n${index + 1}. ${item.route}`);
      item.issues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
    });
  }
  
  console.log('\n🎯 RECOMMENDATIONS:');
  console.log('1. Fix missing page.tsx files');
  console.log('2. Create missing example components');
  console.log('3. Ensure proper imports from main index');
  console.log('4. Add "use client" directives where needed');
  console.log('5. Test routes manually in browser after fixes');
  
  return results;
}

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = { runTests, EXAMPLE_ROUTES };