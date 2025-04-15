const fs = require('fs');
const path = require('path');

const controllerName = process.argv[2];
if (!controllerName) {
  console.log('❗ Controller name is required. Example: yarn artisan make:controller Account');
  process.exit(1);
}

const moduleArg = process.argv.find(arg => arg.startsWith('--module='));
let targetDir = path.join('app', 'http', 'controllers');

if (moduleArg) {
  const moduleName = moduleArg.split('=')[1];
  const modulePath = path.join('modules', moduleName, 'controllers');
  if (!fs.existsSync(modulePath)) {
    console.log(`❌ Module '{moduleName}' not found at path: {modulePath}`);
    process.exit(1);
  }
  targetDir = modulePath;
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const filePath = path.join(targetDir, `${controllerName}Controller.js`);
if (fs.existsSync(filePath)) {
  console.log(`⚠️ Controller already exists: ${filePath}`);
  process.exit(1);
}

const content = `const HttpException = require('../../../app/exceptions/HttpException');
const ExampleJob = require('../../../app/jobs/ExampleJob');

class {ControllerName}Controller {

  index(req, res, next) {
    let data = {
      ...req.query
    };
    ExampleJob.dispatch(data);
    res.send('{ControllerName}Controller index');
  }

  create(req, res) {
    console.log(req.body, req.query, req.files);
    res.send('{ControllerName}Controller create');
  }
}

module.exports = new {ControllerName}Controller();
`.replace(/{ControllerName}/g, controllerName);

fs.writeFileSync(filePath, content);
console.log(`✅ Controller created at: ${filePath}`);
