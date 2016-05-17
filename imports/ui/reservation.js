import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Rooms } from '../api/rooms.js';
import { Reservations } from '../api/reservations.js';


import './reservation.html';

Template.reservation.onCreated(function reservationOnCreated() {
  Meteor.subscribe('query');
//  this.counter = new ReactiveVar(0);
});

Template.reservation.helpers({
'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('Reservation');
      if(playerId == selectedPlayer){
          return "selected"
}},
});

/*
isowner for comparing reservation and room titles
pass isowner in rendering each reservation template
in template pass isowner for amount (how to access type of room)
*/



Template.reservation.events({
  'click .selectRe'(event, template){
    event.preventDefault();
      var asdf = this._id;
      Session.set('Reservation', asdf);
      $('#datestart').datepicker('setDate', this.datestart)
      $('#dateend').datepicker('setDate', this.dateend)

  },
  'click .deleteRe'(event, template) {
    event.preventDefault();
    var reservationId = this._id
    console.log("deleteLog//",this._id);
    Meteor.call('reservations.remove', reservationId);
  },
  'click .updateRe'(event, template) {
    event.preventDefault();
    var reservationId = this._id;
    var datestart = Session.get('StartDate');
    var dateend = Session.get('EndDate');

    if (Session.get(this.title) > 0) {
      Meteor.call('reservations.update', reservationId, dateend, datestart)
    } else {alert("room at max capacity")}
  },
  });
