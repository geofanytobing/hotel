import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
//import { TAPi18n.Collection } from 'meteor/tap:i18n-db';


export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('secrets', function (group) {
    if (Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)) {

      return Meteor.secrets.find({group: group});

    } else {

      // user not authorized. do not publish secrets
      this.stop();
      return;

    }
  });
  Meteor.publish( 'users', function() {
    let isAdmin = Roles.userIsInRole( this.userId, 'admin' );

    if ( isAdmin ) {
      return [
        Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } ),
      //  Invitations.find( {}, { fields: { "email": 1, "role": 1, "date": 1 } } )
      ];
    } else {
      return null;
    }
  });

  Meteor.publish('rooms', function () {
    return Rooms.find({},
      {fields: {'reservations.owner': 0}}
    );
  });


Meteor.publish('query', function () {
  return Rooms.find({
    /*
    return Rooms.aggregate([
      { $match: {profile: {reservation: { datestart: {$mt{new Date}}}}},
      { $sort: { datestart: 1} }
      //group follows $field syntax, datestart is embedded
      { $group: {id: this.userId, datestart: { $push: $datestart}}}}
      { $out: "<output-collection>" }
      */
  });
});
}


Meteor.methods({
  'rooms.insert'(title, amount, ru, kz) {

  var id = Rooms.insert({
      title,
      amount,/*
      i18n: {
          ru: {
            title: ru
          },
          kz: {
            title: kz
          },
    }*/})
  },
/*
    id = Rooms.insertTranslations({born: 1856, name: "Nikola Tesla"}, {
      zh: {
          name: "尼古拉·特斯拉"
      }
  });*/


  'rooms.remove'(roomId) {

    Rooms.remove(roomId);
  },
});
