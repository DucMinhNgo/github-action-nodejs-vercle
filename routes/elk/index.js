var express = require('express');
var router = express.Router();
var client = require('../../connection/elk');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Elk');
});

module.exports = router;
