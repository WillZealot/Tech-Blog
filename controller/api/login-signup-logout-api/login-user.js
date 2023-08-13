const router = require('express').Router();
const { User, Post } = require('../../../model');

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
        attributes: ["id", "title", "content", "date_created"]
      }
    });

    if (!dbUserData) {
      res.status(400).json(err)
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json(err)
      return;
    }

    req.session.save(() => {
      
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      res.status(200).redirect('/');
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    res.redirect('/login');
  }
});

module.exports = router;