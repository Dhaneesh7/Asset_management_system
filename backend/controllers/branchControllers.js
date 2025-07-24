// const { Branch } = require('../models/Branch');
const db = require('../models');
const { Branch } = db;
exports.getAll = async (req, res) => {
  const branches = await Branch.findAll();
  res.json(branches);
};

exports.create = async (req, res) => {
  const branch = await Branch.create(req.body);
  res.status(201).json(branch);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const branch = await Branch.findByPk(id);
  if (!branch) return res.status(404).json({ message: 'Not found' });
  await branch.update(req.body);
  res.json(branch);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await Branch.destroy({ where: { id } });
  res.json({ message: 'Deleted' });
};
