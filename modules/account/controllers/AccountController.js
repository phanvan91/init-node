


class AccountController {
  index(req, res) {
    console.log(1111);
    res.send('AccountController index');
  }

  create(req, res) {
    console.log(req);
    res.send('AccountController show');
  }
}

module.exports = new AccountController();