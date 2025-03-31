const db = require('../../models');
const queueConfig = require('../../config/queue');

class QueueManager {
  static queues = {};

  static createQueue(name) {
    if (queueConfig.default === 'sync') return null;
    if (queueConfig.default === 'redis') {
      // const IORedis = require('ioredis');
      // const { Queue } = require('bullmq');
      // const connection = new IORedis(queueConfig.connections.redis);
      // if (!this.queues[name]) {
      //     this.queues[name] = new Queue(name, { connection });
      // }
      // return this.queues[name];
    }
    if (queueConfig.default === 'database') {
      return {
        add: async (data, filePath) => {
          await db.Job.create({
            queue: name,
            payload: {data, filePath},
            available_at: new Date(),
          });
        },
      };
    }
    return null;
  }

  static async processDatabaseQueue(maxAttempts = 3) {
    if (queueConfig.default !== 'database') return;

    const jobs = await db.Job.findAll({
      where: { reserved_at: null },
      limit: 5,
    });

    for (const job of jobs) {
      const { data, filePath } = job.payload;
      try {
        const path = require('path');
        const fullPath = path.resolve(process.cwd(), filePath);
        const JobClass = require(fullPath);

        await JobClass.handle({ data });

        await job.destroy(); // ✅ XÓA job khi thành công
        console.log(`✅ Job ${job.id} completed & removed.`);
      } catch (error) {
        job.attempts += 1;
        if (job.attempts >= maxAttempts) {
          console.error(`❌ Job ${job.id} failed after ${maxAttempts} attempts.`);

          // Ghi vào failed_jobs
          await db.FailedJob.create({
            queue: job.queue,
            payload: job.payload,
            exception: error.message,
          });

          await job.destroy(); // ✅ XÓA khỏi jobs
        } else {
          console.warn(`⚠️ Job ${job.id} failed. Retry attempt ${job.attempts}.`);
          await job.save();
        }
      }
    }
  }

}

module.exports = QueueManager;
