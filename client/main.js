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
