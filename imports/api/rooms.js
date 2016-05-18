import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { TAPi18n } from 'meteor/tap:i18n';


export const Rooms = new TAPi18n.Collection('rooms');

if (Meteor.isServer) {
  TAPi18n.publish('rooms', function () {
    return Rooms.i18nFind();
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
  'rooms.insert'(name, number, ruTi, kzTi) {

  Rooms.insert({
      title: name,
      amount: number,
      i18n: {ru: {title: ruTi}, kz: {title: kzTi}}
    })
  },
/*
id = Inventors.insertTranslations({born: 1856, name: "Nikola Tesla"}, {
    zh: {
        name: "尼古拉·特斯拉"
    }
});
Any existing documents can be translated with updateTranslations

Inventors.updateTranslations(id, {
    ru: {
        name: "Ни́кола Те́сла"
    }
})*/


  'rooms.remove'(roomId) {

    Rooms.remove(roomId);
  },
});
