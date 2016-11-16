import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import EventContent from './EventContent.jsx';
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
        //FlowRouter.go("/attendance/event/"+calEvent._id);
        $('.modal').modal();
        //console.log(calEvent._id);
        $('#'+calEvent._id).modal('open');
      },
      dayClick: function(date, jsEvent, view) {
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
    $('.modal').modal();

  }

  test(){
    $('.modal').modal();
    console.log($('#XynJraXPfs46EXMGP'));
    $('#XynJraXPfs46EXMGP').modal('open');
  }

  render() {
    if(this.state.mounted){ // This reactively
      this.refresh();
    }



    return (
      <div>
        <div ref="calendar" id="calendar"></div>
        {this.getEvents().map((event)=>{
          return <EventContent key={event._id} event={event} />
        })}

      </div>
    );
  }
}
