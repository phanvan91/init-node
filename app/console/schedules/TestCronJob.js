const cron = require('node-cron');

class TestCronJob {
  schedule(cronTime = '0 3 * * *') {
    cron.schedule(cronTime, async () => {
      console.log(`🧹 Running TestCronJob at ${cronTime}`);
      await this.handle();
    });
  }

  async handle() {
    console.log('🧼 TODO: Implement logic inside TestCronJob.handle()');
  }
}

module.exports = new TestCronJob();