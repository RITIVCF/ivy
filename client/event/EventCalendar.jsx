import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import fullcalendar from 'fullcalendar';
import EventContent from './EventContent.jsx';
import NewEventModal from './NewEventModal.jsx';

export default class EventCalendar extends TrackerReact(React.Component) {
  constructor(){
    super();

    if(!Session.get("calendardate")){
      Session.set("calendardate", moment()._d.toISOString());
    }
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
    var mq = window.matchMedia( "only screen and (max-width: 992px)" );
    var calView = "listWeek";
    if (mq.matches) {
      calView = "listWeek";
    } else {
      calView = Meteor.user().preferences.calendar_view;
    }
    $("#calendar").fullCalendar({
      events: [],
      eventColor: "#eee",
      eventBackgroundColor: "#eee",
      eventTextColor: "#555",
      header: false,
      defaultView: calView,
      firstDay: 1,
      fixedWeekCount: false,
      theme: false,
      height: this.props.height,
      scrollTime: "12:00:00",
      viewRender: (view, element) => {
				console.log("viewRender");
				console.log("Calendar state:", this.state);
        thiz.props.settitle();
        Meteor.call("setCalendarView", view.name);
        Session.set("calendardate", $(calendar).fullCalendar( 'getDate' )._d.toISOString() );
				// Refresh subscription
				this.props.onNewDateRange(view.start._d, view.end._d);
        console.log($('#mainbox .card-content').height());
        console.log($('.legend').height());
        var height = $('#mainbox').height() - $('.legend').height() - 101;
        $('#calendar').fullCalendar('option','height', height);
      },
      defaultDate: Session.get("calendardate"),
      eventClick: (calEvent, jsevent, view) => {
        var mq = window.matchMedia( "only screen and (max-width: 992px)" );

        if (mq.matches) {
          $('#fake-button').sideNav('show');
        } else {
          Meteor.call("openEventInfoBar");
        }

        Session.set("evselected",calEvent._id);
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
        if(!checkPermission("events")){return;}
        var timestamp = new moment(date._d);
        if(view.name=="month"){
            date.add(20,"hours");
        }
        else{
          date.add(5, "hours");
        }
        newevent = {start: date};

        thiz.refs.newevmodal.setStart(date.subtract(5,"hours"));

        date.add(5,"hours");

        thiz.refs.newevmodal.open();
      },
      eventAfterAllRender(view){
        $('.modal').modal();
      },
      eventRender: (event, element) => {

      }
    });
    this.setState({mounted: true});
    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});
  }

  getPublishedEvents(){
    let tags = Options.findOne("eventtags").vals;
    var events = Events.find({$or:[{tags: {$in: Session.get("calendartagfilter")}},{tags: []}], $or: [{status: "Published"},{status: "Reviewed"}]}).fetch();
    events.forEach((event)=>{
      event.title=event.name;
      var newcolors = [];
      event.tags.forEach((tagname)=>{
        var color = tags.filter(tag => tag.tag == tagname)[0].color;
        newcolors.push(color);
      });
      event.tags=newcolors;
    });

    var grps = Groups.find({users: Meteor.userId()}).fetch();
  	var ids = [];
  	grps.forEach(function(group){
  		ids.push(group._id);
  	});

    return events;
  }
  getUnPublishedEvents(){
    if(checkPermission('events')){
      var events = Events.find({$or:[{tags: {$in: Session.get("calendartagfilter")}},{tags: []},{tags: undefined}], status: "Unpublished"}).fetch();

      return this.addTagToUnPublishedEvents(events);
    }
    else{

      var events = Events.find({
        $or:[{tags: {$in: Session.get("calendartagfilter")}},{tags: []},{tags: undefined}],
        status: "Unpublished",
      }).fetch();
      return this.addTagToUnPublishedEvents(events);
    }
  }

  addTagToUnPublishedEvents(events){
    let tags = Options.findOne("eventtags").vals;
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
    });
    return events;
  }



  refresh(){
    $(calendar).fullCalendar( 'removeEvents');
    $(calendar).fullCalendar( 'addEventSource',
      {events: this.getPublishedEvents()
      }
    );
    $(calendar).fullCalendar( 'addEventSource',
      {events: this.getUnPublishedEvents(),
        className: "unpublishedEvent"
      }
    );
    $(calendar).fullCalendar( 'rerenderEvents');

  }

  test(){
    $('.modal').modal();
    $('#XynJraXPfs46EXMGP').modal('open');
  }

  render() {
    if(this.state.mounted){ // This reactively
      this.refresh();
    }

    return (
      <div>
        <div ref="calendar" id="calendar"></div>
        {checkPermission("events")&&<NewEventModal ref="newevmodal" />}
      </div>
    );
  }
}
