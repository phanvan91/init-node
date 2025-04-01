class HttpException extends Error {
  constructor(message, status = 500, errors = null) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

module.exports = HttpException;
