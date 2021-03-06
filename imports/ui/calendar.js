import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';

Template.calendar.onCreated(function() {
  Session.set('Errors', {});
});

import './calendar.html';
//http://eternicode.github.io/bootstrap-datepicker/?markup=range&format=&weekStart=&startDate=&endDate=&startView=0&minViewMode=0&maxViewMode=2&todayBtn=false&clearBtn=false&language=en&orientation=auto&multidate=&multidateSeparator=&keyboardNavigation=on&forceParse=on#sandbox
// reactivevar watches calendar, reactive dict changes view
// rajit datepicker from atmosphere (essentialy eternicode)
// clear btn for admin all view


//https://github.com/rajit/bootstrap3-datepicker/issues/8
//https://github.com/rajit/bootstrap3-datepicker/issues/17
/*'.range'*/
	//https://github.com/eternicode/bootstrap-datepicker/issues/580
	// in css .range div display as inline block
//	inputs: $('.range-start, .range-end')
Template.calendar.rendered=function() {
	$( '#datepicker').datepicker({
  todayBtn: "linked",
	language: Session.get('language'),
clearBtn: true,
todayHighlight: true,
toggleActive: true,});
$('#datestart').datepicker('setDate', new Date())
$('#dateend').datepicker('setDate', new Date())
};

 Tracker.autorun(function () {
	 //basic addon to force rerender/new language render
$( '#datepicker').datepicker('remove')
	 $( '#datepicker').datepicker({
	  todayBtn: "linked",
	  language: Session.get('language'),
	 clearBtn: true,
	 todayHighlight: true,
	 toggleActive: true,})
/*	 if (Session.equals('language') == "ru") {
	 $( '#datepicker').datepicker({
		todayBtn: "linked",
		language: 'ru',
	clearBtn: true,
	todayHighlight: true,
	toggleActive: true,})
} else if (Session.equals('language') == "kk") {
	$( '#datepicker').datepicker({
	 todayBtn: "linked",
	 language: 'kk',
 clearBtn: true,
 todayHighlight: true,
 toggleActive: true,})
} else {
	$( '#datepicker').datepicker({
	 todayBtn: "linked",
	 language: 'en',
 clearBtn: true,
 todayHighlight: true,
 toggleActive: true,})
}*/
})
//clearDates button for admin view
Template.calendar.events ({
  'change #datestart': function () {
    var shit = $('#datestart').datepicker('getDate')
    Session.set( "StartDate", shit)


  //  var consoleitem = Session.get("CurrentDate")
  //  console.log(consoleitem)
},
  'change #dateend': function () {
    var stuff = $('#dateend').datepicker('getDate')
    Session.set( "EndDate", stuff)
  //  var consoleitem = Session.get("CurrentDate")
  //  console.log(consoleitem)
  }
});

Template.calendar.helpers({
  errorMessage (field) {
    return Session.get('Errors')[field];
  },
  errorClass (field) {
    return !!Session.get('Errors')[field] ? 'has-error' : '';
  }
});
