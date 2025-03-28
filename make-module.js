#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moduleNameInput = process.argv[2];

if (!moduleNameInput) {
    console.error('❗️ Please provide module name: node make-module.js user');
    process.exit(1);
}

const moduleName = moduleNameInput.charAt(0).toUpperCase() + moduleNameInput.slice(1);
const basePath = path.join(__dirname, 'modules', moduleName.toLowerCase());

// Folder và File Mapping
const folders = {
    controllers: `${moduleName}Controller.js`,
    services: `${moduleName}Service.js`,
    jobs: `${moduleName}Job.js`,
    models: `${moduleName}.js`,
    requests: `${moduleName}Request.js`,
    middleware: `${moduleName}Middleware.js`
};

// Template nội dung
const templates = {
    controllers: `class ${moduleName}Controller {
  index(req, res) {
    res.send('${moduleName}Controller index');
  }

  show(req, res) {
    res.send('${moduleName}Controller show');
  }
}

module.exports = new ${moduleName}Controller();`,

    services: `class ${moduleName}Service {
  async handle() {
    // Logic xử lý ${moduleName}
  }
}

module.exports = new ${moduleName}Service();`,

    jobs: `class ${moduleName}Job {
  async handle() {
    // Xử lý Job cho ${moduleName}
  }
}

module.exports = new ${moduleName}Job();`,

    models: `const { DataTypes } = require('sequelize');
const sequelize = require('../../../models').sequelize;

const ${moduleName} = sequelize.define('${moduleName}', {
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  tableName: '${moduleName.toLowerCase()}s',
  underscored: true
});

module.exports = ${moduleName};`,

    requests: `class ${moduleName}Request {
  validate(req, res, next) {
    // Validate logic for ${moduleName}
    next();
  }
}

module.exports = new ${moduleName}Request();`,

    middleware: `class ${moduleName}Middleware {
  handle(req, res, next) {
    // Middleware logic for ${moduleName}
    next();
  }
}

module.exports = new ${moduleName}Middleware();`
};

// Tạo folder + file
Object.entries(folders).forEach(([folder, file]) => {
    const dir = path.join(basePath, folder);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📂 Created folder: ${dir}`);
    }

    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, templates[folder]);
        console.log(`📄 Created file: ${filePath}`);
    }
});

console.log(`✅ Module "${moduleName}" has been created successfully!`);
