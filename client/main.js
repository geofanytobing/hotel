import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';
import './errors.html';


// Local (client-only) collection
Errors = new Mongo.Collection(null);

Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

throwError = function(message) {
  Errors.insert({message: message});
};

Template.error.onRendered(function() {
 var error = this.data;
 Meteor.setTimeout(function () {
   Errors.remove(error._id);
 }, 3000);
});
