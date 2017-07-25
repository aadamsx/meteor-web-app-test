import { Mongo } from 'meteor/mongo';
import { MongoInternals } from 'meteor/mongo';

// const People = new Mongo.Collection("People");

const database_1 = new MongoInternals.RemoteCollectionDriver(Meteor.settings.database_1);
const People_1 = new Mongo.Collection("People", { _driver: database_1, _suppressSameNameError: true });

const database_2 = new MongoInternals.RemoteCollectionDriver(Meteor.settings.database_2);
const People_2 = new Mongo.Collection("People", { _driver: database_2, _suppressSameNameError: true });

export {
  People_1,
  People_2
}
