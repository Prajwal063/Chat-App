const express = require('express');
const router = express.Router();

//to load the root when the website is launched => further in server/index.js
router.get("/", (req, res) => {
  res.send('server is up and running')
});

// get all users

module.exports = router;