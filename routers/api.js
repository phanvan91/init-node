const express = require('express');
const apiRouter = express.Router();

const AccountController = require('../modules/account/controllers/AccountController');
apiRouter.get('/users', AccountController.index);
apiRouter.post('/users', AccountController.create);

module.exports = apiRouter;