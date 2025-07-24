// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// models/Vendor.js
module.exports = (sequelize, DataTypes) => sequelize.define('AssetCategory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
  tableName: 'asset_categories',
});

// module.exports = AssetCategory;
