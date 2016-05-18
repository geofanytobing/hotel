import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';

import './roomsList.html';
import './room.js'

import { Rooms } from '../api/rooms.js';

Template.roomsList.onCreated(function roomsListOnCreated() {
  TAPi18n.subscribe('rooms');
  Meteor.subscribe('query');

});

Template.roomsList.events({
  'submit .new-room'(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var tField = event.target.title;
    var amount = event.target.amount.value;
    var aField = event.target.amount;
    var ru = event.target.ru.value;
    var rField = event.target.ru;
    var kz = event.target.kz.value;
    var kField = event.target.kz;
    Meteor.call('rooms.insert', title, amount, ru, kz);

    //clearsfields for title/amount
    tField.value = '';
    aField.value = '';
    rField.value = '';
    kField.value = '';
  },
});

Template.roomsList.helpers({
  rooms() {
    const instance = Template.instance();
    return Rooms.find({}, { sort: { createdAt: -1 } });
  },
});
