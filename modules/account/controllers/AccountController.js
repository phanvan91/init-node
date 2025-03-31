const HttpException = require('../../../app/exceptions/HttpException');

class AccountController {
  index(req, res, next) {
    try {
      throw new HttpException('Test Exception', 401);
    } catch (error) {
      next(error); // QUAN TRỌNG: đẩy vào Handler
    }
  }

  create(req, res) {
    console.log(req.body, req.query, req.files);
    res.send('AccountController show');
  }
}

module.exports = new AccountController();