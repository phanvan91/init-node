const HttpException = require('../../../app/exceptions/HttpException');
const ExampleJob = require('../../../app/jobs/ExampleJob');
const db = require('./../../../models/index');
const Device = db.Device;
const Container = require('./../../../providers/Container');

class AccountController {

  constructor () {
    //this.accountService = Container.make('AccountService');
  }

  index = async (req, res, next) => {
    let data = {
      ...req.query
    }

    let device = await Device.findAll();
    // ExampleJob.dispatch(data);
    res.send(device);
  }

  create(req, res) {
    console.log(req.body, req.query, req.files);
    res.send('AccountController show');
  }
}

module.exports = new AccountController();