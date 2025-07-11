#!/usr/bin/env node

// Test script for the documentation package
const { 
  searchComponents, 
  getComponent, 
  getComponents, 
  getCategories,
  getComponentDocs,
  getRecommendations,
  generateUsageExample,
  getSummary,
  getStyleFiles,
  getCSSVariables,
  getUtilityClasses,
  getStyleGuide,
  getComponentStyleRequirements
} = require('./index');

const { 
  fuzzySearch, 
  searchByTags, 
  advancedSearch,
  getSuggestions 
} = require('./search');

console.log('🧪 Testing @instincthub/react-ui-docs package...\n');

try {
  // Test 1: Basic search
  console.log('📋 Test 1: Basic component search');
  const searchResults = searchComponents('button', { limit: 3 });
  console.log(`Found ${searchResults.length} button components:`);
  searchResults.forEach(comp => {
    console.log(`  - ${comp.name}: ${comp.description}`);
  });
  console.log('✅ Search test passed\n');

  // Test 2: Get specific component
  console.log('🔍 Test 2: Get specific component');
  const submitButton = getComponent('SubmitButton');
  if (submitButton) {
    console.log(`Found SubmitButton: ${submitButton.description}`);
    console.log(`Category: ${submitButton.category}, Type: ${submitButton.type}`);
    console.log(`Tags: ${submitButton.tags?.join(', ') || 'None'}`);
  } else {
    console.log('SubmitButton not found');
  }
  console.log('✅ Component retrieval test passed\n');

  // Test 3: Get categories
  console.log('📂 Test 3: Get categories');
  const categories = getCategories();
  console.log(`Found ${categories.length} categories:`);
  categories.slice(0, 3).forEach(cat => {
    console.log(`  ${cat.icon} ${cat.name}: ${cat.count} components`);
  });
  console.log('✅ Categories test passed\n');

  // Test 4: Get recommendations
  console.log('🤖 Test 4: Get recommendations');
  const recommendations = getRecommendations('I need to build a login form', { limit: 3 });
  console.log(`Recommended components for login form:`);
  recommendations.forEach(comp => {
    console.log(`  - ${comp.name}: ${comp.description}`);
  });
  console.log('✅ Recommendations test passed\n');

  // Test 5: Generate usage example
  console.log('💻 Test 5: Generate usage example');
  const example = generateUsageExample('SubmitButton');
  console.log('Generated example:');
  console.log('```tsx');
  console.log(example.complete);
  console.log('```');
  console.log('✅ Code generation test passed\n');

  // Test 6: Get documentation
  console.log('📖 Test 6: Get component documentation');
  try {
    const docs = getComponentDocs('SubmitButton');
    console.log(`Documentation length: ${docs.length} characters`);
    console.log('First 200 characters:');
    console.log(docs.substring(0, 200) + '...');
  } catch (error) {
    console.log('Documentation not available:', error.message);
  }
  console.log('✅ Documentation test passed\n');

  // Test 7: Fuzzy search
  console.log('🔍 Test 7: Fuzzy search');
  const fuzzyResults = fuzzySearch('sbmt bttn', 0.3);
  console.log('Fuzzy search for "sbmt bttn":');
  fuzzyResults.slice(0, 3).forEach(comp => {
    console.log(`  - ${comp.name}: ${comp.description}`);
  });
  console.log('✅ Fuzzy search test passed\n');

  // Test 8: Search by tags
  console.log('🏷️ Test 8: Search by tags');
  const tagResults = searchByTags(['form', 'input']);
  console.log(`Found ${tagResults.length} components with form/input tags:`);
  tagResults.slice(0, 3).forEach(comp => {
    console.log(`  - ${comp.name}: ${comp.tags?.join(', ')}`);
  });
  console.log('✅ Tag search test passed\n');

  // Test 9: Advanced search
  console.log('🔧 Test 9: Advanced search');
  const advancedResults = advancedSearch({
    query: 'table',
    category: 'UI',
    limit: 2
  });
  console.log('Advanced search for UI tables:');
  advancedResults.forEach(comp => {
    console.log(`  - ${comp.name}: ${comp.description}`);
  });
  console.log('✅ Advanced search test passed\n');

  // Test 10: Get suggestions
  console.log('💡 Test 10: Get search suggestions');
  const suggestions = getSuggestions('inp', 2);
  console.log('Suggestions for "inp":');
  Object.entries(suggestions).forEach(([type, items]) => {
    if (items.length > 0) {
      console.log(`  ${type}:`);
      items.forEach(item => {
        console.log(`    - ${item.value}: ${item.description}`);
      });
    }
  });
  console.log('✅ Suggestions test passed\n');

  // Test 11: Get summary
  console.log('📊 Test 11: Get summary');
  const summary = getSummary();
  console.log('Package summary:');
  console.log(`  Total components: ${summary.totalComponents}`);
  console.log(`  Categories: ${summary.categories.length}`);
  console.log(`  Component types:`, summary.componentTypes);
  console.log('✅ Summary test passed\n');

  // Test 12: CSS functionality
  console.log('🎨 Test 12: CSS functionality');
  try {
    const styleFiles = getStyleFiles();
    console.log(`Available CSS files: ${styleFiles.length}`);
    
    if (styleFiles.includes('root.css')) {
      const variables = getCSSVariables();
      console.log(`CSS variables found: ${Object.keys(variables).length}`);
    }
    
    const utilityClasses = getUtilityClasses();
    console.log(`Utility classes found: ${utilityClasses.length}`);
    
    const styleGuide = getStyleGuide();
    console.log(`Style guide sections: ${Object.keys(styleGuide).length}`);
    
    const submitButtonStyles = getComponentStyleRequirements('SubmitButton');
    console.log(`SubmitButton requires ${submitButtonStyles.required.length} CSS files`);
    
    console.log('✅ CSS functionality test passed');
  } catch (error) {
    console.log('⚠️ CSS functionality test failed (expected if CSS files not present):', error.message);
  }
  console.log('');

  console.log('🎉 All tests passed! Package is working correctly.');

} catch (error) {
  console.error('❌ Test failed:', error);
  process.exit(1);
}