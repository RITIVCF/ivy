import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import fullcalendar from 'fullcalendar';
import LoaderCircle from '../LoaderCircle.jsx';
import EventContent from './EventContent.jsx';
import NewEventModal from './NewEventModal.jsx';

export default class EventCalendar extends TrackerReact(React.Component) {
  constructor(){
    super();


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
        Meteor.call("setCalendarView", view.name);
        Session.set("calendardate", $(calendar).fullCalendar( 'getDate' )._d.toISOString() );
				// Refresh subscription
				this.props.onNewDateRange(view.start._d, view.end._d);
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

    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});
  }


  componentDidUpdate(){
    $(calendar).fullCalendar( 'removeEvents');
    $(calendar).fullCalendar( 'addEventSource',
      {events: this.props.myEvents
      }
    );
    $(calendar).fullCalendar( 'addEventSource',
      {events: this.props.unpublishedEvents,
        className: "unpublishedEvent"
      }
    );
    $(calendar).fullCalendar( 'rerenderEvents');

  }

  render() {
    return (
      <div>
				{this.props.loading&&
					<div style={styles.loaderCircle}>
						<LoaderCircle />
					</div>
				}
        <div ref="calendar" id="calendar"></div>
        {checkPermission("events")&&<NewEventModal ref="newevmodal" />}
      </div>
    );
  }
}

const styles = {
	loaderCircle: {
		position: "absolute",
		right: "20px",
		top: "-45px"
	}
}
