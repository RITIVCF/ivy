import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';
import MainBox from '../MainBox.jsx';
import EventPreview from './EventPreview.jsx';
import EventHelp from './EventHelp.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

//Events = new Mongo.Collection("events");

export default class EventCalendarWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    var thiz = this;
    this.state = {
      subscription: {
        myEvents: Meteor.subscribe("myEvents"),
        UnpublishedEvents: Meteor.subscribe("otherUnpublishedEvents")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.myEvents.stop();
    this.state.subscription.UnpublishedEvents.stop();
  }

  openHelp(){
      $("#helpmodal").appendTo("body").modal("open");
      //$("#helpmodal").modal("open");
  }

  toggleInfoBar(){
    Meteor.call("toggleEventsInfoBar");
  }

  prevCal() {
    $('#calendar').fullCalendar('prev');
  }
  nextCal() {
    $('#calendar').fullCalendar('next');
  }
  monthView() {
    $('#calendar').fullCalendar('changeView','month');
  }
  weekView() {
    $('#calendar').fullCalendar('changeView','agendaWeek');
  }
  listView() {
    $('#calendar').fullCalendar('changeView','listWeek');
  }
  viewDate() {
    var view = $('#calendar').fullCalendar('getView');
    return view.title;
  }

  getSubHeader(){
    return <div><ul className="left">
      <li onClick={this.prevCal.bind(this)}><a><i className="material-icons black-text">skip_previous</i></a></li>
      <li onClick={this.nextCal.bind(this)}><a><i className="material-icons black-text">skip_next</i></a></li>
      <li><a>Current week: {this.viewDate}</a></li>
      </ul>
      <ul className="right">
      <li><a className="dropdown-button" data-activates="caldrop">
      {$('#calendar').fullCalendar('getView').name=="month" ? <i className="material-icons black-text">today</i> :
        $('#calendar').fullCalendar('getView').name=="agendaWeek" ? <i className="material-icons black-text">view_week</i> :
        $('#calendar').fullCalendar('getView').name=="listWeek" ? <i className="material-icons black-text">view_list</i> : 'test' }
      </a></li>
      <li><a>|</a></li>
      <li onClick={this.toggleInfoBar.bind(this)}><a>
        <i className="material-icons black-text">
          {Meteor.user().preferences.events_infobar?"info":"info_outline"}
        </i>
      </a></li>
      <li><a onClick={this.openHelp.bind(this)}><i className="material-icons black-text">live_help</i></a></li>
      </ul>
    <ul id="caldrop" className="dropdown-content">
      <li onClick={this.monthView.bind(this)}><a><i className="material-icons black-text">today</i></a></li>
      <li onClick={this.weekView.bind(this)}><a><i className="material-icons black-text">view_week</i></a></li>
      <li onClick={this.listView.bind(this)}><a><i className="material-icons black-text">list</i></a></li>
    </ul>
  </div>
  }

	render() {
    document.title="Ivy - Event Calendar";
    if(Options.findOne("calendarview")){
      return (<div>
      <MainBox
        content={<div>
          <EventCalendar ref="calendar" height={650} />
          </div>}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.events_infobar}
        infobar={<EventPreview event={Events.findOne(Session.get("evselected")) } />}
        />
      <EventHelp />
      </div>
    )

    }
		return (<LoaderCircle />)
	}
}
