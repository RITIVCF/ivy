import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '../LoaderCircle.jsx';
import EventCalendar from './EventCalendar.jsx';
import LegendFilter from './LegendFilter.jsx';
import MainBox from '../MainBox.jsx';
import EventPreviewContainer from './EventPreviewContainer';
import EventHelp from './EventHelp.jsx';
import { NavbarItem } from '/client/materialize.jsx';
import NoPerm from '../NoPerm.jsx';
import Event from '/lib/classes/Event.js';


export default class EventCalendarPage extends TrackerReact(React.Component) {
  constructor() {
    super();

		this.state = {
			start: Session.get("calendardate"),
			end: Session.get("calendardate"),
      viewtitle: ''
    };

  }

  componentDidMount(){
    $('.dropdown-button').dropdown();
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
  }

  componentDidUpdate(){
    $(".dropdown-button").dropdown();
  }

  openHelp(){
    this.refs.eventhelp.open();
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

  getSubHeader(){
    let view = Meteor.user().preferences.calendar_view;
    return <div>

      <ul className="center calcenter">
				<li onClick={this.prevCal.bind(this)} id="mob-date-left-li"><a id="mob-date-left"><i className="material-icons black-text">skip_previous</i></a></li>
				<li id="mob-date-center"><h1>{this.state.viewtitle}</h1></li>
				<li onClick={this.nextCal.bind(this)} id="mob-date-right-li"><a id="mob-date-right"><i className="material-icons black-text">skip_next</i></a></li>
      </ul>
      <ul className="right hide-on-small-only">
				<NavbarItem href={"/events/debrief"} tooltip={{text: "Event Debriefs"}}>
					<i className="material-icons black-text">subject</i>
				</NavbarItem>
				<li><a id="eventdropdownbutton" className="dropdown-button tooltipped" data-activates="caldrop" data-position="bottom" data-delay="50" data-tooltip="Views">
					{view=="month" ? <i className="material-icons black-text">today</i> :
						view=="agendaWeek" ? <i className="material-icons black-text">view_week</i> :
						view=="listWeek" ? <i className="material-icons black-text">view_list</i> : 'test' }
				</a></li>
				<NavbarItem className={"hide-on-small-only"}>|</NavbarItem>
				<NavbarItem
					className="hide-on-med-and-down"
					onClick={this.toggleInfoBar.bind(this)}
					tooltip={{text: "Show/Hide Infobar"}}
				>
					<i className="material-icons black-text">
						{Meteor.user().preferences.events_infobar?"info":"info_outline"}
					</i>
				</NavbarItem>
				<NavbarItem
					className="hide-on-small-only"
					onClick={this.openHelp.bind(this)}
					tooltip={{text:"Help"}}
				>
					<i className="material-icons black-text">live_help</i>
				</NavbarItem>
      </ul>
			<ul id="caldrop" className="dropdown-content hide-on-small-only">
				<li onClick={this.monthView.bind(this)}><a><i className={view=="month" ? "material-icons gold-text" : "material-icons black-text"}>today</i></a></li>
				<li onClick={this.weekView.bind(this)}><a><i className={view=="agendaWeek" ? "material-icons gold-text" : "material-icons black-text"}>view_week</i></a></li>
				<li onClick={this.listView.bind(this)}><a><i className={view=="listWeek" ? "material-icons gold-text" : "material-icons black-text"}>view_list</i></a></li>
			</ul>
		</div>
  }

	render() {
    if(SiteOptions.ready()){
			const date = Session.get("calendardate");
			let tags = Session.get("calendartagfilter");
			if ( !tags ) {
				tags = [];
			}
			const {
				start,
				end
			} = this.state;
      return (
				<MainBox
					subheader={this.getSubHeader()}
					showinfobar={Meteor.user().preferences.events_infobar}
					infobar={this.getInfoBar()}
				>
					<Row>
						<Column>
							<Card>
								<LegendFilter />
								<EventCalendarContainer
									start={start}
									end={end}
									currentTags={tags}
									onNewDateRange={(start, end)=>{this.handleNewDateRange(start, end)}}
								/>
							</Card>
						</Column>
					</Row>
					<EventHelp ref="eventhelp" />
				</MainBox>
    	)
    }
		return (<LoaderCircle />)
	}

	handleNewDateRange(start, end){
		console.log("Start: ", start);
		console.log("End: ", end);
		const viewtitle = $('#calendar').fullCalendar('getView').title;
		this.setState({
			start: start,
			end: end,
			viewtitle: viewtitle
		});
	}

	getInfoBar(){
		const eid = Session.get("evselected");
		if(!eid){
      return (
				<Row>
					<Column>
						<h2>Event Calendar</h2>
						<p>Select an event to continue...</p>
					</Column>
				</Row>
			);
    }
		return <EventPreviewContainer eid={eid} />;
	}
}
