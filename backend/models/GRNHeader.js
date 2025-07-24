module.exports = (sequelize, DataTypes) => {
  const GRNHeader = sequelize.define('GRNHeader', {
    grn_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    grn_date: { type: DataTypes.DATEONLY, allowNull: false },
    invoice_number: { type: DataTypes.STRING, allowNull: false },
 vendor_id: { type: DataTypes.INTEGER, allowNull: false },
branch_id: { type: DataTypes.INTEGER, allowNull: false },

  }, {
    timestamps: true,
    tableName: 'grn_headers',
  });

  GRNHeader.associate = (models) => {
   models.GRNHeader.hasMany(models.GRNLineItem, {
  foreignKey: 'grn_id',
  onDelete: 'CASCADE',
});

models.GRNHeader.belongsTo(models.Vendor, {
  foreignKey: 'vendor_id',
  onDelete: 'RESTRICT',
});

models.GRNHeader.belongsTo(models.Branch, {
  foreignKey: 'branch_id',
  onDelete: 'RESTRICT',
});

  };
  

  return GRNHeader;
};
