var app = require('koa')();
var mongo = require('koa-mongo');
var serve = require('koa-static');
var router = require('./server/routes');

var PORT = process.env.PORT || 3000;

app.use(mongo({
  uri: 'mongodb://localhost/simple',
  max: 100,
  min: 1,
  timeout: 30000,
  log: false
}));

app.use(serve('./public'));

app.use(router.routes());

app.listen(PORT, function(){
  console.log('App running at ' + PORT);
});
