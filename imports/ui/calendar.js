import { Template } from 'meteor/templating';
import { Rooms } from '../api/rooms.js';


import './calendar.html';
//http://eternicode.github.io/bootstrap-datepicker/?markup=range&format=&weekStart=&startDate=&endDate=&startView=0&minViewMode=0&maxViewMode=2&todayBtn=false&clearBtn=false&language=en&orientation=auto&multidate=&multidateSeparator=&keyboardNavigation=on&forceParse=on#sandbox
// reactivevar watches calendar, reactive dict changes view
// rajit datepicker from atmosphere (essentialy eternicode)
// clear btn for admin all view



Template.calendar.rendered=function() {
	$(/*'.range'*/ '#datepicker').datepicker({
		//https://github.com/eternicode/bootstrap-datepicker/issues/580
		// in css .range div display as inline block
	//	inputs: $('.range-start, .range-end')
  todayBtn: "linked",
clearBtn: true,
todayHighlight: true,
toggleActive: true,});
$('#datestart').datepicker('setDate', new Date())
$('#dateend').datepicker('setDate', new Date())


};

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
