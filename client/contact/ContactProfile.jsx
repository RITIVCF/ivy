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
import BecomeMemberWindow from '../member/BecomeMemberWindow.jsx';


export default class ContactProfile extends TrackerReact(React.Component){
  /*constructor(props) {
    super(props);
    if(typeof props.cid === 'undefined'){
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
          contact: Meteor.subscribe("contactSelf", Meteor.userId())
        }
      }
    }
    else{
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
          user: Meteor.subscribe("userSelf", this.props.cid)
          }
        };

    }
  }

  componentWillUnmount() {
    this.state.subscription.Ethnicities.stop();
    this.state.subscription.user.stop();
  }*/


  contactDetails() {
    ////console.log("cid:");
    ////console.log(this.props.cid);
    if(typeof this.props.cid === 'undefined'){
        //console.log("Undefined so get from Meteor.user()");
        //console.log(Meteor.user());
        //console.log("All contacts");
        //console.log(Contacts.find().fetch());
        //console.log("user().contact:");
        //console.log(Meteor.user().contact);
        return Contacts.findOne(Meteor.user().contact); //s.find({_id : Meteor.userId()}).fetch();
    }
    //console.log("not undefined so get contact:");
    return Contacts.findOne(this.props.cid);
	}


  handleIntlChange(event){
    event.preventDefault();
    var intl = this.refs.intl.checked;
    Meteor.call('toggleInternational', intl);
  }

  handleEthnChange(event){
    event.preventDefault();
    var ethn = this.refs.ethn.value;
    Meteor.call('updateEthnicity', ethn);
  }

  openMemberOverlay(){
    this.refs.becmemwin.openOverlay();
  }

  remove(){
    if(confirm("Only remove a contact if it is a mistake creation.")){
      Meteor.call("removeContact", this.props.cid);
      ////console.log("confirmed");
    }
  }

  getTicket(){
    var ticket = Tickets.findOne(this.contactDetails().ticket);
    if(ticket){
      return ticket;
    }
    else {
      return {ticketnum: ''}
    }
  }



  render() {
    var contact;
    var disable = true;
    var viewmember = false;
    ////console.log(this.state.subscription.user.ready());
    //console.log("contact:");
    if(this.props.parent.state.subscription.contact.ready()){
      contact = this.contactDetails();
      if(Meteor.user().contact == contact._id||checkPermission("contactdetails")){
        disable = false;
      }
      if(Meteor.user().contact == contact._id||checkPermission("memberdetail")){
        viewmember = true;
      }
    }
    //let contact = this.contactDetails();
    ////console.log(contact);
    if(this.props.parent.state.subscription.contact.ready()&&contact){
        document.title = (this.props.cid==='undefined') ? "Ivy - My Profile" : "Ivy - "+contact.name+"'s Profile";
    }
    else{
      document.title = "Ivy - Contact Profile";
    }

    return (
      <div className="container-fluid">
        {this.props.parent.state.subscription.contact.ready() ? contact ? (!contact.member)
           ? <BecomeMemberWindow ref="becmemwin" subscription={this.props.parent.state.subscription.options}
           />:"":"":""}
        <div className="row">
  				<div className="col-sm-3 col-lg-2">
  					<nav className="navbar navbar-default navbar-fixed-side">
              {checkPermission("tickets")&&this.props.parent.state.subscription.contact.ready()&&contact.ticket&&(contact._id!=Meteor.user().contact)?
                <div><p>Ticket #: {this.getTicket().ticketnum}</p><a href={"/tickets/"+contact.ticket}><button className="btn btn-primary">Go to Ticket</button></a></div>
                :""}
  					</nav>
  				</div>
          <div className="col-sm-9 col-lg-10">
            {this.props.parent.state.subscription.contact.ready()&&contact ?
            (typeof this.props.cid === 'undefined') ? <h1>My Profile</h1> : <h1>{contact.name+"'s"} Profile</h1> : <h1>Contact Profile</h1> }
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2>General Info</h2>
                  </div>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-6">
                        {this.props.parent.state.subscription.contact.ready()&&contact ?
                          <div><ContactName contact={contact} disabled={disable} />
                        <ContactEmail contact={contact} disabled={disable} />
                        <ContactPhone contact={contact} disabled={disable} />
                        <ContactNewsletter contact={contact} disabled={disable} />
                        </div>:""}
                      </div>
                      {this.props.parent.state.subscription.contact.ready()&&contact ?
                        contact.member&&viewmember ?
                      <div className="col-md-6">
                        <h3>Campus Affiliations</h3>
                        <CampusAffiliations contact={contact} disabled={disable}  subscription={this.props.subscriptions.options} />
                        <h3>Community Life</h3>
                        <CommunityLife contact={contact} disabled={disable}  subscription={this.props.subscriptions.options} />
                      </div>
                    :"":""}
                    </div>
                    {this.props.parent.state.subscription.contact.ready()&&contact ?
                    <div className="row">
                      <div className={contact.member?"col-md-12":"col-md-6"}>
                        <ContactBio contact={contact} disabled={disable} />
                      </div>
                    </div>:""}
                    {this.props.parent.state.subscription.contact.ready()&&contact ?
                    <div className="row">
                      <div className="col-md-6">
                        <ContactMajor contact={contact} disabled={disable} />
                      </div>
                    </div>:""}
                    {checkPermission("removecontact")?<button onClick={this.remove.bind(this)}>Remove Contact</button>:""}
                  </div>
                </div>
              </div>

            </div>
            {this.props.parent.state.subscription.contact.ready()&&contact ?
              contact.member&&viewmember ?
            <div className="row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2>Personal Info</h2>
                  </div>
                  <div className="panel-body">
                    <h4>Ethnicity:</h4>
                    <ContactIntl contact={contact} disabled={disable} subscription={this.props.subscriptions.options} />
                    <ContactGender contact={contact} disabled={disable} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2>University Info</h2>
                  </div>
                  <div className="panel-body">
                    <ContactMajor contact={contact} disabled={disable} />
                    <ContactGradTerm contact={contact} disabled={disable}  parent={this} subscription={this.props.subscriptions.options} />
                    <ContactCurrYear contact={contact} disabled={disable} />
                  </div>
                </div>
              </div>
            </div>
            : contact._id==Meteor.user().contact ?
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2>Become a Member</h2>
              </div>
              <div className="panel-body">
                <button onClick={this.openMemberOverlay.bind(this)}>Become a Member</button>
              </div>
            </div>:"":""}
            <div className="row">
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h2>Mailing Addresses</h2>
                  </div>
                  <div className="panel-body">
                    {this.props.parent.state.subscription.contact.ready()&&contact ?
                    <AddressForm contact={contact} disabled={disable} addresses={contact.addresses} />:""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
