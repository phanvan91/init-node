const express = require('express');
const formDataParser = require('./FormDataParser');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(formDataParser);
};
