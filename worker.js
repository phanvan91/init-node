require('./bootstrap/global');
const QueueManager = require('./app/queues/QueueManager');
const queueConfig = require('./config/queue');

const triesIndex = process.argv.indexOf('--tries');
const tries = triesIndex !== -1 ? parseInt(process.argv[triesIndex + 1]) : 3;

const startWorker = async () => {
  if (queueConfig.default === 'database') {
    console.log(`🎯 Database Queue Worker started. Max attempts: ${tries}`);
    setInterval(() => {
      QueueManager.processDatabaseQueue(tries);
    }, 3000);
  } else {
    console.log('⚠️ Current queue driver is not "database".');
  }
};

startWorker();
