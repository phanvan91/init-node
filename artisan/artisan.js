
const { exec, spawn } = require('child_process');
const path = require('path');

const command = process.argv[2];
const param = process.argv[3];

const isWin = process.platform === 'win32';
const yarnCmd = isWin ? 'yarn.cmd' : 'yarn';
const npxCmd = isWin ? 'npx.cmd' : 'npx';
const nodeCmd = isWin ? 'node.exe' : 'node';

function runSpawn(cmd, args) {
  const child = spawn(cmd, args, { stdio: 'inherit' });
  child.on('close', code => process.exit(code));
}

function runExec(cmdStr) {
  exec(cmdStr, (err, stdout, stderr) => {
    if (err) console.error(stderr);
    else console.log(stdout);
  });
}

switch (command) {
  case 'dev':
  case 'server':
  case 'serve':
    const useNodemon = true;
    const execCmd = useNodemon ? (isWin ? 'npx.cmd' : 'npx') : nodeCmd;
    const serverArgs = useNodemon ? ['nodemon', 'index.js'] : ['index.js'];
    console.log(
      "███████╗████████╗ █████╗ ██████╗ ████████╗    ███╗   ██╗ ██████╗ ██████╗ ███████╗     █████╗ ██████╗ ████████╗██╗███████╗ █████╗ ███╗   ██╗\n" +
      "██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██╔══██╗████╗  ██║\n" +
      "███████╗   ██║   ███████║██████╔╝   ██║       ██╔██╗ ██║██║   ██║██║  ██║█████╗      ███████║██████╔╝   ██║   ██║███████╗███████║██╔██╗ ██║\n" +
      "╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ██║╚██╗██║██║   ██║██║  ██║██╔══╝      ██╔══██║██╔══██╗   ██║   ██║╚════██║██╔══██║██║╚██╗██║\n" +
      "███████║   ██║   ██║  ██║██║  ██║   ██║       ██║ ╚████║╚██████╔╝██████╔╝███████╗    ██║  ██║██║  ██║   ██║   ██║███████║██║  ██║██║ ╚████║\n" +
      "╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝"
    );

    runSpawn(execCmd, serverArgs);
    break;

  case 'make-module':
    if (!param) {
      console.log('Module name is required.');
      process.exit(1);
    }
    runSpawn(nodeCmd, ['artisan/make/make-module.js', param]);
    break;

  case 'make:model':
    if (!param) {
      console.log('Model name is required.');
      process.exit(1);
    }
    // Lấy thêm đối số thứ 3 nếu có
    const moduleFlag = process.argv[4]; // có thể là undefined hoặc '--module=account'
    const args = ['artisan/make/make-model.js', param];

    if (moduleFlag) {
      args.push(moduleFlag); // thêm vào nếu có
    }

    runSpawn(nodeCmd, args);
    break;

  case 'make:migration':
    if (!param) {
      console.log('Migration name is required.');
      process.exit(1);
    }
    runSpawn(npxCmd, ['sequelize-cli', 'migration:generate', '--name', param]);
    break;

  case 'migrate':
    runSpawn(npxCmd, ['sequelize-cli', 'db:migrate']);
    break;

  case 'migrate:undo':
    runSpawn(npxCmd, ['sequelize-cli', 'db:migrate:undo']);
    break;

  case 'seed':
    runSpawn(npxCmd, ['sequelize-cli', 'db:seed:all']);
    break;

  case 'make:seed':
    if (!param) {
      console.log('Seeder name is required.');
      process.exit(1);
    }
    runSpawn(npxCmd, ['sequelize-cli', 'seed:generate', '--name', param]);
    break;

  case 'tree-structure':
    const treeCmd = isWin ? 'cmd' : 'tree';
    const treeArgs = isWin
      ? ['/c', 'dir /s /b > structure.txt']
      : ['-d', '-L', '3', '--noreport', '--charset=ascii', '-I', 'node_modules|.git|dist|uploads'];
    runSpawn(treeCmd, treeArgs);
    break;

  case 'queue:work':
    runSpawn(nodeCmd, ['worker.js', '--tries', param || '3']);
    break;

  case 'make:job':
    if (!param) {
      console.log('❗️ Job name is required: yarn artisan make:job SendMailJob');
      process.exit(1);
    }
    runSpawn(nodeCmd, ['artisan/make/make-job.js', param]);
    break;

  case 'make:controller':
    if (!param) {
      console.log('❗ Controller name is required. Example: yarn artisan make:controller Account [--module=account]');
      process.exit(1);
    }

    const controllerModuleFlag = process.argv[4]; // ví dụ --module=account
    const controllerArgs = ['artisan/make/make-controller.js', param];

    if (controllerModuleFlag) {
      controllerArgs.push(controllerModuleFlag);
    }

    runSpawn(nodeCmd, controllerArgs);
    break;

  case 'make:schedule':
    if (!param) {
      console.log('❗ Schedule name is required: yarn artisan make:schedule CleanLogJob');
      process.exit(1);
    }
    runSpawn(nodeCmd, ['artisan/make/make-schedule.js', param]);
    break;

  default:
    console.log('Unknown command');
}
