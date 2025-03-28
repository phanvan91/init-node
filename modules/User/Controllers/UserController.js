const UserService = require('../Services/UserService');

class UserController {

  async index(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  show(req, res) {
    res.send('UserController show');
  }
}

module.exports = new UserController();