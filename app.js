var app = require('koa')();
var router = require('koa-router')();
var fs = require('co-fs');
var parse = require('co-body');
var mongo = require('koa-mongo');
var moment = require('moment');

app.use(mongo({
  uri: 'mongodb://localhost/simple',
  max: 100,
  min: 1,
  timeout: 30000,
  log: false
}));

var PORT = process.env.PORT || 3000;

router.get('/', function* (next){
  this.type = 'text/html';
  this.body = yield fs.readFile('./index.html');
});

router.post('/add-person', function* (next){
  var body = yield parse(this);

  yield this.mongo.db('simple').collection('people').insert({
    firstName:body.firstName,
    lastName:body.lastName,
    email:body.email,
    date: moment().format("dddd, MMMM Do YYYY, h:mm a")
  });

  var peopleCollection = this.mongo.db('simple').collection('people');
  var people = yield peopleCollection.find({}).toArray();

  this.body = people;
});

app.use(router.routes());

app.listen(PORT, function(){
  console.log('App running at ' + PORT);
});
