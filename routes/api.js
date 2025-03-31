const express = require('express');
const apiRouter = express.Router();
const validate = require('../middlewares/validateRequest');
const UserRequest = require('../app/http/requests/UserRequest');

const AccountController = require('../modules/account/controllers/AccountController');
apiRouter.get('/users', AccountController.index);
apiRouter.post('/users',validate(UserRequest), AccountController.create);

module.exports = apiRouter;