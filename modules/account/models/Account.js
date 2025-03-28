const { DataTypes } = require('sequelize');
const sequelize = require('../../../models').sequelize;

const Account = sequelize.define('Account', {
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  tableName: 'accounts',
  underscored: true
});

module.exports = Account;