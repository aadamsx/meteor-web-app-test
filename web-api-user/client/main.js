import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.statusCode = new ReactiveVar(0);
  this.result = new ReactiveVar('');

});

Template.hello.helpers({
  status() {
    return Template.instance().statusCode.get();
  },
  result() {
    return Template.instance().result.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    Meteor.call('testSync', function (error, response) {
      debugger;
      let statusCode = 0;
      let result = '';
      let url = '';
      try {
        if (error) {
          statusCode = error.error;
          result = error.reason;
        }
        else {
          statusCode = response.statusCode;
          result = response.data.result;
        }
      }
      catch (error) {
        statusCode = 0;
        result = 'EXCEPTION';
      }
      finally {
        instance.statusCode.set(statusCode);
        instance.result.set(result);
      }
      // console.log(`browswer side, results from web-api: ${JSON.stringify(result)}`)
    });
  }
});

Accounts.onLogin(user => {
  debugger;
  console.log(`user: ${user}`);

});
