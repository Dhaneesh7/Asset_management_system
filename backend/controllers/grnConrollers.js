// const { GrnHeader } = require('../models/GRNHeader');
// // const { GrnLineItem } = require('../models/GRNLineItem');
const db = require('../models');
const { GRNHeader, GRNLineItem } = db;
const generateGRNNumber = require('../utils/grnNumber');
const { Sequelize } = require('sequelize');

// exports.createGRN = async (req, res, next) => {
//   const t = await GRNHeader.sequelize.transaction();
  
//   try {
//     const {
//       grn_date,
//       invoice_number,
//       vendor_id,
//       branch_id,
//       line_items
//     } = req.body;
// const vendor = await db.Vendor.findByPk(vendor_id);
// if (!vendor) {
//   await t.rollback();
//   return res.status(400).json({ error: `Vendor ${vendor_id} not found.` });
// }
// const branch = await db.Branch.findByPk(branch_id);
// if (!branch) {
//   await t.rollback();
//   return res.status(400).json({ error: `Branch ${branch_id} not found.` });
// }


//     const grn_number = await generateGRNNumber();

//     const grnHeader = await GRNHeader.create({
//       grn_number,
//       grn_date,
//       invoice_number,
//       vendor_id,
//       branch_id
//     }, { transaction: t });

//     const grnLineItems = line_items.map(item => ({
//       ...item,
//       grn_id: grnHeader.id,
//       taxable_value: item.quantity * item.unit_price,
//       total_amount: (item.quantity * item.unit_price) + 
//                     ((item.quantity * item.unit_price) * (item.tax_percent / 100))
//     }));
// console.log('Inserting line items:', grnLineItems);
// console.log('GRN header id:', grnHeader.id);
// const subIds = grnLineItems.map(i => i.subcategory_id);
// const validCount = await db.AssetSubcategory.count({ where: { id: subIds } });
// if (validCount !== subIds.length) {
//   await t.rollback();
//   return res.status(400).json({ error: 'Invalid subcategory_id provided.' });
// }


//     await GRNLineItem.bulkCreate(grnLineItems, { transaction: t });

//     await t.commit();
//     res.status(201).json({ message: 'GRN created', grn_number });
//   } catch (err) {
//       console.error('Create GRN error:', {
//     message: err.message,
//     sql: err.sql,
//     original: err.original
//   });
//     await t.rollback();
//     next(err);
//   }
// };

// exports.getGRNs = async (req, res, next) => {
//   try {
//     const grns = await GRNHeader.findAll({
//       include: [{ model: GRNLineItem }],
//       order: [['createdAt', 'DESC']]
//     });
//     res.json(grns);
//   } catch (err) {
//     next(err);
//   }
// };
exports.createGRN = async (req, res, next) => {
  const t = await GRNHeader.sequelize.transaction();
  try {
    const { grn_date, invoice_number, vendor_id, branch_id, line_items } = req.body;

    // Validate vendor & branch
    const vendor = await db.Vendor.findByPk(vendor_id);
    if (!vendor) return t.rollback() && res.status(400).json({ error: `Vendor ${vendor_id} not found.` });
    const branch = await db.Branch.findByPk(branch_id);
    if (!branch) return t.rollback() && res.status(400).json({ error: `Branch ${branch_id} not found.` });

    // Generate GRN number
    const grn_number = await generateGRNNumber();
    console.log({
    grn_number,
    grn_date,
    invoice_number,
    vendor_id,
    branch_id,
});

    // Create header
    const grnHeader = await GRNHeader.create({ grn_number, grn_date, invoice_number, vendor_id, branch_id }, { transaction: t });

    // Prepare and validate items
    const items = line_items.map(item => ({
      ...item,
      grn_id: grnHeader.id,
      taxable_value: item.quantity * item.unit_price,
      total_amount: (item.quantity * item.unit_price) * (1 + item.tax_percent / 100),
    }));

    const subIds = items.map(i => i.subcategory_id);
    const validSubCount = await db.AssetSubcategory.count({ where: { id: subIds } });
    if (validSubCount !== items.length) {
      await t.rollback();
      return res.status(400).json({ error: 'One or more subcategory IDs are invalid.' });
    }

    // Insert line items
    await GRNLineItem.bulkCreate(items, { transaction: t });

    await t.commit();
    return res.status(201).json({ message: 'GRN created', grn_number });

  } catch (err) {
    console.error('Create GRN error:', err.original || err);
    await t.rollback();
    return next(err);
  }
};

exports.getGRNs = async (req, res, next) => {
  try {
    const grns = await GRNHeader.findAll({
      include: [{ model: GRNLineItem }],
      order: [['createdAt', 'DESC']],
    });
    return res.json(grns);
  } catch (err) {
    return next(err);
  }
};
exports.getGRNById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const grn = await GRNHeader.findByPk(id, {
      include: [{ model: GRNLineItem }],
    });
    if (!grn) return res.status(404).json({ error: 'GRN not found' });
    return res.json(grn);
  } catch (err) {
    console.error('Get GRN by ID error:', err);
    return next(err);
  }
}
exports.deleteGRN = async (req, res, next) => {
  const { id } = req.params;
  const t = await GRNHeader.sequelize.transaction();
  try {
    const grn = await GRNHeader.findByPk(id);
    if (!grn) return res.status(404).json({ error: 'GRN not found' });

    // Delete line items first
    await GRNLineItem.destroy({ where: { grn_id: id }, transaction: t });

    // Then delete the header
    await grn.destroy({ transaction: t });

    await t.commit();
    return res.json({ message: 'GRN deleted successfully' });
  } catch (err) {
    console.error('Delete GRN error:', err);
    await t.rollback();
    return next(err);
  }
};
exports.updateGRN = async (req, res, next) => {
  const { id } = req.params;
    const { grn_date, invoice_number, vendor_id, branch_id, line_items=[] } = req.body;
  const t = await GRNHeader.sequelize.transaction();
try {
    // Validate vendor & branch
    const vendor = await db.Vendor.findByPk(vendor_id);
    if (!vendor) return t.rollback() && res.status(400).json({ error: `Vendor ${vendor_id} not found.` });
    const branch = await db.Branch.findByPk(branch_id);
    if (!branch) return t.rollback() && res.status(400).json({ error: `Branch ${branch_id} not found.` });

    // Find existing GRN header
    const grnHeader = await GRNHeader.findByPk(id);
    if (!grnHeader) {
      await t.rollback();
      return res.status(404).json({ error: 'GRN not found' });
    }
    // Update header
    await grnHeader.update({ grn_date, invoice_number, vendor_id, branch_id }, { transaction: t });

    const itemsArray = Array.isArray(line_items) ? line_items : [];
    // Prepare and validate items
    const items = itemsArray.map(item => ({
      ...item,
      grn_id: id,
      taxable_value: item.quantity * item.unit_price,
      total_amount: (item.quantity * item.unit_price) * (1 + item.tax_percent / 100),
    }));

    const subIds = items.map(i => i.subcategory_id);
    const validSubCount = await db.AssetSubcategory.count({ where: { id: subIds } });
    if (validSubCount !== items.length) {
      await t.rollback();
      return res.status(400).json({ error: 'One or more subcategory IDs are invalid.' });
    }

    // Delete existing line items and insert new ones
    await GRNLineItem.destroy({ where: { grn_id: id }, transaction: t });
    await GRNLineItem.bulkCreate(items, { transaction: t });

    await t.commit();
    return res.json({ message: 'GRN updated successfully' });

  } catch (err) {
    console.error('Update GRN error:', err);
    await t.rollback();
    return next(err);
  }
}