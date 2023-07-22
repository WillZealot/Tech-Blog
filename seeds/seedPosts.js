const sequelize = require('../config/connection');
const { Post } = require('../models');

const userData = require('./userPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Post.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();