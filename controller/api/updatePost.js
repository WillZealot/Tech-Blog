const router = require('express').Router();
const { Post } = require('../../model');
const withAuth = require('../../utils/auth');

router.put('/userpost/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows === 0) {
      res.status(404).json({ message: 'No post found' });
      return;
    }

    res.json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the post' });
  }
});

module.exports = router;
