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
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//creating a comment
router.post('/post/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId); // Find the post by its ID

    if (!post) {
      // Handle the case where the post is not found
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      user_id: req.session.userId,
      comment_content: req.body.content,
    };

    // Assuming you have a Comment model and want to associate the comment with the post
    const createdComment = await post.createComment(newComment);

    // Retrieve the post data as plain object
    const plainPost = post.get({ plain: true });

    res.render('single-post', {
      post: plainPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;