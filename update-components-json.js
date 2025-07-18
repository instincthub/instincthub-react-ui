const fs = require('fs');
const path = require('path');

// Read the components.json file
const filePath = path.join(__dirname, 'docs/static-docs/data/components.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Add example_path to each component
const updatedData = data.map(component => {
  return {
    ...component,
    example_path: `https://github.com/instincthub/instincthub-react-ui/tree/main/docs/static-docs/components/${component.name}.md`
  };
});

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

console.log(`Successfully updated ${updatedData.length} components with example_path field`);