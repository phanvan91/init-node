const db = require('../../../app/models/index');
const User = db.User;
const Container = require('./../../../providers/Container');

class AccountController {

  constructor () {
    // this.accountService = Container.make('AccountService');
  }

  index = async (req, res, next) => {
    let data = {
      ...req.query
    }

    let device = await User.findAll();
    // ExampleJob.dispatch(data);
    res.send(device);
  }

  create(req, res) {
    console.log(req.body, req.query, req.files);
    res.send('AccountController show');
  }
}

module.exports = new AccountController();