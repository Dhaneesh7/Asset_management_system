// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// models/Vendor.js
module.exports = (sequelize, DataTypes) =>sequelize.define('Branch', {
  name: { type: DataTypes.STRING, allowNull: false },
  location: DataTypes.STRING,
  code: { type: DataTypes.STRING, unique: true },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
  tableName: 'branches',
});

// module.exports = Branch;

