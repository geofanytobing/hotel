import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';
import { Reservations } from '../api/reservations.js';
//import { Errors } from '
import './room.html';

Template.room.onCreated(function () {
//  this.subscribe('query');
this.subscribe('reservations')
this.subscribe('rooms')
});
//http://guide.meteor.com/data-loading.html#pagination
Template.room.events({
  'click .make'(event, template) {
    event.preventDefault();
      //https://github.com/mizzao/meteor-timesync
      //https://forums.meteor.com/t/createdat-and-documents/6627/14

    //var alert = template.find('#alert');
    //$(alert).hide();
    var booking = {
      start: Session.get("StartDate"),
      end: Session.get("EndDate"),
      login: this.userId
    };

    var errors = validateBooking(booking);
    if (errors.start || errors.end || errors.login)
      return Session.set('Errors', errors);

    Meteor.call('reservations.insert', /* for mail Meteor.user().emails[0].address */ function (error, result)
      {
          if (error) {
            return throwError(error.reason);
          //  $(alert).show()
          //  $(alert).html(error.error)
          } else {
            // success
          }
        });
  },
  'click .delete'() {
    var a = confirm("Are you trying to delete a room?")
    var b = confirm("think again, really?")
    if (a == true) {if (b == true){Meteor.call('rooms.remove', this._id, Meteor.user());}}
  },
});

Template.room.helpers({
  counter() {
    var title = this.title
    var enddate = Session.get('EndDate')
    Meteor.call('rooms.grid', this, enddate, Session.get("StartDate"), function (error, result) {
      //Template.instance().feckinHell.set(result.reservations.length)
      Session.set(title, result)
      //project or aggregat the array
      //results.reservations.length
    })
    return Session.get(title)
  },

    //Session variables from calendar are global
    //find array of availability
/*    var foo = Session.get("EndDate")
    var bull = Session.get("StartDate")
    // roomsId,
    var x = Rooms.find({'reservations.dateend': {$gte: bull}, 'reservations.datestart': {$lte: foo}}).count(); //number of peple u're sharing hotel with
    //template.feckinHell.set(this.amount - Rooms.find({'reservations.dateend': {$gte: Session.get("StartDate")}, 'reservations.datestart': {$lte: Session.get("StartDate")}}).count())
  //  this.counter.get(this.counter.set(this.amount - (y - x)));
    return Template.instance().feckinHell.get()
  }, */
/*
  recursive

    find < stardate session
*/
});
