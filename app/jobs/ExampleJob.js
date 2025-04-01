const BaseJob = require(global.basejob);

class ExampleJob extends BaseJob {

  constructor(data) {
    super();
    this.data = data;
  }

  async handle() {
    console.log('📩 Processing ExampleJob:', this.data);
  }
}

module.exports = ExampleJob;
