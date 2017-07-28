import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySelect from '../ethnicity/EthnicitySelect.jsx';
import AddressForm from './AddressForm.jsx';
import ContactName from './components/ContactName.jsx';
import ContactEmail from './components/ContactEmail.jsx';
import ContactPhone from './components/ContactPhone.jsx';
import ContactMajor from './components/ContactMajor.jsx';
import ContactBio from './components/ContactBio.jsx';
import ContactNewsletter from './components/ContactNewsletter.jsx';
import CampusAffiliations from './components/CampusAffiliations.jsx';
import CommunityLife from './components/CommunityLife.jsx';
import ContactIntl from './components/ContactIntl.jsx';
import ContactGender from './components/ContactGender.jsx';
import ContactGradTerm from './components/ContactGradTerm.jsx';
import ContactCurrYear from './components/ContactCurrYear.jsx';
import MemberForm from '../member/MemberForm.jsx';
//import NewAddressModal from './NewAddressModal.jsx';
import Event from './Event.jsx';
import EditTicketForm from '../tickets/EditTicketForm.jsx';
import Contact from '/lib/classes/Contact.js';

export default class ContactProfile extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    this.state = {
      viewallevents: false
    }
  }

  componentDidMount(){
    $('select').material_select();
    $('.modal').modal();
  }

  openTicket(){
    $('#ticketmodal').appendTo("body").modal("open");
  }

  viewAllEvents(){
    this.setState({viewallevents: true});
  }

	getContact(){
		return new Contact(
			Meteor.users.findOne(this.props.cid)
		);
	}

  getEvents(){
		let contact = this.props.contact;
    var options = {sort:{start:-1}};
    if(!this.state.viewallevents){
      options.limit = 3;
    }
		if(this.props.cid){
			contact = this.getContact();
		}
    return Events.find({"attendees._id": contact._id}, options).fetch();
  }

	getTicket(){
    var ticket = Tickets.findOne(this.props.contact.ticket);
    if(ticket){
      return ticket;
    }
    else {
      return {ticketnum: ''}
    }
  }

  openMemberOverlay(){
    this.refs.becmemwin.open();
  }

	setAsPresent(){
		if(confirm("Are you sure?")){
			Meteor.call("makePresent", this.props.contact._id);
		}
	}

	setAsGraduated(){
		if(confirm("Are you sure? This cannot be undone.")){
			Meteor.call("makeGraduated", this.props.contact._id);
		}
	}

	setAsAbsent(){
		if(confirm("Are you sure?")){
			Meteor.call("makeAbsent", this.props.contact._id);
		}
	}

	setOutOfScope(){
		if(confirm("Are you sure? This cannot be undone.")){
			Meteor.call("makeOutOfScope", this.props.contact._id);
		}
	}

	setAsUser(){
		if(confirm("Are you sure? This cannot be undone.")){
			Meteor.call("makeUser", this.props.contact._id);
		}
	}

  remove(){
    if(confirm("Only remove a contact if it is a mistake creation.")){
			routeTo("people");
      this.props.contact.remove();
    }
  }

  render() {
		let contact = this.props.contact;
		if(!!this.props.cid){
			contact = this.getContact();
		}
    var disable = true;
    var viewmember = false;

    if(contact.isCurrentUser()||checkPermission("contactdetails")){
      disable = false;
    }
    if((contact.isCurrentUser()||checkPermission("memberdetail"))&&contact.isMember()){
      viewmember = true;
    }

    return (
      <div className="row">
        {(contact.isCurrentUser()&&!contact.isMember())&&
          <MemberForm ref="becmemwin" />}
        <div className="col s12">
          {/*Contact profile header here: name, picture, wall picture*/}
          <div className="card">{/*
            <div className="card-image">
              <img src="/images/defaultEventSmall.png" style={{width: "100%"}}/>
					</div>e*/}
            <div className="card-content">
              <span className="card-title">
                <img src="/images/defaultPic.png" style={{width: "10%", verticalAlign: "middle", margin: "5px", marginBottom: "7px"}} className="circle responsive-img" />
                {contact?contact.name:""}
              </span>
              {(contact.isCurrentUser()&&!contact.isMember())&&
                <a className="waves-effect waves-light btn blue right" onClick={this.openMemberOverlay.bind(this)}>Become a Member</a>
              }

              {(checkPermission("tickets")&&contact.hasTicket()&&!contact.isCurrentUser())&&
                <a className="waves-effect waves-light btn right" onClick={this.openTicket.bind(this)}>
                  Ticket # {contact.getTicket().ticketnum}
                </a>
              }

            </div>
          </div>
        </div>
        <div className="col s12 m6 l6">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Contact Information</span>

							<ContactName contact={contact} disabled={disable} />
							<ContactEmail contact={contact} disabled={disable} />
							<ContactPhone contact={contact} disabled={disable} />
							<ContactNewsletter contact={contact} disabled={disable} />

							{!viewmember&&
								<ContactMajor contact={contact} disabled={disable} />
							}

            </div>
          </div>
          {viewmember&&
						<div className="card">
							<div className="card-content">
								<span className="card-title">Ethnicity & Gender</span>
                <p>Ethnicity:</p>
                <ContactIntl contact={contact} disabled={disable} />
                <ContactGender contact={contact} disabled={disable} />
							</div>
						</div>}
          <AddressForm contact={contact} disabled={disable} addresses={contact.getAddresses()} />
        </div>
        <div className="col s12 m6 l6">
          {viewmember&&
            <div className="card">
              <div className="card-content">
                <span className="card-title">Involvement</span>
								<p>Campus Affiliations</p>
								<CampusAffiliations contact={contact} disabled={disable}  />
								<p>Community Life</p>
								<CommunityLife contact={contact} disabled={disable} />
              </div>
            </div>}
          <div className="card">
            <div className="card-content">
              <span className="card-title">Bio</span>
							<ContactBio contact={contact} disabled={disable} />
            </div>
          </div>
					{viewmember&&
						<div className="card">
							<div className="card-content">
								<span className="card-title">University Info</span>
								<ContactMajor contact={contact} disabled={disable} />
								<ContactGradTerm contact={contact} disabled={disable}  parent={this} />
								<ContactCurrYear contact={contact} disabled={disable} />
							</div>
						</div>}
          <div className="card">
            <div className="card-content">
              <span className="card-title">Events</span>
              <ul className="collection">
                {this.getEvents().map((event)=>{
                  return <Event key={event._id} event={event} />
                })}
              </ul>

              {(!this.state.viewallevents && this.getEvents().length > 3) &&
                <a onClick={this.viewAllEvents.bind(this)} className="btn">View All</a>
              }

            </div>
          </div>
        </div>
				{this.props.modal&&
					<div>
						{
							(
								checkPermission("admin")&&
								contact.isMember()&&
								!contact.isGraduated()
							) &&
							<div className="row">
								<div className="col s12">
									<a className="waves-effect waves-light btn-flat left"
										onClick={this.setAsGraduated.bind(this)}>Mark Graduated</a>
								</div>
							</div>
						}
						{
							(
								checkPermission("admin")&&
								!contact.isPresent()
							) &&
							<div className="row">
								<div className="col s12">
									<a className="waves-effect waves-light btn-flat left"
										onClick={this.setAsPresent.bind(this)}>Mark Present</a>
								</div>
							</div>
						}
						{
							(
								checkPermission("admin")&&
								!contact.isAbsent()
							) &&
							<div className="row">
								<div className="col s12">
									<a className="waves-effect waves-light btn-flat left"
										onClick={this.setAsAbsent.bind(this)}>Mark Absent</a>
								</div>
							</div>
						}
						{
							(
								checkPermission("admin")&&
								!contact.isOutOfScope()
							) &&
							<div className="row">
								<div className="col s12">
									<a className="waves-effect waves-light btn-flat left"
										onClick={this.setOutOfScope.bind(this)}>Mark Out of Scope</a>
								</div>
							</div>
						}
						{
							(
								checkPermission("admin")&&
								!contact.isUser()
							) &&
							<div className="row">
								<div className="col s12">
									<a className="waves-effect waves-light btn-flat left"
										onClick={this.setAsUser.bind(this)}>Mark user</a>
								</div>
							</div>
						}
						{
							(
								checkPermission("removecontact")&&
								!contact.isDeleted()
							) &&
							<div className="row">
								<div className="col s12">
									<a className="waves-effect waves-light btn-flat left"
										onClick={this.remove.bind(this)}>Remove Contact</a>
								</div>
							</div>
						}
					</div>
				}

        {(this.props.modal&&contact.hasTicket())&&<div id="ticketmodal" className="modal bottom-sheet modal-fixed-footer" style={{height: "100%"}}>
          <div className="modal-content">
            <EditTicketForm ticket={this.getTicket()} modal={false} />
          </div>
          <div className="modal-footer">
            <a className="btn-flat modal-action modal-close waves-effect waves-light">Close</a>
            <a className="btn modal-action modal-close" href={"/tickets/"+this.getTicket()._id}>Open Ticket Page</a>
          </div>
        </div>}
      </div>
    )
  }
}
