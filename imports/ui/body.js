
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';
import { Reservations } from '../api/reservations.js';
import { ReactiveVar} from 'meteor/reactive-var';
import './reservation.js';
import './body.html';
import './calendar.js';
import './roomsList.js';


Template.body.onCreated(function () {
  Meteor.subscribe('reservations');

  this.order = new ReactiveVar();
  Session.set("order", "{ createdAt: 1 }")
  console.log(typeof this.order)
  this.sort = new ReactiveVar({});
  this.posts = new ReactiveVar();

});

Template.body.helpers({
  /* sortArr = [];
    var timePeriod = Session.get("period");
    var currentPage = Session.get("current_page");
        sortArr[currentPage+'.'+timePeriod] = "asc";
        return EmployeeCollection.find({}, sortArr).fetch();
        */
  reservations () {
    var boo = Template.instance().order.get()
    var foo = Template.instance().posts.get()
    Tracker.autorun(function () {
      Template.instance().posts.set(Reservations.find({}, { sort: Template.instance().sort.get() }));
    });
    return Template.instance().posts.get()
    //Reservations.find({}, { sort: {foo} });
  },
});

Template.body.events({
  'change .findUser'(event) {
    Session.set("userFind", event.target.value)

    },
  'click .SD'(event, instance) {
    event.preventDefault();
      instance.order.set("{ datestart: 1 }")
      Session.set("order", "{ datestart: 1 }")
      instance.sort.set({ datestart: 1 })
      console.log("fired", Session.get("order"))
    },
});
