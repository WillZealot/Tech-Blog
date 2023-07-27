const router = require('express').Router();
const { User } = require('../model');

router.get('/', async (req,res) => {
    try {
      const userData = await Session.findAll({
      });

      const loggedInUser = await User.findOne({ where: { id: userData.sid }, include: [{
        model: 'post',
        attribute: ''
      }] });
  
      res.status(200).render('dashboard',{ loggedInUser});
    } catch (err) {
      res.status(400).json(err)
    }
  
  
  });


module.exports = router;