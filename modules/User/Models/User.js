const { DataTypes } = require('sequelize');
const sequelize = require('../../../models').sequelize;

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, {
  tableName: 'users',
  underscored: true
});

module.exports = User;