import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.webapi = new ReactiveVar('');
});

Template.hello.helpers({
  result() {
    return Template.instance().webapi.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Meteor.call('test', function (error, result) {
      if (error) throw new Meteor.Error(error);
      console.log(`browswer side, results from web-api: ${JSON.stringify(result)}`)
      // instance().webapi.set(JSON.stringify(result));
    });
  }
});
