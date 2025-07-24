const db = require('../models');
const { AssetSubcategory } = db;
exports.getAll = async (req, res) => {
    try {
        const items = await AssetSubcategory.findAll({
        include: [{ model: db.AssetCategory, as: 'category' }]
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories', error });
    }
    }
exports.create = async (req, res) => {
    const { name, description, category_id } = req.body;
    try {
        const item = await AssetSubcategory.create({ name, description, category_id });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subcategory', error });
    }
}
exports.update = async (req, res) => {  
    const { id } = req.params;
    const { name, description, status, category_id } = req.body;
    try {
        const subcategory = await AssetSubcategory.findByPk(id);
        if (!subcategory) return res.status(404).json({ message: 'Not found' });
        await subcategory.update({ name, description, status, category_id });
        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subcategory', error });
    }
}
exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        await AssetSubcategory.destroy({ where: { id } });
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subcategory', error });
    }
}
const { AssetCategory } = db;
AssetSubcategory.belongsTo(AssetCategory, { foreignKey: 'category_id', as:
'category' });
AssetCategory.hasMany(AssetSubcategory, { foreignKey: 'category_id', as:    
'subcategories' }); 
module.exports = {
    getAll: exports.getAll,
    create: exports.create,
    update: exports.update,
    remove: exports.remove
};