import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Contact from '/lib/classes/Contact.js';

export default class ChurchesPreview extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
    };
  }

  componentWillUnmount() {

  }

	render() {
		let ch = this.props.ch; //this.getChurch();

		if(!ch._id){
			return (
				<div className="row">
					<div className="col s12">
						<h5>Churches</h5>
						<p>Select a church to view it's details...</p>
					</div>
				</div>
			);
		}

		return (
			<div className="row">
				<div className="col s6">
					<p style={{fontWeight: "bold"}} >Active:</p>
				</div>
				<div className="col s6">
					<p>{ch.isActive()?"Yes":"No"}</p>
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >Name:</p>
					<p>{ch.getName()}</p>
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >URL:</p>
					<a href={"http://"+ch.getURL()}  target="_blank">{ch.getURL()}</a>
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >Times:</p>
					{ch.getTimes().map((time,i)=>{
						return <div key={i} className="col s12 card">
							<div className="card-content">
								<p>{time.day} @ {time.time}</p>
							</div>
						</div>
					})}
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >Contacts:</p>
					{console.debug(ch)}
					{console.debug(ch.getContacts())}
					{ch.getContacts().map((contact)=>{
						contact = new Contact(Meteor.users.findOne(contact));
						return <div key={contact._id} className="col s12 card">
							<div className="card-content">
								{contact.getName()}<br/>
								{contact.getEmail()}
							</div>
						</div>
					})}
				</div>
			</div>
		)
	}
}
