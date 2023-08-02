const router = require('express').Router();
const { User } = require('../../model');


router.get('/', async (req,res) => {
  try {
    res.status(200).render('signup');
  } catch (err) {
    res.status(400).json(err)
  }


});


// CREATE new user
router.post('/', async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    await User.create(newUserData);

    req.session.save(() => {
      req.session.loggedIn = false;

      res.status(200).render('login');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;