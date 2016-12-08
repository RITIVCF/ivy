import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';
import InfoBar from '../InfoBar.jsx';
import SubHeader from '../layouts/SubHeader.jsx';
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
      $("#helpmodal").modal("open");
  }

  toggleInfoBar(){
    Meteor.call("toggleEventsInfoBar");
  }

  getSubHeader(){
    return <div>
      <a onClick={this.openHelp.bind(this)} className="waves-effect waves-green black-text">Help</a>
      <li className="active" onClick={this.toggleInfoBar.bind(this)}><a className="waves-effect waves-light">
          <i className="material-icons black-text">{Meteor.user().preferences.events_infobar?"info":"info_outline"}</i></a></li>
    </div>
  }

	render() {
    document.title="Ivy - Event Calendar";
    if(Options.findOne("calendarview")){
      return <div>
        <SubHeader content={this.getSubHeader()} />
        <div className="main-box">
          <EventCalendar ref="calendar" height={650} />

        <EventHelp />
        </div>
        {Meteor.user().preferences.events_infobar?
        <InfoBar content={<EventPreview event={Events.findOne(Session.get("evselected"))} />} />:""}
      </div>
    }
		return (<LoaderCircle />)
	}
}
