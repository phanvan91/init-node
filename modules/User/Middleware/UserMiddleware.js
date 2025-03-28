class UserMiddleware {
  handle(req, res, next) {
    // Middleware logic for User
    next();
  }
}

module.exports = new UserMiddleware();