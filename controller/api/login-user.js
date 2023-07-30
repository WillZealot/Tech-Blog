const router = require('express').Router();
const { User, Post } = require('../../model');

router.get('/', async (req, res) => {
  try {
    res.status(200).render('login');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login for user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: {
        model: Post,
        attributes: ["title", "content", "date_created"]
      }
    });

    const loggedUser = dbUserData.get({plain: true});
    console.log(loggedUser)

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).render('dashboard', { loggedUser, loggedIn: true });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;