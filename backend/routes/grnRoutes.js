const express= require('express');
const router = express.Router();
const grn= require('../controllers/grnConrollers');
router.get('/', grn.getGRNs);
router.post('/', grn.createGRN);
router.get('/:id', grn.getGRNById);
router.delete('/:id', grn.deleteGRN);
router.put('/:id', grn.updateGRN);
module.exports = router;
