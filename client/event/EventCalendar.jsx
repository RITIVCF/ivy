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
        right:  "month,agendaWeek,agendaDay,listWeek"    // maybe these can be controlled by settings later
      },
      defaultView: Session.get("calendarview"),
      firstDay: 1,
      height: 620,
      scrollTime: "12:00:00",
      viewRender: (view, element) => {
        Session.set("calendarview", view.name);
        Session.set("calendardate", $(calendar).fullCalendar( 'getDate' )._d );
      },
      defaultDate: Session.get("calendardate"),
      eventClick: (calEvent, jsevent, view) => {
        FlowRouter.go("/attendance/event/"+calEvent._id);
      },
      eventRender: (event, element) => {
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
