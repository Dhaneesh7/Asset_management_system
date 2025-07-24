// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
// models/Vendor.js
module.exports = (sequelize, DataTypes) =>sequelize.define('Vendor', {
  name: { type: DataTypes.STRING, allowNull: false },
  contact_person: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  gst_number: DataTypes.STRING,
}, {
  timestamps: true,
  tableName: 'vendors',
});

// module.exports = Vendor;
