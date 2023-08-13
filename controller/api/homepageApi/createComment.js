const router = require('express').Router();
const { Comment } = require('../../../model');
const withAuth = require('../../../utils/auth');

//creating a comment
router.post('/post/:post_id', withAuth, async (req, res) => {
    try {
      const { post_id } = req.params;
      const { comment_content } = req.body;
  
      // Create a new comment in the database using Sequelize
      const newComment = await Comment.create({
        post_id,
        comment_content: comment_content,
        user_id : req.session.userId
      });
  
      // You can send back the new comment as a JSON response if needed
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;