const router = require('express').Router();
const { User } = require('../../model');

router.get('/', async (req,res) => {
    try {
      const userData = await User.findAll({
      });
  
      res.status(200).render('login',{ userData});
    } catch (err) {
      res.status(400).json(err)
    }
  
  
  });


module.exports = router;