module.exports = (sequelize, DataTypes) => {
  const GRNLineItem = sequelize.define('GRNLineItem', {
    grn_id: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
    item_description: { type: DataTypes.STRING, allowNull: false },
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.FLOAT,
    tax_percent: DataTypes.FLOAT,
    taxable_value: DataTypes.FLOAT,
    total_amount: DataTypes.FLOAT,
  }, {
    timestamps: true,
    tableName: 'grn_line_items',
  });

  GRNLineItem.associate = (models) => {
    models.GRNLineItem.belongsTo(models.GRNHeader, { foreignKey: 'grn_id' });
    models.GRNLineItem.belongsTo(models.AssetSubcategory, { foreignKey: 'subcategory_id' });
  };

  return GRNLineItem;
};
