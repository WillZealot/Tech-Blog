const router = require('express').Router();
const { User, Post, Comment } = require('../model');
const withAuth = require('../utils/auth'); // Import the custom middleware

router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch the user's data and their associated posts from the database using the req.session.userId
    const dbUserData = await User.findOne({
      where: {
        id: req.session.userId, // Use the user ID from the session to find the user
      },
      include: {
        model: Post,
        attributes: ["id","title", "content", "date_created"]
      }
    });

    if (!dbUserData) {
      // If the user ID is not found in the database, handle the response accordingly (e.g., redirect to login page)
      res.render('login'); // Redirect to the login page
      return;
    }

    // Convert the user data to a plain JavaScript object
    const loggedUser = dbUserData.get({ plain: true });

    // Render the 'dashboard' template with the user's data and posts
    res.status(200).render('dashboard', { loggedUser, loggedIn: true });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = {
      user_id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };

    await Post.create(newPost);

    res.status(200).redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/userpost/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    const updatedData = {
      user_id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };

    await post.update(updatedData);

    res.status(200).redirect('/userpost/:id');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "An error occurred while updating the post." });
  }
});

// Use the custom middleware before allowing the user to access the gallery
router.get('/userpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['comment_content', 'user_id'],
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
    res.render('usersinglepost', { post,  loggedIn : req.session.loggedIn});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;