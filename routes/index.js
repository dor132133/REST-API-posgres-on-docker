var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/api/v1/persons/age=:age',db.getPersonsByAge);
router.post('/api/v1/persons/',db.addPerson);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dor - REST API' });
});

module.exports = router;
