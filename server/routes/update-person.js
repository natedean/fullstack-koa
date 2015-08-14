var parse = require('co-body');

module.exports = function* (next){
  var body = yield parse(this);

  var peopleCollection = this.mongo.db('simple').collection('people');

  yield peopleCollection.update({

  },{ firstName: 'TODO.....',
      lastName:body.lastName,
      email:body.email,
      dateAdded: new Date(),
      quality: undefined
  });

  var people = yield peopleCollection.find({}).toArray();

  this.body = people;

  //this.redirect('/angular-people');
  this.body = 'Successfully updated record!';
};