// const { Vendor } = require('../models/Vendor');
const db = require('../models');
const { Vendor } = db;
exports.getAll = async (req, res) => {
  const vendors = await Vendor.findAll();
  res.json(vendors);
};

exports.create = async (req, res) => {
  const vendor = await Vendor.create(req.body);
  res.status(201).json(vendor);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const vendor = await Vendor.findByPk(id);
  if (!vendor) return res.status(404).json({ message: 'Not found' });
  await vendor.update(req.body);
  res.json(vendor);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Vendor.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
};
