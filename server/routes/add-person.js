var parse = require('co-body');

module.exports = function* (next){
  var body = yield parse(this);

  yield this.mongo.db('simple').collection('people').insert({
    firstName:body.firstName,
    lastName:body.lastName,
    email:body.email,
    dateAdded: new Date(),
    quality: undefined
  });

  this.redirect('/angular-people');
};