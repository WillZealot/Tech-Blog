const sequelize = require('../config/connection');
const { User, Post } = require('../model');

const userData = require('./userData.json');
const userPosts = require('./UserPosts.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Post.bulkCreate(userPosts, {
    individualHooks: true,
    returning: true,
  });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();