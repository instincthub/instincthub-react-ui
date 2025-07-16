#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class StaticDocumentationGenerator {
    constructor() {
        this.components = [];
        this.srcPath = path.join(__dirname, '../../src');
        this.docsOutputPath = path.join(__dirname, '../static-docs');
    }
    /**
     * Parse ComponentLists.tsx to get all component information
     */
    parseComponentListsFile() {
        const componentListsPath = path.join(this.srcPath, 'components/ui/ComponentLists.tsx');
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
        const components = [];
        // Parse individual component objects
        const componentRegex = /{\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*repo_path:\s*"([^"]+)",?\s*}/g;
        let match;
        while ((match = componentRegex.exec(arrayContent)) !== null) {
            const [, name, description, category, repo_path] = match;
            // Determine component type based on naming patterns
            let type = 'component';
            if (name.startsWith('use')) {
                type = 'hook';
            }
            else if (name.includes('Context') || name.includes('Provider')) {
                type = 'context';
            }
            else if (name.includes('Utility') || name.includes('Helper')) {
                type = 'utility';
            }
            // Add tags based on category and name
            const tags = [];
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
    /**
     * Read README.md file for a component if it exists
     */
    readComponentReadme(component) {
        const readmePaths = [
            path.join(this.srcPath, component.repo_path.replace('.tsx', '.md')),
            path.join(this.srcPath, path.dirname(component.repo_path), 'readme', `${component.name}.md`),
            path.join(this.srcPath, path.dirname(component.repo_path), 'README.md'),
        ];
        for (const readmePath of readmePaths) {
            if (fs.existsSync(readmePath)) {
                return fs.readFileSync(readmePath, 'utf-8');
            }
        }
        return undefined;
    }
    /**
     * Extract TypeScript interface/props from component file
     */
    extractComponentProps(component) {
        const componentPath = path.join(this.srcPath, component.repo_path);
        if (!fs.existsSync(componentPath)) {
            return [];
        }
        const content = fs.readFileSync(componentPath, 'utf-8');
        const props = [];
        // Look for interface definitions
        const interfaceRegex = /interface\s+(\w+Props)\s*{([^}]*)}/g;
        let match;
        while ((match = interfaceRegex.exec(content)) !== null) {
            const [, interfaceName, interfaceBody] = match;
            // Parse individual props
            const propRegex = /(\w+)(\??):\s*([^;]+);/g;
            let propMatch;
            while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
                const [, propName, optional, propType] = propMatch;
                props.push({
                    name: propName,
                    type: propType.trim(),
                    optional: optional === '?',
                    description: '', // Could be enhanced to extract JSDoc comments
                });
            }
        }
        return props;
    }
    /**
     * Extract usage examples from component files or example files
     */
    extractComponentExamples(component) {
        const examples = [];
        // Look for example files
        const examplePaths = [
            path.join(this.srcPath, '__examples__/src/components', component.category.toLowerCase(), `${component.name}Example.tsx`),
            path.join(this.srcPath, '__examples__/src/components', component.category.toLowerCase(), `${component.name}Sample.tsx`),
        ];
        for (const examplePath of examplePaths) {
            if (fs.existsSync(examplePath)) {
                const content = fs.readFileSync(examplePath, 'utf-8');
                examples.push(content);
            }
        }
        return examples;
    }
    /**
     * Generate categories with enriched component data
     */
    generateComponentCategories(components) {
        const categoryMap = new Map();
        components.forEach(component => {
            if (!categoryMap.has(component.category)) {
                categoryMap.set(component.category, []);
            }
            categoryMap.get(component.category).push(component);
        });
        const categories = [];
        categoryMap.forEach((components, categoryName) => {
            const category = {
                name: categoryName,
                description: this.getCategoryDescription(categoryName),
                components: components.sort((a, b) => a.name.localeCompare(b.name)),
                color: this.getCategoryColor(categoryName),
                icon: this.getCategoryIcon(categoryName),
                count: components.length,
            };
            categories.push(category);
        });
        return categories.sort((a, b) => a.name.localeCompare(b.name));
    }
    getCategoryDescription(category) {
        const descriptions = {
            'Forms': 'Form inputs, validation, and interactive form components for building user interfaces',
            'Auth': 'Authentication, authorization, and user session management components',
            'Navbar': 'Navigation, menus, breadcrumbs, and header components for site navigation',
            'UI': 'General UI components including cards, buttons, modals, tables, and layout elements',
            'Status': 'Status indicators, error states, loading states, and user feedback components',
            'Theme': 'Theme providers, dark mode toggles, and styling utility components',
            'Tabs': 'Tab navigation and tabbed interface components for organizing content',
            'Cursors': 'Custom cursor effects, animations, and interactive cursor components',
            'Library': 'Utility components, helpers, and third-party library integrations',
        };
        return descriptions[category] || `${category} components`;
    }
    getCategoryColor(category) {
        const colors = {
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
    getCategoryIcon(category) {
        const icons = {
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
    /**
     * Generate comprehensive markdown documentation for a component
     */
    generateComponentMarkdown(component) {
        const { name, description, category, repo_path, type, tags, props, examples, readmeContent } = component;
        let markdown = `# ${name}\n\n`;
        markdown += `**Category:** ${category} | **Type:** ${type || 'component'}\n\n`;
        markdown += `${description}\n\n`;
        // File location
        markdown += `## 📁 File Location\n\n`;
        markdown += `\`${repo_path}\`\n\n`;
        // Tags
        if (tags && tags.length > 0) {
            markdown += `## 🏷️ Tags\n\n`;
            markdown += tags.map(tag => `\`${tag}\``).join(', ') + '\n\n';
        }
        // Props/Interface
        if (props && props.length > 0) {
            markdown += `## 🔧 Props\n\n`;
            markdown += `| Prop | Type | Required | Description |\n`;
            markdown += `|------|------|----------|-------------|\n`;
            props.forEach(prop => {
                const required = prop.optional ? '❌' : '✅';
                markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${required} | ${prop.description || 'No description'} |\n`;
            });
            markdown += '\n';
        }
        // Usage Examples
        if (examples && examples.length > 0) {
            markdown += `## 📖 Usage Examples\n\n`;
            examples.forEach((example, index) => {
                markdown += `### Example ${index + 1}\n\n`;
                markdown += `\`\`\`tsx\n${example}\n\`\`\`\n\n`;
            });
        }
        // Installation and Import
        markdown += `## 📦 Installation & Import\n\n`;
        markdown += `\`\`\`bash\nnpm install @instincthub/react-ui\n\`\`\`\n\n`;
        markdown += `\`\`\`tsx\nimport { ${name} } from '@instincthub/react-ui';\n\`\`\`\n\n`;
        // Basic Usage Template
        markdown += `## 🚀 Basic Usage\n\n`;
        markdown += `\`\`\`tsx\nimport React from 'react';\nimport { ${name} } from '@instincthub/react-ui';\n\n`;
        markdown += `function MyComponent() {\n  return (\n    <${name}`;
        if (props && props.length > 0) {
            const requiredProps = props.filter(p => !p.optional);
            if (requiredProps.length > 0) {
                markdown += `\n      ${requiredProps.map(p => `${p.name}={/* ${p.type} */}`).join('\n      ')}`;
            }
        }
        markdown += `\n    />\n  );\n}\n\`\`\`\n\n`;
        // Additional README content
        if (readmeContent) {
            markdown += `## 📚 Additional Documentation\n\n`;
            markdown += readmeContent + '\n\n';
        }
        // Related Components
        const relatedComponents = this.components.filter(c => c.category === category && c.name !== name).slice(0, 5);
        if (relatedComponents.length > 0) {
            markdown += `## 🔗 Related Components\n\n`;
            relatedComponents.forEach(related => {
                markdown += `- [${related.name}](./${related.name}.md) - ${related.description}\n`;
            });
            markdown += '\n';
        }
        return markdown;
    }
    /**
     * Generate category overview markdown
     */
    generateCategoryMarkdown(category) {
        let markdown = `# ${category.icon} ${category.name} Components\n\n`;
        markdown += `${category.description}\n\n`;
        markdown += `**Total Components:** ${category.count}\n\n`;
        // Component list
        markdown += `## 📋 Components in this Category\n\n`;
        category.components.forEach(component => {
            markdown += `### [${component.name}](./components/${component.name}.md)\n`;
            markdown += `${component.description}\n\n`;
            markdown += `**Type:** ${component.type || 'component'} | **File:** \`${component.repo_path}\`\n\n`;
            if (component.tags && component.tags.length > 0) {
                markdown += `**Tags:** ${component.tags.map(tag => `\`${tag}\``).join(', ')}\n\n`;
            }
            markdown += `---\n\n`;
        });
        return markdown;
    }
    /**
     * Generate main documentation index
     */
    generateMainIndex(documentationData) {
        let markdown = `# 📚 InstinctHub React UI - Component Documentation\n\n`;
        markdown += `Complete documentation for all ${documentationData.summary.totalComponents} components in the InstinctHub React UI library.\n\n`;
        // Quick stats
        markdown += `## 📊 Quick Stats\n\n`;
        markdown += `- **Total Components:** ${documentationData.summary.totalComponents}\n`;
        markdown += `- **Categories:** ${documentationData.summary.categories.length}\n`;
        markdown += `- **Components:** ${documentationData.summary.componentTypes.component}\n`;
        markdown += `- **Hooks:** ${documentationData.summary.componentTypes.hook}\n`;
        markdown += `- **Contexts:** ${documentationData.summary.componentTypes.context}\n`;
        markdown += `- **Utilities:** ${documentationData.summary.componentTypes.utility}\n`;
        markdown += `- **Generated:** ${new Date(documentationData.summary.generatedAt).toLocaleString()}\n\n`;
        // Installation
        markdown += `## 📦 Installation\n\n`;
        markdown += `\`\`\`bash\nnpm install @instincthub/react-ui\n\`\`\`\n\n`;
        // Categories overview
        markdown += `## 🗂️ Component Categories\n\n`;
        documentationData.categories.forEach(category => {
            markdown += `### [${category.icon} ${category.name}](./categories/${category.name}.md)\n`;
            markdown += `${category.description}\n\n`;
            markdown += `**Components:** ${category.count} | **Color:** ${category.color}\n\n`;
        });
        // Quick component index
        markdown += `## 🔍 All Components (A-Z)\n\n`;
        const sortedComponents = [...documentationData.components].sort((a, b) => a.name.localeCompare(b.name));
        sortedComponents.forEach(component => {
            markdown += `- [${component.name}](./components/${component.name}.md) - ${component.description} (${component.category})\n`;
        });
        return markdown;
    }
    /**
     * Generate search index JSON for quick component lookup
     */
    generateSearchIndex(documentationData) {
        return {
            components: documentationData.components.map(component => ({
                name: component.name,
                description: component.description,
                category: component.category,
                type: component.type,
                tags: component.tags,
                searchTerms: [
                    component.name.toLowerCase(),
                    component.description.toLowerCase(),
                    ...(component.tags || []).map(tag => tag.toLowerCase()),
                    component.category.toLowerCase(),
                ],
            })),
            categories: documentationData.categories.map(category => ({
                name: category.name,
                description: category.description,
                count: category.count,
                icon: category.icon,
            })),
            searchHelpers: {
                byCategory: Object.fromEntries(documentationData.categories.map(cat => [
                    cat.name.toLowerCase(),
                    cat.components.map(c => c.name)
                ])),
                byType: {
                    component: documentationData.components.filter(c => c.type === 'component').map(c => c.name),
                    hook: documentationData.components.filter(c => c.type === 'hook').map(c => c.name),
                    context: documentationData.components.filter(c => c.type === 'context').map(c => c.name),
                    utility: documentationData.components.filter(c => c.type === 'utility').map(c => c.name),
                },
                byTags: Object.fromEntries(Array.from(new Set(documentationData.components.flatMap(c => c.tags || []))).map(tag => [
                    tag,
                    documentationData.components.filter(c => c.tags?.includes(tag)).map(c => c.name)
                ])),
            },
            generatedAt: documentationData.summary.generatedAt,
        };
    }
    /**
     * Main generation method
     */
    async generate() {
        console.log('🔄 Starting static documentation generation...');
        try {
            // Step 1: Parse component data
            console.log('📋 Parsing component list...');
            this.components = this.parseComponentListsFile();
            console.log(`✅ Found ${this.components.length} components`);
            // Step 2: Enrich component data
            console.log('🔍 Enriching component data...');
            for (const component of this.components) {
                component.readmeContent = this.readComponentReadme(component);
                component.props = this.extractComponentProps(component);
                component.examples = this.extractComponentExamples(component);
            }
            // Step 3: Generate categories
            console.log('📂 Generating categories...');
            const categories = this.generateComponentCategories(this.components);
            // Step 4: Create documentation data structure
            const documentationData = {
                components: this.components,
                categories,
                summary: {
                    totalComponents: this.components.length,
                    categories: categories.map(cat => ({
                        name: cat.name,
                        count: cat.count,
                        description: cat.description,
                    })),
                    componentTypes: {
                        component: this.components.filter(c => c.type === 'component').length,
                        hook: this.components.filter(c => c.type === 'hook').length,
                        context: this.components.filter(c => c.type === 'context').length,
                        utility: this.components.filter(c => c.type === 'utility').length,
                    },
                    generatedAt: new Date().toISOString(),
                },
            };
            // Step 5: Create output directories
            console.log('📁 Creating output directories...');
            const dirs = [
                this.docsOutputPath,
                path.join(this.docsOutputPath, 'components'),
                path.join(this.docsOutputPath, 'categories'),
                path.join(this.docsOutputPath, 'data'),
            ];
            dirs.forEach(dir => {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            });
            // Step 6: Generate individual component documentation
            console.log('📝 Generating component documentation...');
            for (const component of this.components) {
                const componentMarkdown = this.generateComponentMarkdown(component);
                const componentPath = path.join(this.docsOutputPath, 'components', `${component.name}.md`);
                fs.writeFileSync(componentPath, componentMarkdown);
            }
            // Step 7: Generate category documentation
            console.log('📂 Generating category documentation...');
            for (const category of categories) {
                const categoryMarkdown = this.generateCategoryMarkdown(category);
                const categoryPath = path.join(this.docsOutputPath, 'categories', `${category.name}.md`);
                fs.writeFileSync(categoryPath, categoryMarkdown);
            }
            // Step 8: Generate main index
            console.log('📄 Generating main documentation index...');
            const mainIndex = this.generateMainIndex(documentationData);
            fs.writeFileSync(path.join(this.docsOutputPath, 'README.md'), mainIndex);
            // Step 9: Generate JSON data files
            console.log('💾 Generating JSON data files...');
            const dataPath = path.join(this.docsOutputPath, 'data');
            // Components data
            fs.writeFileSync(path.join(dataPath, 'components.json'), JSON.stringify(this.components, null, 2));
            // Categories data
            fs.writeFileSync(path.join(dataPath, 'categories.json'), JSON.stringify(categories, null, 2));
            // Summary data
            fs.writeFileSync(path.join(dataPath, 'summary.json'), JSON.stringify(documentationData.summary, null, 2));
            // Search index
            const searchIndex = this.generateSearchIndex(documentationData);
            fs.writeFileSync(path.join(dataPath, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
            // Full documentation data
            fs.writeFileSync(path.join(dataPath, 'documentation.json'), JSON.stringify(documentationData, null, 2));
            console.log('✅ Static documentation generation complete!');
            console.log(`\n📊 Summary:
- Components documented: ${this.components.length}
- Categories: ${categories.length}
- Output directory: ${this.docsOutputPath}
- Files generated: ${this.components.length + categories.length + 6} files

📁 Generated files:
- README.md (main index)
- components/*.md (${this.components.length} component docs)
- categories/*.md (${categories.length} category docs)  
- data/*.json (5 data files)
`);
        }
        catch (error) {
            console.error('❌ Error generating static documentation:', error);
            throw error;
        }
    }
}
// Export for programmatic use
export { StaticDocumentationGenerator };
// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
    const generator = new StaticDocumentationGenerator();
    generator.generate().catch((error) => {
        console.error('Failed to generate documentation:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=generate-docs.js.map