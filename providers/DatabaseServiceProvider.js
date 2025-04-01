const {sequelize} = require('../models');

module.exports = class DatabaseServiceProvider {
  constructor(app) {
    this.app = app;
  }

  async register() {
    try {
      await sequelize.authenticate();
      console.log('✅ MySQL Connected Successfully!');
      this.app.locals.db = sequelize;
    } catch (err) {
      console.error('❌ Unable to connect to the database:', err.message);
      // process.exit(1); // Có thể để đây cho production
    }
  }
}