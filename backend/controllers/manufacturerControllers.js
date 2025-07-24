// const { Manufacturer } = require('../models/Manufacturer');
const db = require('../models');
const { Manufacturer } = db;
exports.getAll = async (req, res) => {
  const list = await Manufacturer.findAll();
  res.json(list);
};

exports.create = async (req, res) => {
  const manufacturer = await Manufacturer.create(req.body);
  res.status(201).json(manufacturer);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const manufacturer = await Manufacturer.findByPk(id);
  if (!manufacturer) return res.status(404).json({ message: 'Not found' });
  await manufacturer.update(req.body);
  res.json(manufacturer);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Manufacturer.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
};
