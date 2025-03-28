const express = require('express');
const apiRouter = express.Router();

const UserController = require('../modules/User/Controllers/UserController');

apiRouter.get('/users', UserController.index);

module.exports = apiRouter;