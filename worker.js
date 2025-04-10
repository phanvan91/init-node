require('./bootstrap/global');
const QueueManager = require('./app/queues/QueueManager');
const queueConfig = require('./config/queue');

const triesIndex = process.argv.indexOf('--tries');
const tries = triesIndex !== -1 ? parseInt(process.argv[triesIndex + 1]) : 3;

const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const path = require('path');

const startWorker = async () => {
  const connection = new IORedis(queueConfig.connections.redis || {});
  if (queueConfig.default === 'database') {
    console.log(`🎯 Database Queue Worker started. Max attempts: ${tries}`);
    setInterval(() => {
      QueueManager.processDatabaseQueue(tries);
    }, 3000);
  } else if (queueConfig.default === 'bullmq') {
    console.log('🚀 BullMQ Queue Worker started.');
    const worker = new Worker('default', async job => {
      const filePath = job.data.filePath;
      const jobData = job.data.data;
      console.log(`Processing job ${job.id} with data:`, jobData);
      console.log("filePath", filePath);

      const fullPath = path.resolve(process.cwd(), filePath);
      const JobClass = require(fullPath);
      const jobInstance = new JobClass({ data: jobData });
      await jobInstance.handle();

    }, { connection });

    worker.on('completed', job => {
      console.log(`✅ BullMQ Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
      console.error(`❌ BullMQ Job ${job.id} failed: ${err.message}`);
    });
  }
  else {
    console.log('⚠️ Current queue driver is not "database".');
  }
};

startWorker();
