const globalMiddleware = require('../../middlewares/global');
const apiMiddleware = require('../../middlewares/api');

module.exports = {
  global: [
    globalMiddleware,
  ],
  api: [
    apiMiddleware,
  ],
};
