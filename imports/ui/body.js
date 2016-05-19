
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
  Session.set("sort_order", "dateend")
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

  //https://atmospherejs.com/shira/grid-view
  reservations () {
    //https://github.com/aldeed/meteor-tabular/
    sort_order = {};
    sort_order[Session.get("sort_order")] = 1;
/*    var boo = Template.instance().order.get()
    var foo = Template.instance().posts.get()
    Tracker.autorun(function () {
      Template.instance().posts.set(Reservations.find({}, { sort: Template.instance().sort.get() }));
    });
    return Template.instance().posts.get()
    //Reservations.find({}, { sort: {foo} }); */
    return Reservations.find({}, { sort: sort_order})
  },
});

Template.body.events({
  /*
  'input .findUser'(event, template) {
Session.set("whadtever", event.currentTarget.value)
    console.log(Session.get("whatever"), "fired")

    },
    'click .delFind'(event) {
    //.findUser gone
  },*/
  'click .SD'(event, instance) {
    event.preventDefault();
      /*instance.order.set("{ datestart: 1 }")
      Session.set("order", "{ datestart: 1 }")
      instance.sort.set({ datestart: 1 })
      console.log("fired", Session.get("order"))*/
      Session.set("sort_order", "datestart")
    },
    'click .ED'(event) {Session.set("sort_order", "dateend")},
    'click .CR'(event) {Session.set("sort_order", "timestamp")},
});
