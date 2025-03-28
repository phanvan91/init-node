
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const apiRouter = require('./routers/api');

class AppServer {
    constructor() {
        this.app = express();
        this.port = process.env.APP_PORT || 9000;
    }

    async init() {
        await this.connectDatabase();
        this.middlewares();
        this.routes();
        this.listen();
    }

    async connectDatabase() {
        try {
            await sequelize.authenticate();
            console.log('✅ MySQL Connected Successfully!');
        } catch (err) {
            console.error('❌ Unable to connect to the database:', err.message);
            process.exit(1);
        }
    }

    middlewares() {
        this.app.use('/api', express.json());
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        this.app.use('/api', apiRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server is running on port ${this.port}`);
        });
    }
}

const server = new AppServer();
server.init();
