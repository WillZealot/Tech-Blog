const router = require('express').Router();
const { Post } = require('../model');

// The `homepage endpoint`

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll(req,res);
    res.render('homepage', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

//aye buddy get up in here and get it to route to the homepage aight
//when this hits generate the homepage view