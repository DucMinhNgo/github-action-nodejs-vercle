var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource users');
  res.json({ name: 'Dustin pro 1' });
});

module.exports = router;
