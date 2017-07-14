import { Meteor } from 'meteor/meteor';
import { JsonRoutes } from 'fine-rest';

Meteor.startup(() => {
  JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  });

  // code to run on server at startup
  JsonRoutes.Middleware.use(function(req, res, next) {

    if(true) {
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

  JsonRoutes.Middleware.use(function(err, req, res, next) {
    console.log("Error found", err)
  });

  JsonRoutes.add('GET', '/test-route/', function(req, res, next) {
    JsonRoutes.sendResult(res, {
      data: {
        result: "OK"
      }
    });
  });
});
