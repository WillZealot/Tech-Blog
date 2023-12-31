const router = require('express').Router();
const { User, Post} = require('../model');
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

module.exports = router;