const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 MySQL Connected!');
    await sequelize.sync({ alter: true }); // or { force: true } for dev

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ DB Connection Error:', err);
  }
})();
