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

  createNew(go){
    event.preventDefault();
    Meteor.call('addEvent', this.refs.newname.value, newevent.start._d, function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      if(go){
        FlowRouter.go("/events/workspace/"+result);
      }
    });
    this.refs.newname.value="";
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
        if(!calEvent.name){
          return;
        }
        $('.modal').modal();
        //console.log(calEvent._id);
        $('#'+calEvent._id).modal('open');
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
        console.log($('#neweventmodalstart'));
        console.log(newevent);
        $('#neweventmodal').modal('open');
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
    var events = Events.find({published: true}).fetch();
    events.forEach((event)=>{
      event.title=event.name;
    });

    //console.log(Groups.find({users: Meteor.userId()}).fetch());
    var grps = Groups.find({users: Meteor.userId()}).fetch();
  	var ids = [];
  	grps.forEach(function(group){
  		ids.push(group._id);
  	});
  	console.log("GGroups:");
  	console.log(ids);
    console.log(Events.find({$or: [
      {owner: Meteor.userId()},
      {published: true},
      {"permUser.id": Meteor.userId()},
      {"permGroup.id": {$in: ids}}
    ]}).fetch());



    return events;
  }
  getUnPublishedEvents(){
    //return Events.aggregate({ $project : { title:"$name", start: 1, end: 1 }});
    var events = Events.find({published: false}).fetch();
    events.forEach((event)=>{
      event.editable=(!event.name)?false:true;
      event.title=event.name;
    })
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
        color: "red"
      }
    );
    $(calendar).fullCalendar( 'rerenderEvents');
    $('.modal').modal();

  }

  test(){
    $('.modal').modal();
    console.log($('#XynJraXPfs46EXMGP'));
    $('#XynJraXPfs46EXMGP').modal('open');
  }

  openHelp(){
      $("#helpmodal").modal("open");
  }

  render() {
    if(this.state.mounted){ // This reactively
      this.refresh();
    }



    return (
      <div>
        <a onClick={this.openHelp.bind(this)} className="waves-effect waves-green btn">Help</a>
        <div ref="calendar" id="calendar"></div>
        {this.getPublishedEvents().map((event)=>{
          return <EventContent key={event._id} event={event} />
        })}
        {this.getUnPublishedEvents().map((event)=>{
          return <EventContent key={event._id} event={event} />
        })}
        <div id="neweventmodal" className="modal">
          <div className="modal-content">
            <div className="input-field col s12">
              <input ref="newname" id="newname" type="text" />
              <label htmlFor="icon_prefix">New Event Name</label>
            </div>
            <p id="neweventmodalstart"></p>
          </div>
          <div className="modal-footer">
            <a onClick={this.createNew.bind(this,false)}
              className="modal-action modal-close waves-effect waves-green btn-flat">Create
            </a>
            <a onClick={this.createNew.bind(this,true)}
              className="modal-action modal-close waves-effect waves-green btn-flat">Edit Event
            </a>
          </div>
        </div>
        <div id="helpmodal" className="modal">
          <div className="modal-content">
            <h3>Event Dashboard</h3>
            <p>This is the full management area for planning events. Blue events are published events. Red events have not been published.
              If the event is unpublished without a name, that means you do not have the permission to view or edit that event. You can
              continue to edit events after they have been published if you have permission.
            </p><br/>
          <img src="/images/CalendarExample.jpg" width="100%" className="materialboxed" ></img>
          <h5>Potential Actions:</h5>
            <p>
              <b>Event Click:</b> View options and event details.<br/>
              <b>Drag & Resize:</b> change the date and time by dragging and event or dragging the handle in week view.<br/>
              <b>Space Click:</b> Click on a day (day and time in week view) to create a new event at that time. "Edit Event" goes directly to the event
              workspace.</p>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
        </div>
      </div>
    );
  }
}
