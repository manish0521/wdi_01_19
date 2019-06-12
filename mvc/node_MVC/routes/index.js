var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code Immersives' });

    // res.send('Hey from index router!!')
});

module.exports = router;
