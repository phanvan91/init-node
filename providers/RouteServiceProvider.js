const apiRouter = require('../routes/api');

module.exports = class RouteServiceProvider {
  constructor(app) {
    this.app = app;
  }

  async register() {
    // Đăng ký routes
    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });
    this.app.use('/api', apiRouter);
    console.log('📡 RouteServiceProvider Registered');
  }
}