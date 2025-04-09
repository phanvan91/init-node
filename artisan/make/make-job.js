#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const jobName = process.argv[2];

if (!jobName) {
  console.error('❗️ Please provide job name: node make-job.js SendMailJob');
  process.exit(1);
}
const jobClassName = jobName.endsWith('Job') ? jobName : `${jobName}Job`;
const jobsDir = path.join(process.cwd(), 'app', 'jobs');

if (!fs.existsSync(jobsDir)) {
  fs.mkdirSync(jobsDir, {recursive: true});
}

const filePath = path.join(jobsDir, `${jobClassName}.js`);

if (fs.existsSync(filePath)) {
  console.error(`❗️ Job ${jobClassName} already exists!`);
  process.exit(1);
}

const template = `const BaseJob = require(global.basejob);

class ${jobClassName} extends BaseJob {
  constructor(data) {
    super();
    this.data = data;
  }

  async handle() {
    console.log('📩 Processing ${jobClassName}:', this.data);
  }
}

module.exports = ${jobClassName};
`;

fs.writeFileSync(filePath, template);

console.log(`✅ Job "${jobClassName}" has been created at app/jobs/${jobClassName}.js`);
