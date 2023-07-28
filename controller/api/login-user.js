const router = require('express').Router();
const { User } = require('../../model');

router.get('/', async (req,res) => {
    try {
      res.status(200).render('login');
    } catch (err) {
      res.status(400).json(err)
    }
  });
  
  // Login for user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ //finding data where data passed in is equal to at least one user
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    if (!dbUserData) { //if not found an error is written in json
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;