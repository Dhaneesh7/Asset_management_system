// const AssetCategory = require('../models/AssetCategory');
const db= require('../models');
const { AssetCategory } = db;
exports.getAll = async (req, res) => {
  const items = await AssetCategory.findAll();
  res.json(items);
};

exports.create = async (req, res) => {
  const { name, description } = req.body;
  const item = await AssetCategory.create({ name, description });
  res.status(201).json(item);
};
exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  const category = await AssetCategory.findByPk(id);
  if (!category) return res.status(404).json({ message: 'Not found' });
  await category.update({ name, description, status });
  res.json(category);
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  await AssetCategory.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
};
