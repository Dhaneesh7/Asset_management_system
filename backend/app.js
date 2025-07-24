const express = require('express');
const cors = require('cors');
require('dotenv').config();
const grnRoutes = require('./routes/grnRoutes');
const assetCategoryRoutes = require('./routes/assetCategoryRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const branchRoutes = require('./routes/branchRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const assetSubCategoryRoutes = require('./routes/assetSubCategoryRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/asset-categories', assetCategoryRoutes);
app.use('/api/v1/grns', grnRoutes);
app.use('/api/v1/manufacturers', manufacturerRoutes);
app.use('/api/v1/branches', branchRoutes);
app.use('/api/v1/vendors', vendorRoutes);
app.use('/api/v1/asset-subcategories', assetSubCategoryRoutes);
app.get('/', (req, res) => {
  res.send('Asset Management API');
});

module.exports = app;
