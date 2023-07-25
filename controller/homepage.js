const router = require('express').Router();
const { Post } = require('../model');

// The `homepage endpoint`

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['title', 'ASC']],
    });

    // Serialize user data so templates can read it
    const posts = postData.map((project) => project.get({ plain: true }));
    // Pass serialized data into Handlebars.js template
    res.render('homepage', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;