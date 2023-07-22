const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Cascade delete posts when a user is deleted
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Cascade delete posts when the associated user is deleted
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE', // Cascade delete comments when a post is deleted
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE', // Cascade delete comments when the associated post is deleted
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Cascade delete comments when a user is deleted (optional, depending on your requirements)
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Post, Comment };