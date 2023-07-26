const router = require('express').Router();
const { Post, Comment, User } = require('../model');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all post for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id','comment_content',],
          include: [
            {model: User,
              attributes: ['name']}
          ]
        },
        {
          model: User,
          attributes: ['name']
        }
      ],
    });

    const posts = postData.map((post) => 
      post.get({plain: true})
      );

    res.render('homepage',{
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            'comment_content',
            'user_id',
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;