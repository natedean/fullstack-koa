var fs = require('co-fs');

module.exports = function* (next){
  this.type = 'text/html';
  this.body = yield fs.readFile('./views/angular-people.html');
};