const globalMiddleware = require('../middleware/global');
const apiMiddleware = require('../middleware/api');

module.exports = {
  global: [
    globalMiddleware,
  ],
  api: [
    apiMiddleware
  ],
};
