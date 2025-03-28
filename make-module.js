#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moduleNameInput = process.argv[2];

if (!moduleNameInput) {
    console.error('❗️ Vui lòng nhập tên module: node make-module.js User');
    process.exit(1);
}

const moduleName = moduleNameInput.charAt(0).toUpperCase() + moduleNameInput.slice(1);
const basePath = path.join(__dirname, 'modules', moduleName);

// Folder và File Mapping
const folders = {
    Controllers: `${moduleName}Controller.js`,
    Services: `${moduleName}Service.js`,
    Jobs: `${moduleName}Job.js`,
    Models: `${moduleName}.js`,
    Requests: `${moduleName}Request.js`,
    Middleware: `${moduleName}Middleware.js` // Laravel style, không có "s"
};

// Template nội dung
const templates = {
    Controllers: `class ${moduleName}Controller {
  index(req, res) {
    res.send('${moduleName}Controller index');
  }

  show(req, res) {
    res.send('${moduleName}Controller show');
  }
}

module.exports = new ${moduleName}Controller();`,

    Services: `class ${moduleName}Service {
  async handle() {
    // Logic xử lý ${moduleName}
  }
}

module.exports = new ${moduleName}Service();`,

    Jobs: `class ${moduleName}Job {
  async handle() {
    // Xử lý Job cho ${moduleName}
  }
}

module.exports = new ${moduleName}Job();`,

    Models: `const { DataTypes } = require('sequelize');
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

    Requests: `class ${moduleName}Request {
  validate(req, res, next) {
    // Validate logic for ${moduleName}
    next();
  }
}

module.exports = new ${moduleName}Request();`,

    Middleware: `class ${moduleName}Middleware {
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
        console.log(`📂 Tạo folder: ${dir}`);
    }

    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, templates[folder]);
        console.log(`📄 Tạo file: ${filePath}`);
    }
});

console.log(`✅ Đã tạo module "${moduleName}" đầy đủ thành công!`);
