const Container = require('./Container');
const AccountService = require('./../modules/account/services/AccountService');
module.exports = class AppServiceProvider {
  constructor(app) {
    this.app = app;
  }

  async register() {
    // Nơi bạn bind service, middleware global, helper
    this.app.locals.appName = 'Node Laravel';

    //bind service
    Container.singleton('AccountService', () => new AccountService());

    console.log('🔌 AppServiceProvider Registered');
  }
}