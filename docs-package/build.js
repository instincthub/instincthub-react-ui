#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function buildDocumentationPackage() {
  console.log('🔄 Building documentation package...');

  try {
    // Source paths
    const staticDocsPath = path.join(__dirname, '../docs/static-docs');
    const cssSourcePath = path.join(__dirname, '../dist/src/assets/css');
    const packagePath = __dirname;

    // Ensure static docs exist
    if (!fs.existsSync(staticDocsPath)) {
      console.error('❌ Static documentation not found. Run `npm run generate-all` in the docs directory first.');
      process.exit(1);
    }

    // Clean and create directories
    const docsDir = path.join(packagePath, 'docs');
    const dataDir = path.join(packagePath, 'data');
    const stylesDir = path.join(packagePath, 'styles');

    await fs.remove(docsDir);
    await fs.remove(dataDir);
    await fs.remove(stylesDir);
    await fs.ensureDir(docsDir);
    await fs.ensureDir(dataDir);
    await fs.ensureDir(stylesDir);

    // Copy documentation files
    console.log('📁 Copying documentation files...');
    await fs.copy(path.join(staticDocsPath, 'components'), path.join(docsDir, 'components'));
    await fs.copy(path.join(staticDocsPath, 'categories'), path.join(docsDir, 'categories'));
    await fs.copy(path.join(staticDocsPath, 'README.md'), path.join(docsDir, 'README.md'));

    // Copy data files
    console.log('💾 Copying data files...');
    await fs.copy(path.join(staticDocsPath, 'data'), dataDir);

    // Copy CSS files
    console.log('🎨 Copying CSS files...');
    if (fs.existsSync(cssSourcePath)) {
      await fs.copy(cssSourcePath, stylesDir);
      console.log('✅ CSS files copied successfully');
    } else {
      console.warn('⚠️ CSS source path not found, creating basic CSS structure');
      // Create basic structure even if source files don't exist
      await fs.ensureDir(path.join(stylesDir, 'bootstrap'));
      await fs.ensureDir(path.join(stylesDir, 'forms'));
      await fs.ensureDir(path.join(stylesDir, 'ui'));
      await fs.ensureDir(path.join(stylesDir, 'navbar'));
      await fs.ensureDir(path.join(stylesDir, 'status'));
      await fs.ensureDir(path.join(stylesDir, 'tabs'));
      await fs.ensureDir(path.join(stylesDir, 'cursors'));
      await fs.ensureDir(path.join(stylesDir, 'modals'));
    }

    console.log('✅ Documentation package build complete!');

    // Show package contents
    const docsCount = (await fs.readdir(path.join(docsDir, 'components'))).length;
    const categoriesCount = (await fs.readdir(path.join(docsDir, 'categories'))).length;
    const dataFiles = await fs.readdir(dataDir);
    
    let cssFilesCount = 0;
    if (fs.existsSync(stylesDir)) {
      const getAllFiles = async (dir) => {
        const files = [];
        const items = await fs.readdir(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = await fs.stat(fullPath);
          if (stat.isDirectory()) {
            files.push(...await getAllFiles(fullPath));
          } else if (item.endsWith('.css')) {
            files.push(fullPath);
          }
        }
        return files;
      };
      const cssFiles = await getAllFiles(stylesDir);
      cssFilesCount = cssFiles.length;
    }

    console.log(`\n📊 Package Contents:
- Component docs: ${docsCount}
- Category docs: ${categoriesCount}
- Data files: ${dataFiles.length} (${dataFiles.join(', ')})
- CSS files: ${cssFilesCount}
- Total package size: ~${await getDirectorySize(packagePath)} MB`);

  } catch (error) {
    console.error('❌ Error building documentation package:', error);
    process.exit(1);
  }
}

async function getDirectorySize(dirPath) {
  const stats = await fs.stat(dirPath);
  if (stats.isFile()) {
    return stats.size;
  }

  let size = 0;
  const files = await fs.readdir(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    try {
      size += await getDirectorySize(filePath);
    } catch (error) {
      // Skip files we can't access
    }
  }
  
  return Math.round(size / 1024 / 1024 * 100) / 100; // Convert to MB
}

// Run build if called directly
if (require.main === module) {
  buildDocumentationPackage();
}

module.exports = { buildDocumentationPackage };