const express = require('express');
const apiRouter = express.Router();
const validate = require('../middlewares/validateRequest');
const UserRequest = require('../app/http/requests/UserRequest');
const AccountController = require('../modules/account/controllers/AccountController');
const authMiddleware = require('../middlewares/auth');

apiRouter.get('/users', AccountController.index);
apiRouter.post('/users', validate(UserRequest), AccountController.create);
const JWTCore = require('../app/auth/JWTCore');

apiRouter.post('/login', (req, res) => {
  const user = {
    id: 1,
    name: 'PhanVan',
    test: "12356773423432i42394890328490328409328094832084",
    create_at: '2025-01-01 00:00:00',
    update_at: '2025-01-01 00:00:00'
  };
  const token = JWTCore.sign(user);
  res.json({token});
});

apiRouter.get('/verify', authMiddleware, (req, res) => {

  res.json({message: 'Token verified!', user: req.user});
});

module.exports = apiRouter;