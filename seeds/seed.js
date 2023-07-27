const sequelize = require('../config/connection'); //importing sequelize connection
const { User, Post, Comment } = require('../model');
const {format_date} = require('../utils/helpers');

const userData = require('./userData.json');
const userPosts = require('./UserPosts.json')
const UserComments = require('./UserComments')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  Post.beforeCreate(async (post, options) => {
    const formatDate = await format_date(post.date_created);
    post.date_created = formatDate;
  });

  await Post.bulkCreate(userPosts, {
    individualHooks: true,
    returning: true,
  });


  Comment.beforeCreate(async (comment, options) => {
    const formatDate = await format_date(comment.date_created);
    comment.date_created = formatDate;
  });


  await Comment.bulkCreate(UserComments, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();