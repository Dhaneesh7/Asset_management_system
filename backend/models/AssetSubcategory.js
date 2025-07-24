// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
const AssetCategory = require('./AssetCategory');
// models/Vendor.js
module.exports = (sequelize, DataTypes) =>sequelize.define('AssetSubcategory', {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: { model: AssetCategory, key: 'id' },
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
  tableName: 'asset_subcategories',
});

// AssetSubcategory.belongsTo(AssetCategory, { foreignKey: 'category_id' });

// module.exports = AssetSubcategory;
