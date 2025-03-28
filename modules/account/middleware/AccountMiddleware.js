class AccountMiddleware {
  handle(req, res, next) {
    // Middleware logic for Account
    next();
  }
}

module.exports = new AccountMiddleware();