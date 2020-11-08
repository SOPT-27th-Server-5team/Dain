var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/ranking', require('./ranking'));
router.use('/society', require('./society'));
router.use('/members', require('./members'));

/* GET home page. 초기 설정시에 있는 코드인데 놔둬도 상관 없다. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;