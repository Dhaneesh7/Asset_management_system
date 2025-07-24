const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const Manufacturer       = require('./Manufacturer')(sequelize, Sequelize.DataTypes);
const AssetCategory      = require('./AssetCategory')(sequelize, Sequelize.DataTypes);
const AssetSubcategory   = require('./AssetSubcategory')(sequelize, Sequelize.DataTypes);
const GRNHeader          = require('./GRNHeader')(sequelize, Sequelize.DataTypes);
const GRNLineItem        = require('./GRNLineItem')(sequelize, Sequelize.DataTypes);
const Vendor             = require('./Vendor')(sequelize, Sequelize.DataTypes);
const Branch             = require('./Branch')(sequelize, Sequelize.DataTypes);

const db = { sequelize, Sequelize, Manufacturer, AssetCategory, AssetSubcategory, GRNHeader, GRNLineItem, Vendor, Branch };

// Call static associate methods
Object.values(db).forEach(mdl => {
  if (typeof mdl.associate === 'function') {
    mdl.associate(db);
  }
});

module.exports = db;
