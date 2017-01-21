import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';
import LegendFilter from './LegendFilter.jsx';
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
      },
      viewtitle: ''
    };
  }

  componentWillUnmount() {
    this.state.subscription.myEvents.stop();
    this.state.subscription.UnpublishedEvents.stop();
  }

  openHelp(){
      this.refs.eventhelp.open();
      //$("#helpmodal").modal("open");
  }

  toggleInfoBar(){
    Meteor.call("toggleEventsInfoBar");
  }

  prevCal() {
    $('#calendar').fullCalendar('prev');
    var viewtitle = $('#calendar').fullCalendar('getView').title;
    this.setState({viewtitle: viewtitle});
  }
  nextCal() {
    $('#calendar').fullCalendar('next');
    var viewtitle = $('#calendar').fullCalendar('getView').title;
    this.setState({viewtitle: viewtitle});
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
  settitle() {
    var viewtitle = $('#calendar').fullCalendar('getView').title;
    this.setState({viewtitle: viewtitle});
  }

  getSubHeader(){
    var viewtitle = $('#calendar').fullCalendar('getView').title;
    let view = Meteor.user().preferences.calendar_view;
    return <div>

      <ul className="center calcenter">
      <li onClick={this.prevCal.bind(this)}><a><i className="material-icons black-text">skip_previous</i></a></li>
      <h1>{this.state.viewtitle}</h1>
      <li onClick={this.nextCal.bind(this)}><a><i className="material-icons black-text">skip_next</i></a></li>
      </ul>
      <ul className="right">
        <li><a href="/events/debrief"><i className="material-icons black-text">subject</i></a></li>
      <li><a className="dropdown-button" data-activates="caldrop">
      {view=="month" ? <i className="material-icons black-text">today</i> :
        view=="agendaWeek" ? <i className="material-icons black-text">view_week</i> :
        view=="listWeek" ? <i className="material-icons black-text">view_list</i> : 'test' }
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
      <li onClick={this.monthView.bind(this)}><a><i className={view=="month" ? "material-icons gold-text" : "material-icons black-text"}>today</i></a></li>
      <li onClick={this.weekView.bind(this)}><a><i className={view=="agendaWeek" ? "material-icons gold-text" : "material-icons black-text"}>view_week</i></a></li>
      <li onClick={this.listView.bind(this)}><a><i className={view=="listWeek" ? "material-icons gold-text" : "material-icons black-text"}>view_list</i></a></li>
    </ul>
  </div>
  }

	render() {
    document.title="Ivy - Event Calendar";
    //if(Options.findOne("calendarview")&&Options.findOne("eventtags")){
    if(SiteOptions.ready()){
      return (<div>
      <MainBox
        content={<div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <LegendFilter />
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <EventCalendar ref="calendar" settitle={this.settitle.bind(this)} />
                </div>
              </div>
            </div>
          </div>}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.events_infobar}
        infobar={<EventPreview event={Events.findOne(Session.get("evselected"))} ready={this.state.subscription.myEvents.ready()} />}
        />
      <EventHelp ref="eventhelp" />
      </div>
    )

    }
		return (<LoaderCircle />)
	}
}
