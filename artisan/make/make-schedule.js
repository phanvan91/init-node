const fs = require('fs');
const path = require('path');

const name = process.argv[2];

if (!name) {
  console.log('❗ Schedule name is required: yarn artisan make:schedule CleanLogJob');
  process.exit(1);
}

const className = name.endsWith('Job') ? name : `${name}Job`;
const fileName = `${className}.js`;
const targetDir = path.join(__dirname, '../../app/console/schedules');
const targetPath = path.join(targetDir, fileName);

if (fs.existsSync(targetPath)) {
  console.log(`⚠️ Schedule ${fileName} already exists.`);
  process.exit(1);
}

// Template content
const template = `const cron = require('node-cron');

class ${className} {
  schedule(cronTime = '0 3 * * *') {
    cron.schedule(cronTime, async () => {
      console.log(\`🧹 Running ${className} at \${cronTime}\`);
      await this.handle();
    });
  }

  async handle() {
    console.log('🧼 TODO: Implement logic inside ${className}.handle()');
  }
}

module.exports = new ${className}();`;

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetPath, template);

console.log(`✅ Schedule created: app/console/schedules/${fileName}`);
