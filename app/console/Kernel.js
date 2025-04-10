const TestCron = require('./schedules/TestCronJob');


class Kernel {
  constructor(app) {
    this.app = app;
  }

  schedule() {
    console.log('Scheduling jobs...');
    // 🧹 Job dọn log chạy mỗi 5 phút
    TestCron.schedule('*/1 * * * *');

    // 📊 Job báo cáo chạy mỗi ngày lúc 00:00
    // DailyReportJob.schedule('0 0 * * *');
  }
}

module.exports = Kernel;