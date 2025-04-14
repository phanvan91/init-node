
const { exec } = require('child_process');
const { spawn } = require('child_process');
const command = process.argv[2];
const param = process.argv[3];

const isWin = process.platform === 'win32';
const yarnCmd = isWin ? 'yarn.cmd' : 'yarn';
const npxCmd = isWin ? 'npx.cmd' : 'npx';
const nodeCmd = isWin ? 'node.exe' : 'node';

switch (command) {
  case 'dev':
  case 'server':
  case 'serve':
    const child = spawn(yarnCmd, [command], { stdio: 'inherit' });
    child.on('close', (code) => {
      process.exit(code);
    });
    break;
  case 'make-module':
    if (!param) {
      console.log('Module name is required.');
      process.exit(1);
    }
    const makeModule = spawn(nodeCmd, ['artisan/make/make-module.js', param], { stdio: 'inherit' });
    makeModule.on('close', code => process.exit(code));
    break;
  case 'make:model':
    if (!param) {
      console.log('Model name is required.');
      process.exit(1);
    }
    const makeModel = spawn(npxCmd, ['sequelize-cli', 'model:generate', '--name', param], { stdio: 'inherit' });
    makeModel.on('close', code => process.exit(code));
    break;
  case 'make:migration':
    if (!param) {
      console.log('Migration name is required.');
      process.exit(1);
    }
    const makeMigration = spawn(npxCmd, ['sequelize-cli', 'migration:generate', '--name', param], { stdio: 'inherit' });
    makeMigration.on('close', code => process.exit(code));
    break;
  case 'migrate':
    const migrate = spawn(npxCmd, ['sequelize-cli', 'db:migrate'], { stdio: 'inherit' });
    migrate.on('close', code => process.exit(code));
    break;
  case 'migrate:undo':
    const migrateUndo = spawn(npxCmd, ['sequelize-cli', 'db:migrate:undo'], { stdio: 'inherit' });
    migrateUndo.on('close', code => process.exit(code));
    break;
  case 'seed':
    const seed = spawn(npxCmd, ['sequelize-cli', 'db:seed:all'], { stdio: 'inherit' });
    seed.on('close', code => process.exit(code));
    break;
  case 'make:seed':
    if (!param) {
      console.log('Seeder name is required.');
      process.exit(1);
    }
    const makeSeed = spawn(npxCmd, ['sequelize-cli', 'seed:generate', '--name', param], { stdio: 'inherit' });
    makeSeed.on('close', code => process.exit(code));
    break;
  case 'tree-structure':
    const treeCmd = isWin ? 'tree.com' : 'tree';
    const treeArgs = isWin
      ? ['/F', '/A']
      : ['-d', '-L', '3', '--noreport', '--charset=ascii', '-I', 'node_modules|.git|dist|uploads'];
    const tree = spawn(treeCmd, treeArgs, { stdio: 'inherit' });
    tree.on('close', code => process.exit(code));
    break;
  case 'queue:work':
    const worker = spawn(nodeCmd, ['worker.js', '--tries', param || '3'], { stdio: 'inherit' });
    worker.on('close', code => process.exit(code));
    break;
  case 'make:job':
    if (!param) {
      console.log('❗️ Job name is required: yarn artisan make:job SendMailJob');
      process.exit(1);
    }
    const makeJob = spawn(nodeCmd, ['artisan/make/make-job.js', param], { stdio: 'inherit' });
    makeJob.on('close', code => process.exit(code));
    break;
  case 'make:schedule':
    if (!param) {
      console.log('❗ Schedule name is required: yarn artisan make:schedule CleanLogJob');
      process.exit(1);
    }
    const makeSchedule = spawn(nodeCmd, ['artisan/make/make-schedule.js', param], { stdio: 'inherit' });
    makeSchedule.on('close', code => process.exit(code));
    break;

  default:
    console.log('Unknown command');
}
