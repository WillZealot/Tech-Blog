const router = require('express').Router();
// const { Post } = require('../../models');

// The `homepage endpoint`

router.get('/', async (req, res) => {
  try {
    render.status(200).json(homeStuff);
  } catch (err) {
    res.status(500).json(err);
  }
});

//aye buddy get up in here and get it to route to the homepage aight
//when this hits generate the homepage view