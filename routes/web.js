const express = require('express');
const webRouter = express.Router();


webRouter.get('/',(req, res) => {
  res.send('Hello World');
});

module.exports = webRouter; // ✅ export router đúng cách