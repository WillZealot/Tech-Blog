const router = require('express').Router();
const { Post } = require('../../../model');

router.post('/createpost', async (req, res) => {
  try {
    const newPost = {
      user_id: req.session.userId,
      title: req.body.title,
      content: req.body.content,
    };

    await Post.create(newPost);

    res.status(200).redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
