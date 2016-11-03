import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Contact from './Contact.jsx';
import ContactDetails from './ContactDetails.jsx';

export default class DuplicateContactForm extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			deleteId: false,
			mergeId: false
		}
	}

	getContacts(){
		return Contacts.find({},{sort:{name:1, email:1}}).fetch();
		//return PagePermissions.find().fetch();
	}

	performDelete(event){
		event.preventDefault();
		if(this.state.deleteId==this.state.mergeId){
			window.alert("Please select two different contacts.");
			return;
		}
		if(!window.confirm("Are you sure? Please make sure you selected the correct contacts.\n\n"
			+ "This cannot be undone!")){
				return;
		}
		// This means that we are cleared to go and perform algorithm

		var options = {};
		options.name = this.refs.deletecontact.refs.name.checked;
		options.email = this.refs.deletecontact.refs.email.checked;
		options.phone = this.refs.deletecontact.refs.phone.checked;
		options.major = this.refs.deletecontact.refs.major.checked;
		options.bio   = this.refs.deletecontact.refs.bio.checked;
		options.news  = this.refs.deletecontact.refs.news.checked;
		// Args: (must be passed in this order)
		//    deleteId - id of contact to be deleted
		//    mergeId - id of contact to merge into
		//    options - which fields are to be kept or overwritten
		Meteor.call("mergeAndDeleteContact", this.state.deleteId, this.state.mergeId, options);
		this.setState({deleteId: false});
	}

	showContactDelete(event){
		event.preventDefault();
		this.setState({deleteId: this.refs.delete.value});
	}

	showContactMerge(event){
		event.preventDefault();
		this.setState({mergeId: this.refs.merge.value});
	}

	render() {
		return (

					<div className="panel panel-default">
						<div className="panel-heading">
						</div>
						{this.getContacts().length>1?
						<div className="panel-body">
							<div className="row">
								<div className="col-md-12">
									<p><b>Please read carefully before continuing:</b><br/>Select the contact to merge from the left column
									and then the contact to merge the data into from the right column. The contact in the left column will be
									<b> deleted</b>. Please check the boxes of information you want to merge from the left column to the right.<br/><br/>
									Check date, and delete the newer duplicates and keep the original. Thank you.</p>
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label>Choose contact card to delete:</label>
										<select multiple ref="delete" className="form-control" onChange={this.showContactDelete.bind(this)}>
											{this.getContacts().map((contact)=>{
												return <Contact key={contact._id} contact={contact} />
											})}
										</select><br/>
									{this.state.deleteId ? <ContactDetails cid={this.state.deleteId} ref="deletecontact" /> : ""}
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label>Choose contact card to merge into:</label>
										<select multiple ref="merge" className="form-control" onChange={this.showContactMerge.bind(this)}>
											{this.getContacts().map((contact)=>{
												return <Contact key={contact._id} contact={contact} />
											})}
										</select><br/>
										{this.state.mergeId ? <ContactDetails cid={this.state.mergeId} /> : ""}
									</div>
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="col-md-12">
									<button onClick={this.performDelete.bind(this)} className="btn btn-primary">Merge & Delete</button>
								</div>
							</div>
						</div>
						:
						<div className="panel-body">
							<div className="row">
								<div className="col-md-12">Congrats! There are no duplicate contacts we can detect automatically.</div>
							</div>
						</div>}
					</div>
		)
	}
}
