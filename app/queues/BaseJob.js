const QueueManager = require('./QueueManager');
const queueConfig = require('../../config/queue');
const path = require('path');

class BaseJob {
  static async dispatch(data) {
    if (queueConfig.default === 'sync') {
      const instance = new this(data);
      await instance.handle();
      return;
    }

    const queue = QueueManager.createQueue('default');
    const filePath = path.relative(process.cwd(), require.resolve(`../jobs/${this.name}.js`));
    console.log(`filePath`, filePath);
    await queue.add(data, filePath);
  }
}

module.exports = BaseJob;
