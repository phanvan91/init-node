const apiRouter = require('../routes/api');
const express = require('express');
const Kernel = require('./../app/http/Kernel');
module.exports = class RouteServiceProvider {
  constructor(app) {
    this.app = app;
  }

  async register() {
    Kernel.global.forEach((middleware) => middleware(this.app));
    this.app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    const apiGroup = express.Router();
    Kernel.api.forEach((middleware) => middleware(apiGroup));
    apiGroup.use('/', apiRouter);
    this.app.use('/api', apiGroup); // 👈 mount vào /api

    this.app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    });
    console.log('📡 RouteServiceProvider Registered');
  }
}