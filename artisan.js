
const { exec } = require('child_process');
const { spawn } = require('child_process');
const command = process.argv[2];
const param = process.argv[3];

switch (command) {
    case 'dev':
    case 'server':
    case 'serve':
        const child = spawn('yarn', [command], { stdio: 'inherit' });
        child.on('close', (code) => {
            process.exit(code);
        });
        break;
    case 'make-module':
        if (!param) {
            console.log('Module name is required.');
            process.exit(1);
        }
        exec(`node make-module.js ${param}`, (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'make:model':
        if (!param) {
            console.log('Model name is required.');
            process.exit(1);
        }
        exec(`npx sequelize-cli model:generate --name ${param}`, (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'make:migration':
        if (!param) {
            console.log('Migration name is required.');
            process.exit(1);
        }
        exec(`npx sequelize-cli migration:generate --name ${param}`, (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'migrate':
        exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'migrate:undo':
        exec('npx sequelize-cli db:migrate:undo', (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'seed':
        exec('npx sequelize-cli db:seed:all', (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'make:seed':
        if (!param) {
            console.log('Seeder name is required.');
            process.exit(1);
        }
        exec(`npx sequelize-cli seed:generate --name ${param}`, (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'tree-structure':
        exec('tree -d -L 3 --noreport --charset=ascii -I "node_modules|.git|dist|uploads" > structure.txt', (err, stdout, stderr) => {
            if (err) console.error(stderr);
            else console.log(stdout);
        });
        break;
    case 'queue:work':
        const worker = spawn('node', ['worker.js', '--tries', param || '3'], {
            stdio: 'inherit',
        });
        worker.on('close', (code) => {
            process.exit(code);
        });
        break;
    default:
        console.log('Unknown command');
}
