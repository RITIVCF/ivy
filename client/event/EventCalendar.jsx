import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import EventContent from './EventContent.jsx';
//import {Tracker} from 'meteor/tracker';

//    Order:
//        - will mount
//        - render
//        - did mount
//

export default class EventCalendar extends TrackerReact(React.Component) {
  constructor(){
    super();
    if(!Session.get("calendarview")){
      Session.set("calendarview",Options.findOne("calendarview").val);
    }
    if(!Session.get("calendardate")){
      Session.set("calendardate", moment()._d);
    }
    this.state = {
       mounted: false
    }
  }

  componentWillMount(){

  }

  renderPopoverContent(event) {
    div = $("<div></div>")[0];
    ReactDOM.render((<EventContent event={event}/>), div);
    return div;
  }

  componentDidMount(){
    $(calendar).fullCalendar({
      events: [],
      header: {
        left: "prev,next today",
        center: "title",
        right:  !this.props.sidebar?"month,agendaWeek,agendaDay":"month,basicWeek,basicDay"
      },
      defaultView: this.props.sidebar?(Session.get("calendarview")=="agendaWeek")?
        "basicWeek":(Session.get("calendarview")=="agendaDay")?"basicDay":Session.get("calendarview")
        :(Session.get("calendarview")=="basicWeek"||Session.get("calendarview")=="basicDay")?"agendaWeek":Session.get("calendarview"),
      firstDay: 1,
      height: this.props.height,
      scrollTime: "12:00:00",
      viewRender: (view, element) => {
        Session.set("calendarview", view.name);
        Session.set("calendardate", $(calendar).fullCalendar( 'getDate' )._d );
      },
      defaultDate: this.props.date?this.props.date:Session.get("calendardate"),
      eventClick: (calEvent, jsevent, view) => {
        FlowRouter.go("/attendance/event/"+calEvent._id);
      },
      dayClick: function(date, jsEvent, view) {
        $(calendar).fullCalendar( 'gotoDate', date );
        $(calendar).fullCalendar( 'changeView', "basicDay" );
      },
      eventRender: (event, element) => {
          if(!this.props.sidebar){
        element.popover({
          placement: "auto left",
          container: calendar,
          trigger: "manual",
          animation: false,
          template: '<div class="popover" role="tooltip">' +
          '<div class="arrow"></div>' +
          '<div class="popover-content"></div>' +
          '</div>',
          html: true,
          content: this.renderPopoverContent(event)
        }).on("mouseenter", () => {
          clearTimeout(element.timeout);
          $(element).popover("show");
          $(calendar).children(".popover").on("mouseleave", (event) => {
            element.timeout = setTimeout(() => {
              $(event.currentTarget).popover('hide');
            }, 250);
          });
        }).on("mouseleave", () => {
          clearTimeout(element.timeout);
          element.timeout = setTimeout(() => {
            if (!$(".popover:hover").length) {
              $(element).popover("hide");
            }
          }, 500);
        });
      }
      }
    });
    this.setState({mounted: true});
  }

  getEvents(){
    //return Events.aggregate({ $project : { title:"$name", start: 1, end: 1 }});
    var events = Events.find().fetch();
    events.forEach((event)=>{
      event.title=event.name;
    })
    return events;
  }

  refresh(){
    $(calendar).fullCalendar( 'removeEvents');
    $(calendar).fullCalendar( 'addEventSource', {events: this.getEvents()});
    $(calendar).fullCalendar( 'rerenderEvents');

  }

  render() {
    if(this.state.mounted){ // This reactively
      this.refresh();
    }

    return (
      <div>
        <div ref="calendar" id="calendar"></div>
      </div>
    );
  }
}
