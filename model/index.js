const User = require('./user');
const Post = require('./post');
const Comment = require('./Comment');

User.hasMany(Post, {
   foreignKey: 'user_id',
  });

Post.belongsTo(User, { 
  foreignKey: 'user_id',
   onDelete: 'CASCADE', 
  });

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE', // Cascade delete comments when a post is deleted
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
   onDelete: 'CASCADE', 
})

module.exports = { User, Post, Comment };