const User = require('../Models/User');

class UserService {
  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error('Không thể lấy danh sách users: ' + error.message);
    }
  }
}

module.exports = new UserService();
