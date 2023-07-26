const sequelize = require('../config/connection'); //importing sequelize connection
const { User, Post, Comment } = require('../model');

const userData = require('./userData.json');
const userPosts = require('./UserPosts.json')
const UserComments = require('./UserComments')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(userPosts, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(UserComments, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();