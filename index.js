require('dotenv').config();
require('./bootstrap/global');
const express = require('express');
const {sequelize} = require('./models');
const bootstrapProviders = require('./bootstrap/app');
const Kernel = require('./app/http/Kernel');
const Handler = require('./app/exceptions/Handler');

class AppServer {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || 9000;
  }

  async init() {
    await this.providers();
    this.listen();
    this.exceptionHandler();
  }

  async providers() {
    await bootstrapProviders(this.app);
  }

  exceptionHandler() {
    this.app.use(Handler.handle);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server is running on port ${this.port}`);
    });
  }
}

const server = new AppServer();
server.init();
