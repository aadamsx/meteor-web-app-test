import { Meteor } from 'meteor/meteor';
import { JsonRoutes } from '../fine-rest/json-routes';
// import { JsonRoutes } from 'fine-rest';

import { Person } from '../imports/server/people';

Meteor.startup(() => {
  JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  });

  // code to run on server at startup
  JsonRoutes.Middleware.use('/api', (req, res, next) => {
    console.log('inside middleware!');

    const authUserId = req.userId;
    console.log(`authUserId: ${authUserId}`);
    if (!authUserId) {
      JsonRoutes.sendResult(res, {
        code: 401,
        data: {
          result: "ERROR"
        }
      });
      next(new Error("unauthorized"));
      return;
    }
    next();
  });

  JsonRoutes.Middleware.use((err, req, res, next) => {
    console.log("Error found in middleware!", err);
  });

  JsonRoutes.add('POST', '/test-route/', (req, res, next) => {
    console.log('in test-route');
    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        result: "OK"
      }
    });
  });

  JsonRoutes.add('POST', '/api/test-route2/', (req, res, next) => {
    debugger;
    console.log('in test-route2');

    const passedInUserId = req.body.userId || null; // passedInUserId
    const passedInDbId = req.body.dbId || null; //
    const authUserId = req.userId || null; // The authenticated user's ID will be set by this middleware
    const authToken = req.authToken || null; // A valid login token for a Meteor.user account (requires accounts-base)
    const user = Meteor.users.findOne({ '_id': passedInUserId });
    const person = new Person(passedInUserId, passedInDbId);

    JsonRoutes.sendResult(res, {
      code: 200,
      data: {
        result: "OK",
        person: {
          first: person.First,
          middle: person.Middle,
          last: person.Last,
          gender: person.Gender
        }
      }
    });
  });

});
