// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// models/Vendor.js
module.exports = (sequelize, DataTypes) =>  sequelize.define('Manufacturer', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.STRING,
}, {
  timestamps: true,
  tableName: 'manufacturers',
});

// module.exports = Manufacturer;
