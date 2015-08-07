var app = require('koa')();
var router = require('koa-router')();
var fs = require('co-fs');
var mongo = require('koa-mongo');

app.use(mongo({
  uri: 'mongodb://localhost/simple',
  max: 100,
  min: 1,
  timeout: 30000,
  log: false
}));

var PORT = 3000;

router.get('/', function* (next){
  this.body = yield this.mongo.db('simple').collection('people').findOne();
});

app.use(router.routes());

app.listen(PORT, function(){
  console.log('App running at ' + PORT);
});
