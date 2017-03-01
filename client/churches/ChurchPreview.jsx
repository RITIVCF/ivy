import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


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

		if(!ch){
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
					<p>{ch.active?"Yes":"No"}</p>
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >Name:</p>
					<p>{ch.name}</p>
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >URL:</p>
					<a href={"http://"+ch.url}  target="_blank">{ch.url}</a>
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >Times:</p>
					{ch.times.map((time,i)=>{
						return <div key={i} className="col s12 card">
							<div className="card-content">
								<p>{time.day} @ {time.time}</p>
							</div>
						</div>
					})}
				</div>
				<div className="col s12">
					<p style={{fontWeight: "bold"}} >Contacts:</p>
					{ch.contacts.map((contact)=>{
						return <div key={contact} className="col s12 card">
							<div className="card-content">
								{Meteor.users.findOne(contact).name}<br/>
								{Meteor.users.findOne(contact).emails[0].address}
							</div>
						</div>
					})}
				</div>
			</div>
		)
	}
}
