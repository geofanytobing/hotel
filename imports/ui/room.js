import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';
import { Reservations } from '../api/reservations.js';

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
    if ( Session.get(this.title) > 0) {
      //https://github.com/mizzao/meteor-timesync
      //https://forums.meteor.com/t/createdat-and-documents/6627/14
    var reservation = {
      title: this.title,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      user: Meteor.user(),
      datestart: Session.get('StartDate'),
      dateend: Session.get('EndDate'),
      timestamp: new Date(),
    }
    console.log(reservation, this._id,Meteor.user())
    Meteor.call('reservations.insert', reservation,/* for mail Meteor.user().emails[0].address */);
  } else {alert("room at max capacity")}
  },
  'click .delete'() {
    Meteor.call('rooms.remove', this._id, Meteor.user());
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
