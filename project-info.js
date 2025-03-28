const fs = require('fs');
const { execSync } = require('child_process');

// Ensure info directory exists
if (!fs.existsSync('./info')) {
  fs.mkdirSync('./info');
}

// Export structure
try {
  const structure = execSync('tree -d -L 3 --noreport --charset=ascii -I "node_modules|.git|dist|uploads"').toString();
  fs.writeFileSync('./info/project-structure.txt', structure);
  console.log('✅ Project structure exported.');
} catch (err) {
  console.error('❌ tree command not available.');
}

// Export package.json
try {
  const packageJson = fs.readFileSync('./package.json').toString();
  fs.writeFileSync('./info/project-package.txt', packageJson);
  console.log('✅ package.json exported.');
} catch (err) {
  console.error('❌ package.json not found.');
}

// Export artisan.js if exists
if (fs.existsSync('./artisan.js')) {
  const artisanContent = fs.readFileSync('./artisan.js').toString();
  fs.writeFileSync('./info/project-artisan.txt', artisanContent);
  console.log('✅ artisan.js exported.');
}
