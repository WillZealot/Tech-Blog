const router = require('express').Router();
const { Post, Comment, User } = require('../../../model');

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ['comment_content', 'user_id'],
            order: [[ 'created_at', 'DESC']], 
            include: [
              {
                model: User,
                attributes: ['name'],
                exclude: ['password']
              },
            ],
          },
          {
            model: User, // Include the User model to get the name of the poster
            attributes: ['name'],
            exclude: ['password']
          },
        ],
      });
  
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;