const fs = require('fs');
const path = require('path');

// Get model name and check if passed
const modelName = process.argv[2];
if (!modelName) {
  console.log('❗ Model name is required. Example: yarn artisan make:model User [--module=account]');
  process.exit(1);
}

// Check for --module flag
const moduleArg = process.argv.find(arg => arg.startsWith('--module='));
let modelDir = 'models';

if (moduleArg) {
  const moduleName = moduleArg.split('=')[1];
  const modulePath = path.join('modules', moduleName, 'models');

  if (!fs.existsSync(modulePath)) {
    console.log(`❌ Module '${moduleName}' not found at path: ${modulePath}`);
    process.exit(1);
  }

  modelDir = modulePath;
}

// Ensure target directory exists
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir, { recursive: true });
}

const filePath = path.join(modelDir, `${modelName}.js`);
const tableName = modelName.toLowerCase() + 's';

if (fs.existsSync(filePath)) {
  console.log(`⚠️ Model already exists: ${filePath}`);
  process.exit(1);
}

const content = `module.exports = (sequelize, DataTypes) => {
  let tableName = '${tableName}';
  let timestamps = false;

  let fillable = {
    // define your attributes here
  };

  const ${modelName} = sequelize.define('${modelName}', fillable, {
    tableName,
    timestamps,
    underscored: true,
  });

  return ${modelName};
};`;

fs.writeFileSync(filePath, content);
console.log(`✅ Model created at: ${filePath}`);
