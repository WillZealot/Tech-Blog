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
      posts, loggedIn: req.session.loggedIn
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
          attributes: ['comment_content', 'user_id'],
          order: [[ 'created_at', 'DESC']], 
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User, // Include the User model to get the name of the poster
          attributes: ['name'],
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

//creating a comment
router.post('/post/:post_id', async (req, res) => {
  try {
    const { post_id } = req.params;
    const { comment_content } = req.body;

    // Create a new comment in the database using Sequelize
    const newComment = await Comment.create({
      post_id,
      comment_content: comment_content,
      user_id : req.session.userId,
      user: user_id.name
    });

    // You can send back the new comment as a JSON response if needed
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;