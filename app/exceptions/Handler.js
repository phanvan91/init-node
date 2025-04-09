module.exports = class Handler {
  static handle(err, req, res, next) {
    // Validation error
    if (err.status === 422) {
      return res.status(422).json({
        message: err.message || 'The given data was invalid.',
        errors: err.errors || null,
      });
    }

    if (err.status === 401) {
      console.log('❌ [Unauthorized]', {
        message: err.message,
        status: err.status,
        errors: err.errors,
      });
      return res.status(401).json({
        message: err.message || 'Unauthorized',
      });
    }

    // Not Found
    if (err.status === 404) {
      return res.status(404).json({
        message: 'Resource not found',
      });
    }

    // Default: Internal Server Error
    console.error('❌ [Unhandled Error]', err);
    res.status(err.status || 500).json({
      message: 'Internal Server Error',
    });
  }
};
