import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';



export const Reservations = new Mongo.Collection('reservations');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('reservations', function () {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
    if ( isAdmin ) {
    return Reservations.find({}, {})
    } else {
      return Reservations.find({ owner: this.userId });
    }
  });
};

Meteor.methods({
  //https://github.com/meteor/validated-method
  'rooms.grid' (room, foo, bull) {
  //  var foo = Session.get("EndDate");
  //  var bull = Session.get("StartDate");
    // roomsId,
    // room {title, amount, reservations [{id, dateend, datestart}]}
var name = room.title
    //var x = Rooms.find({$and: [{'reservations.dateend': {$gte: bull}}, {'reservations.datestart': {$lte: foo}}]}).fetch();
var x = Reservations.find({title: name, dateend: {$gte: bull}, datestart: {$lte: foo}}).count();
console.log("MethodsLog//", x, room);
    return room.amount - x
  },

  'reservations.insert'() {
    if (! this.userId) {
      throw new Meteor.Error('You must login first');
    }
    if (!(Session.get(reservation.title) > 0)) {
      throw new Meteor.Error('Rooms are at capacity');
    }
    var reservation = {
      title: this.title,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      user: Meteor.user(),
      datestart: Session.get('StartDate'),
      dateend: Session.get('EndDate'),
      timestamp: new Date(),
    }
    Reservations.insert(reservation) //maybe session get datestart
  //    timestamp:date

  },
  'reservations.update'(reservationId, dateend, datestart) {
  var id = reservation._id
  Reservations.update(reservationId, {$set: {"dateend": dateend, "datestart": datestart}})
  },
  'reservations.remove'(reservationId, id) {
  Reservations.remove(reservationId);

  },
});
