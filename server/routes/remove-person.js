var ObjectId = require('mongodb').ObjectID;

module.exports = function* (next){
  var peopleCollection = this.mongo.db('simple').collection('people');

  yield peopleCollection.remove({ _id: new ObjectId(this.params.id) });

  var people = yield peopleCollection.find({}).toArray();

  console.log('Document supposedly deleted. People.length: ' + people.length);

  this.body = people;
};