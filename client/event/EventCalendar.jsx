import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import fullcalendar from 'fullcalendar';
import EventContent from './EventContent.jsx';
import NewEventModal from './NewEventModal.jsx';

//import EventModal from './components.jsx';
//import {Tracker} from 'meteor/tracker';

//    Order:
//        - will mount
//        - render
//        - did mount
//

export default class EventCalendar extends TrackerReact(React.Component) {
  constructor(){
    super();
    // if(!Session.get("calendarview")){
    //   Session.set("calendarview",Options.findOne("calendarview").val);
    // }
    if(!Session.get("calendardate")){
      Session.set("calendardate", moment()._d.toISOString());
    }
    console.log("Moment: ",moment()._d);
    console.log("Initialization: ", Session.get("calendardate"));
    if(!Session.get("calendartagfilter")){
      var result = Options.findOne("eventtags").vals;
      var tags = [];
      result.forEach((tag)=>{
        tags.push(tag.tag);
      });
      Session.set("calendartagfilter", tags);
    }
    this.state = {
       mounted: false
    }
  }

  componentWillMount(){

  }



  renderPopoverContent(event) {
    div = $("<div></div>")[0];
    ReactDOM.render((<div id={event._id} className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>), div);
    return div;
  }

  componentDidMount(){
    var thiz = this;
    console.log(Session.get("calendardate"));
    $("#calendar").fullCalendar({
      events: [],
      header: false,
      defaultView: Meteor.user().preferences.calendar_view,
      firstDay: 1,
      fixedWeekCount: false,
      theme: false,
      height: this.props.height,
      scrollTime: "12:00:00",
      viewRender: (view, element) => {
        thiz.props.settitle();
        //After Update Tue Nov 29 2016 23:00:00 GMT-0500 (Eastern Standard Time)
        //Session.set("calendarview", view.name);
        Meteor.call("setCalendarView", view.name);
        console.log("Before update", Session.get("calendardate"));
        Session.set("calendardate", $(calendar).fullCalendar( 'getDate' )._d.toISOString() );
        console.log("After Update",$(calendar).fullCalendar( 'getDate' )._d.toISOString() );
        var height = $('#mainbox > div').height();
        $('#calendar').fullCalendar('option','height', height);
      },
      defaultDate: Session.get("calendardate"),
      eventClick: (calEvent, jsevent, view) => {
        //FlowRouter.go("/attendance/event/"+calEvent._id);
        if(!calEvent.name){
          return;
        }
        //Session.set("infobar",true);
        Meteor.call("openEventInfoBar");
        Session.set("evselected",calEvent._id);
        //$('.modal').modal();
        //console.log(calEvent._id);
        //$('#'+calEvent._id).modal('open');
      },
      eventDrop: function(event, delta, revertFunc) {
        var start = new moment(event.start.toISOString());
        var end = new moment(event.end.toISOString());
        Meteor.call("updateEventStart", event._id, start._d, function(error,result){
          if(error){
            revertFunc();
          }
        });
        Meteor.call("updateEventEnd", event._id, end._d, function(error,result){
          if(error){
            revertFunc();
          }
        });

      },
      eventResize: function(event, delta, revertFunc) {
        var end = new moment(event.end.toISOString());
        Meteor.call("updateEventEnd", event._id, end._d, function(error,result){
          if(error){
            revertFunc();
          }
        });

      },
      dayClick: function(date, jsEvent, view) {
        var timestamp = new moment(date._d);
        if(view.name=="month"){
            date.add(20,"hours");
        }
        else{
          date.add(5, "hours");
        }
        newevent = {start: date};
        $('#neweventmodalstart')[0].innerHTML="Start: "+ date.subtract(5,"hours").format("Do MMM h:mmA"); $('.modal').modal();
        date.add(5,"hours");
        //console.log($('#neweventmodalstart'));
        //console.log(newevent);
        $('#neweventmodal').appendTo("body").modal('open');
        $('#newname').focus();


        //$(calendar).fullCalendar( 'renderEvent', {title: "", start: date._d, end: end._d});



        // create new event, open popup for name
        // console.log(view);
        // console.log(date);
        // var component = this;
        // if(view.name=="month"){
        //     date.add(20,"hours");
        // }
        // else{
        //   date.add(5, "hours");
        // }
        // console.log(date);
        // console.log(date._d);
        // Meteor.call('addBlankEvent', date._d, function(error, result){
        //   if(error){
        //     console.log(error.reason);
        //     return;
        //   }
        // //FlowRouter.go("/events/workspace/"+result);
        // });

        //$(calendar).fullCalendar( 'gotoDate', date );
        //$(calendar).fullCalendar( 'changeView', "basicDay" );
      },
      eventAfterAllRender(view){
        $('.modal').modal();
      },
      eventRender: (event, element) => {

           //if(!this.props.sidebar){
           //element[0].class += " tooltipped";
           //element[0].innerHtml+=this.renderPopoverContent(event);
           //element[0].class
           //console.log(element);
           //console.log(element[0]);
           //element.setAttribute("data-position","bottom");
           //element.setAttribute("data-delay", "50");
           //element.setAttribute("data-tooltip", this.renderPopoverContent(event));
        // element.popover({
        //   placement: "auto left",
        //   container: calendar,
        //   trigger: "manual",
        //   animation: false,
        //   template: '<div class="popover" role="tooltip">' +
        //   '<div class="arrow"></div>' +
        //   '<div class="popover-content"></div>' +
        //   '</div>',
        //   html: true,
        //   content: this.renderPopoverContent(event)
        // }).on("mouseenter", () => {
        //   clearTimeout(element.timeout);
        //   $(element).popover("show");
        //   $(calendar).children(".popover").on("mouseleave", (event) => {
        //     element.timeout = setTimeout(() => {
        //       $(event.currentTarget).popover('hide');
        //     }, 250);
        //   });
        // }).on("mouseleave", () => {
        //   clearTimeout(element.timeout);
        //   element.timeout = setTimeout(() => {
        //     if (!$(".popover:hover").length) {
        //       $(element).popover("hide");
        //     }
        //   }, 500);
        //});
    //  }
      }
    });
    this.setState({mounted: true});
    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});
  }

  getPublishedEvents(){
    //return Events.aggregate({ $project : { title:"$name", start: 1, end: 1 }});
    let tags = Options.findOne("eventtags").vals;
    var events = Events.find({$or:[{tags: {$in: Session.get("calendartagfilter")}},{tags: []}], published: true}).fetch();
    events.forEach((event)=>{
      event.title=event.name;
      var newcolors = [];
      event.tags.forEach((tagname)=>{
        var color = tags.filter(tag => tag.tag == tagname)[0].color;
        newcolors.push(color);
      });
      event.tags=newcolors;
    });


    //console.log(Groups.find({users: Meteor.userId()}).fetch());
    var grps = Groups.find({users: Meteor.userId()}).fetch();
  	var ids = [];
  	grps.forEach(function(group){
  		ids.push(group._id);
  	});
  	//console.log("GGroups:");
  	//console.log(ids);
    // console.log(Events.find({$or: [
    //   {owner: Meteor.userId()},
    //   {published: true},
    //   {"permUser.id": Meteor.userId()},
    //   {"permGroup.id": {$in: ids}}
    // ]}).fetch());



    return events;
  }
  getUnPublishedEvents(){
    if(checkPermission('events')){
      let tags = Options.findOne("eventtags").vals;

var events = Events.find({$or:[{tags: {$in: Session.get("calendartagfilter")}},{tags: []},{tags: undefined}], published: false}).fetch();

      //var events = Events.find({published: false}).fetch();
      events.forEach((event)=>{
        event.editable=(!event.name)?false:true;
        event.title=event.name?event.name:"";
        if(event.tags) {
          var newcolors = [];
          event.tags.forEach((tagname)=>{
            var color = tags.filter(tag => tag.tag == tagname)[0].color;
            newcolors.push(color);
          });
          event.tags=newcolors;
        } else {
          event.tags = [];
        }
        //event.title=event.name;
      })
      return events;
    }
    else{
      return []
    }
    //return Events.aggregate({ $project : { title:"$name", start: 1, end: 1 }});

  }

  refresh(){
    $(calendar).fullCalendar( 'removeEvents');
    $(calendar).fullCalendar( 'addEventSource',
      {events: this.getPublishedEvents()
      }
    );
    $(calendar).fullCalendar( 'addEventSource',
      {events: this.getUnPublishedEvents(),
        color: "red"
      }
    );
    $(calendar).fullCalendar( 'rerenderEvents');
    //$('.modal').modal();

  }

  test(){
    $('.modal').modal();
    //console.log($('#XynJraXPfs46EXMGP'));
    $('#XynJraXPfs46EXMGP').modal('open');
  }





  render() {
    if(this.state.mounted){ // This reactively
      this.refresh();
    }



    return (
      <div>
        <div ref="calendar" id="calendar"></div>
        {/*{this.getPublishedEvents().map((event)=>{
          return <EventContent key={event._id} event={event} />
        })}
        {this.getUnPublishedEvents().map((event)=>{
          return <EventContent key={event._id} event={event} />
        })}*/}
        <NewEventModal />
      </div>
    );
  }
}
