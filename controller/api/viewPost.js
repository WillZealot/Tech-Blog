const router = require('express').Router();
const { Post, Comment, User } = require('../../model');
const withAuth = require('../../utils/auth');

router.get('/userpost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['comment_content', 'user_id'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render('usersinglepost', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
