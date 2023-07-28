const router = require('express').Router();

// Logout
router.post('/', (req, res) => {

    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
        res.render('homepage');
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;