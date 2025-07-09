import * as fs from 'fs';
import * as path from 'path';
import { ComponentInfo, ComponentCategory } from '../types/index.js';

/**
 * Script to generate component data from ComponentLists.tsx
 * This parses the ComponentLists.tsx file and extracts component information
 */

function parseComponentListsFile(): ComponentInfo[] {
  const componentListsPath = path.join(__dirname, '../../../src/components/ui/ComponentLists.tsx');
  
  if (!fs.existsSync(componentListsPath)) {
    throw new Error(`ComponentLists.tsx not found at ${componentListsPath}`);
  }

  const content = fs.readFileSync(componentListsPath, 'utf-8');
  
  // Extract the components array from the file
  const arrayMatch = content.match(/const components: ComponentInfo\[\] = \[([\s\S]*?)\];/);
  if (!arrayMatch) {
    throw new Error('Could not find components array in ComponentLists.tsx');
  }

  const arrayContent = arrayMatch[1];
  const components: ComponentInfo[] = [];

  // Parse individual component objects
  const componentRegex = /{\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*repo_path:\s*"([^"]+)",?\s*}/g;
  
  let match;
  while ((match = componentRegex.exec(arrayContent)) !== null) {
    const [, name, description, category, repo_path] = match;
    
    // Determine component type based on naming patterns
    let type: ComponentInfo['type'] = 'component';
    if (name.startsWith('use')) {
      type = 'hook';
    } else if (name.includes('Context') || name.includes('Provider')) {
      type = 'context';
    } else if (name.includes('Utility') || name.includes('Helper')) {
      type = 'utility';
    }

    // Add tags based on category and name
    const tags: string[] = [];
    tags.push(category.toLowerCase());
    
    if (name.includes('Input') || name.includes('Field')) {
      tags.push('input', 'form');
    }
    if (name.includes('Button')) {
      tags.push('button', 'action');
    }
    if (name.includes('Modal') || name.includes('Dialog')) {
      tags.push('modal', 'overlay');
    }
    if (name.includes('Table')) {
      tags.push('table', 'data');
    }
    if (name.includes('Chart')) {
      tags.push('chart', 'visualization');
    }
    if (name.includes('Navigation') || name.includes('Navbar')) {
      tags.push('navigation', 'menu');
    }

    components.push({
      name,
      description,
      category,
      repo_path,
      type,
      tags,
    });
  }

  return components;
}

function generateComponentCategories(components: ComponentInfo[]): ComponentCategory[] {
  const categoryMap = new Map<string, ComponentInfo[]>();
  
  components.forEach(component => {
    if (!categoryMap.has(component.category)) {
      categoryMap.set(component.category, []);
    }
    categoryMap.get(component.category)!.push(component);
  });

  const categories: ComponentCategory[] = [];
  
  categoryMap.forEach((components, categoryName) => {
    const category: ComponentCategory = {
      name: categoryName,
      description: getCategoryDescription(categoryName),
      components: components.sort((a, b) => a.name.localeCompare(b.name)),
      color: getCategoryColor(categoryName),
      icon: getCategoryIcon(categoryName),
    };
    categories.push(category);
  });

  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'Forms': 'Form inputs, validation, and interactive form components',
    'Auth': 'Authentication, authorization, and user session management components',
    'Navbar': 'Navigation, menus, and header components',
    'UI': 'General UI components, cards, buttons, and layout elements',
    'Status': 'Status indicators, error states, and feedback components',
    'Theme': 'Theme providers, dark mode, and styling components',
    'Tabs': 'Tab navigation and tabbed interface components',
    'Cursors': 'Custom cursor effects and interactive animations',
    'Library': 'Utility components and third-party integrations',
  };
  
  return descriptions[category] || `${category} components`;
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Forms': '#4f46e5',
    'Auth': '#059669',
    'Navbar': '#7c3aed',
    'UI': '#2563eb',
    'Status': '#dc2626',
    'Theme': '#7c2d12',
    'Tabs': '#0891b2',
    'Cursors': '#c026d3',
    'Library': '#374151',
  };
  
  return colors[category] || '#6b7280';
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Forms': '📝',
    'Auth': '🔐',
    'Navbar': '🧭',
    'UI': '🎨',
    'Status': '⚠️',
    'Theme': '🌙',
    'Tabs': '📑',
    'Cursors': '🖱️',
    'Library': '📚',
  };
  
  return icons[category] || '🔧';
}

function generateComponentData() {
  try {
    console.log('🔄 Parsing ComponentLists.tsx...');
    const components = parseComponentListsFile();
    
    console.log(`✅ Found ${components.length} components`);
    
    console.log('🔄 Generating categories...');
    const categories = generateComponentCategories(components);
    
    console.log(`✅ Generated ${categories.length} categories`);
    
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write components data
    const componentsPath = path.join(dataDir, 'components.json');
    fs.writeFileSync(componentsPath, JSON.stringify(components, null, 2));
    console.log(`✅ Components data written to ${componentsPath}`);
    
    // Write categories data
    const categoriesPath = path.join(dataDir, 'categories.json');
    fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
    console.log(`✅ Categories data written to ${categoriesPath}`);
    
    // Generate summary
    const summary = {
      totalComponents: components.length,
      categories: categories.map(cat => ({
        name: cat.name,
        count: cat.components.length,
        description: cat.description,
      })),
      componentTypes: {
        component: components.filter(c => c.type === 'component').length,
        hook: components.filter(c => c.type === 'hook').length,
        context: components.filter(c => c.type === 'context').length,
        utility: components.filter(c => c.type === 'utility').length,
      },
      generatedAt: new Date().toISOString(),
    };
    
    const summaryPath = path.join(dataDir, 'summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`✅ Summary written to ${summaryPath}`);
    
    console.log('🎉 Component data generation complete!');
    console.log(`\nSummary:
- Total components: ${summary.totalComponents}
- Categories: ${summary.categories.length}
- Components: ${summary.componentTypes.component}
- Hooks: ${summary.componentTypes.hook}
- Contexts: ${summary.componentTypes.context}
- Utilities: ${summary.componentTypes.utility}
`);
    
  } catch (error) {
    console.error('❌ Error generating component data:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  generateComponentData();
}

export { generateComponentData };