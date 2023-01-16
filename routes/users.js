var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource users');
  res.json({ name: 'Dustin pro nodemon jenkins tada trigger have push.' });
});

module.exports = router;
