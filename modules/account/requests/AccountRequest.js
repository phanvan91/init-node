class AccountRequest {
  validate(req, res, next) {
    // Validate logic for Account
    next();
  }
}

module.exports = new AccountRequest();