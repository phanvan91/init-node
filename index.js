require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT || 9000;
const { sequelize } = require('./models'); // ← import Sequelize instance

sequelize.authenticate()
    .then(() => {
        console.log('✅ MySQL Connected Successfully!');
    })
    .catch((err) => {
        console.error('❌ Unable to connect to the database:', err);
    });


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const apiRouter = require('./routers/api');
const {route} = require("express/lib/router");
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})