const QueueManager = require('../queues/QueueManager');
const queueConfig = require('../../config/queue');
const path = require('path');

class ExampleJob {
    static queueName = 'default';
    static filePath = path.relative(process.cwd(), __filename); // Lưu path tương đối

    static async dispatch(data) {
        if (queueConfig.default === 'sync') {
            await this.handle({ data });
            return;
        }

        const queue = QueueManager.createQueue(this.queueName);
        await queue.add(data, this.filePath);
    }

    static async handle(job) {
        console.log('📩 Processing ExampleJob:', job.data);
    }
}

module.exports = ExampleJob;
