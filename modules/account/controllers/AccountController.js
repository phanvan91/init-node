const HttpException = require('../../../app/exceptions/HttpException');
const ExampleJob = require('../../../app/jobs/ExampleJob');
class AccountController {

  index(req, res, next) {
    let data = {
      ...req.query
    }
    ExampleJob.dispatch(data)
    res.send('AccountController index');
  }

  create(req, res) {
    console.log(req.body, req.query, req.files);
    res.send('AccountController show');
  }
}

module.exports = new AccountController();