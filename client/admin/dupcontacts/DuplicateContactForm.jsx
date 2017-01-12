import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Contact from './Contact.jsx';
import ContactDetails from './ContactDetails.jsx';

export default class DuplicateContactForm extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			showanyway: false,
			showall: false,
			deleteId: false,
			mergeId: false,
			contacts: []
		}
	}

	componentDidMount(){
		this.loadContacts();
	}

	loadContacts(){
		thiz = this;
		Meteor.call("getDuplicateContacts", function(error, result){
			thiz.setState({contacts: result});
		});
	}

	getContacts(){
		if(this.state.showall){
			return Meteor.users.find({createdAt: {$ne: undefined}},{sort:{name:1, email:1, createdAt: 1}}).fetch();
		}
		return Meteor.users.find({
			$and:[
				{_id:{$in: this.state.contacts}},
				{deleted: {$ne: true}}
			],
			createdAt: {$ne: undefined}
		},{sort:{name:1, email:1, createdAt: 1}}).fetch();
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
		options.name = this.refs.deletecontact.state.name;
		options.email = this.refs.deletecontact.state.email;
		options.phone = this.refs.deletecontact.state.phone;
		options.major = this.refs.deletecontact.state.major;
		options.bio   = this.refs.deletecontact.state.bio;
		options.news  = this.refs.deletecontact.state.news;
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

	showHideAll(){
		this.setState({showall: !this.state.showall});
	}

	showAnyway(){
		this.setState({showanyway: true});
		this.setState({showall: true});
	}

	render() {
		let show = (this.getContacts().length>1)||this.state.showanyway;
		return (

					<div className="">
						<div className="">

						{show?
						<div className="">
							<div className="row">
								<div className="col s12">
									<h1>Please read carefully before continuing:</h1>
									<p><b>Instructions:</b> Select the contact to merge from the left column
									and then the contact to merge the data into from the right column. The contact in the left column will be
									<b> DELETED</b>. Please check the boxes of information you want to merge from the left column to the right.<br/><br/>
									Check date, and delete the newer duplicates and keep the original. <br/>By default, the list displays what we suspect
									to be duplicates. If you find other that need corrected, you can check <b>'Show All Contacts'</b> below to view all contacts
									and make the merge. Thank you.</p>
									<div className="input-field">
										<input type="checkbox" id="showall" checked={this.state.showall} onClick={this.showHideAll.bind(this)} />
										<label htmlFor="showall">Show All Contacts</label>
									</div>
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="col s12 m6">
										<label>Choose contact card to delete:</label>
										<select multiple ref="delete" className="browser-default" onChange={this.showContactDelete.bind(this)}>
											{this.getContacts().map((contact)=>{
												return <Contact key={contact._id} contact={contact} />
											})}
										</select><br/>
									{this.state.deleteId ? <ContactDetails cid={this.state.deleteId} ref="deletecontact" /> : ""}
								</div>
								<div className="col s12 m6">
										<label>Choose contact card to merge into:</label>
										<select multiple ref="merge" className="browser-default" onChange={this.showContactMerge.bind(this)}>
											{this.getContacts().map((contact)=>{
												return <Contact key={contact._id} contact={contact} />
											})}
										</select><br/>
									{this.state.mergeId ? <ContactDetails cid={this.state.mergeId} mergec={true} /> : ""}
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="col-md-12">
									{((this.state.deleteId&&this.state.mergeId)&&(this.state.deleteId!=this.state.mergeId))&&
									<button onClick={this.performDelete.bind(this)} className="btn btn-primary">Merge & Delete</button>}
								</div>
							</div>
							</div>
						:
						<div className="row">
							<div className="col s12"><p>Congrats! There are no duplicate contacts we can detect automatically.</p>
							<a className="btn" onClick={this.showAnyway.bind(this)}>Show Anyway</a></div>
						</div>}
						</div>
					</div>
		)
	}
}
