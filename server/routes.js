var router = require('koa-router')();
var fs = require('co-fs');
var parse = require('co-body');
var moment = require('moment');

router.get('/', function* (next){
  this.type = 'text/html';
  this.body = yield fs.readFile('./views/index.html');
});

router.get('/angular-people', function* (next){
  this.type = 'text/html';
  this.body = yield fs.readFile('./views/angular-people.html');
});

router.get('/people', function* (next){
  var peopleCollection = this.mongo.db('simple').collection('people');
  var people = yield peopleCollection.find({}).toArray();

  this.body = people;
});

router.post('/add-person', function* (next){
  var body = yield parse(this);

  yield this.mongo.db('simple').collection('people').insert({
    firstName:body.firstName,
    lastName:body.lastName,
    email:body.email,
    date: moment().format("dddd, MMMM Do YYYY, h:mm a")
  });

  this.redirect('/angular-people');
});

module.exports = router;