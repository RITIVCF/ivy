import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestWrapper from '../request/RequestWrapper.jsx';
import PermissionWindow from './permissions/PermissionWindow.jsx';
import ButtonPublish from './components/ButtonPublish.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import EventDateControls from './components/EventDateControls.jsx';
import EventName from './components/EventName.jsx';
import EventDescription from './components/EventDescription.jsx';
import EventLocation from './components/EventLocation.jsx';
import EventWorkpad	from './components/EventWorkpad.jsx';

//Events = new Mongo.Collection("events");

export default class EventWorkspace extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription: {
        Events: Meteor.subscribe("allEvents")
      },
			published: false
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
  }

	viewPermissions(event){
		event.preventDefault();
  	this.refs.overlay.toggleOverlay();
  }

	updateReserved(event){
		event.preventDefault();
		Meteor.call("updateEventReserved", this.props.eid, this.refs.reserved.value);
	}
	updateEVR(event){
		Meteor.call("updateEventEVR", this.props.eid, this.refs.evr.value);
	}

	handleReservedChange(event){
		this.setState({reserved:event.target.value});
	}
	handleEVRChange(event){
		this.setState({evr:event.target.value});
	}

	getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

	render() {
	let ev = this.getEvent();

	if(!ev){
		return (<div>Loading...</div>);
	}

	this.state.published = ev.published;
	//console.log(ev);
	//console.log(new moment(ev.start).format("YYYY-MM-DD"));

   /*if(!this.state.isOwner)
   {
       permissionWindow = '';
       permissionButton = '';
   }*/
	 /*
	 if(new Date(this.refs.enddate.value+"T"+this.refs.endtime.value).getTime() < new Date(this.refs.startdate.value+"T"+this.refs.starttime.value).getTime()){
		 this.refs.enddate.value=this.refs.startdate.value;
		 this.refs.endtime.value=this.refs.starttime.value;
	 }
	 console.log("Start: " + new Date(this.refs.startdate.value+"T"+this.refs.starttime.value));
	 console.log("End: " + new Date(this.refs.enddate.value+"T"+this.refs.endtime.value));*/
		return (

		<div>
			{Meteor.userId()==ev.owner ? <PermissionWindow ref="overlay" parent={this} />:""}
			<article id="main">
        <header className="special container">
          <h2>Event Workspace</h2>
        </header>
			<div className="sidebar">
				{Meteor.userId()==ev.owner ? <input type="button" onClick={this.viewPermissions.bind(this)} value="Permissions" />:""}
			</div>
			<div className="secondary sidebar">
				<ButtonPublish published={ev.published} eid={this.props.eid} />
				<ButtonDelete eid={this.props.eid} />
				<EventDateControls eid={this.props.eid} />
				<EventLocation eid={this.props.eid} />
			{/*}	<label>Reserved</label>
				<input type="checkbox" ref="reserved" {reserved ? "checked":""} onBlur={this.updateReserved.bind(this)} onChange={this.handleReservedChange} />
				<label>EVR</label>
				<input type="checkbox" ref="evr" {evr ? "checked":""} onBlur={this.updateEVR.bind(this)} onChange={this.handleEVRChange} /> */}
			</div>
			<div className="Workspace">
					<EventName eid={this.props.eid} />
					<EventDescription eid={this.props.eid} />
					<EventWorkpad eid={this.props.eid} />
			</div>
      <RequestWrapper eid={ev.eid} />
			</article>
		</div>
		)
	}
}
