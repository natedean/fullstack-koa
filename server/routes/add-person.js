var parse = require('co-body');
var moment = require('moment');

module.exports = function* (next){
  var body = yield parse(this);

  yield this.mongo.db('simple').collection('people').insert({
    firstName:body.firstName,
    lastName:body.lastName,
    email:body.email,
    dateAdded: moment().format("dddd, MMMM Do YYYY, h:mm a")
  });

  this.redirect('/angular-people');
};