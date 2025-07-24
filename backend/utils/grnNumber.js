const moment = require('moment');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

// const GRNHeader = require('../models/GRNHeader');
const db = require('../models');
const { GRNHeader } = db;

async function generateGRNNumber() {
//   const prefix = `GRN-${moment().format('YYYYMM')}`;
//   const count = await GRNHeader.count({
//     where: {
//       grn_number: {
//         [Op.like]: `${prefix}-%`,
//       },
//     },
//   });

//   const serial = (count + 1).toString().padStart(3, '0');
//   return `${prefix}-${serial}`;
const today = new Date();
  const year = today.getFullYear();
  const month = (`0${today.getMonth() + 1}`).slice(-2);

  const likePattern = `GRN-${year}${month}-%`;

  const lastEntry = await GRNHeader.findOne({
    where: {
      grn_number: {
        [Sequelize.Op.like]: likePattern
      }
    },
    order: [['createdAt', 'DESC']]
  });

  let nextNumber = 1;

  if (lastEntry) {
    const parts = lastEntry.grn_number.split('-');
    const lastNumber = parseInt(parts[2]);
    nextNumber = lastNumber + 1;
  }

  const padded = String(nextNumber).padStart(3, '0');
  return `GRN-${year}${month}-${padded}`;
}

module.exports = generateGRNNumber;
