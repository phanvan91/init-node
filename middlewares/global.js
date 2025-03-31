const express = require('express');
const formDataParser = require('./formDataParser');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(formDataParser);
};
