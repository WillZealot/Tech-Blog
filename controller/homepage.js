const router = require('express').Router();
const { Post, Comment, User } = require('../model');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all post for homepage
router.get('/',  async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id','comment_content',],
          include: [
            {model: User,
              attributes: ['name'],
              exclude: ['password']}
          ]
        },
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        }
      ],
    });

    const posts = postData.map((post) => 
      post.get({plain: true})
      );
      loggedIn = req.session.loggedIn;

    res.render('homepage',{
      posts, loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;