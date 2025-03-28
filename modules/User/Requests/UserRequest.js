class UserRequest {
  validate(req, res, next) {
    // Validate logic for User
    next();
  }
}

module.exports = new UserRequest();