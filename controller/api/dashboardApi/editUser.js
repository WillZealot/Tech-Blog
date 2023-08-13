const router = require('express').Router();
const { User } = require('../../../model');
const withAuth = require('../../../utils/auth');
router.put('/edituser', withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(req.body);

    res.json({ message: 'User information updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating user information' });
  }
});

module.exports = router;