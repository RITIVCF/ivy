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
import NewAddressModal from './NewAddressModal.jsx';
import Event from './Event.jsx';


export default class ContactProfile extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    this.state = {
      numevents: 3
    }
  }
  /*
  componentWillUnmount() {
    this.state.subscription.Ethnicities.stop();
    this.state.subscription.user.stop();
  }*/

  componentDidMount(){
    $('select').material_select();
  }


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
        return Meteor.user(); //s.find({_id : Meteor.userId()}).fetch();
    }
    //console.log("not undefined so get contact:");
    return Meteor.users.findOne(this.props.cid);
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

  getEvents(){
    if(this.props.cid){
      var id = this.props.cid;
    }
    else{
      var id = Meteor.userId();
    }
    return Events.find({"attendees._id":id}, {sort:{start:-1},limit: this.state.numevents}).fetch();
  }


  openMemberOverlay(){
    //this.refs.becmemwin.openOverlay();
    $("#memberform").appendTo("body").modal("open");
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
    //if(this.props.parent.state.subscription.contact.ready()){
      contact = this.contactDetails();
      if(Meteor.userId() == contact._id||checkPermission("contactdetails")){
        disable = false;
      }
      if(Meteor.userId() == contact._id||checkPermission("memberdetail")){
        viewmember = true;
      }
    //}
    //let contact = this.contactDetails();
    ////console.log(contact);
    if(contact){
        document.title = (this.props.cid==='undefined') ? "Ivy - My Profile" : "Ivy - "+contact.name+"'s Profile";
    }
    else{
      document.title = "Ivy - Contact Profile";
    }

    return (
      <div className="row">
        {contact ? (!contact.member)
           ? <MemberForm ref="becmemwin" />:"":""}
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
                {Meteor.user()?contact?Meteor.userId()==contact._id?(!contact.member) ?
              <a className="waves-effect waves-light btn blue right" onClick={this.openMemberOverlay.bind(this)}>Become a Member</a>
              :"":"":"":""}
              {checkPermission("tickets")&&contact.ticket?(this.props.cid==Meteor.user().contact)?
                <div className="row">
                  <div className="col s12">

                  <a className="waves-effect waves-light btn right" href={"/tickets/"+contact.ticket}>
                    Ticket # {this.getTicket().ticketnum}
                  </a>
                </div>
                </div>
                :
                <a className="waves-effect waves-light btn right" href={"/tickets/"+contact.ticket}>
                  Ticket # {this.getTicket().ticketnum}
                </a>
                :""}
            </div>
          </div>
        </div>
        <div className="col s12 m6 l6">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Contact Information</span>
                {contact ?
                  <div><ContactName contact={contact} disabled={disable} />
                <ContactEmail contact={contact} disabled={disable} />
                <ContactPhone contact={contact} disabled={disable} />
                <ContactNewsletter contact={contact} disabled={disable} />
                </div>:""}
                {contact?!contact.member ?
                    <ContactMajor contact={contact} disabled={disable} />:"":""}

            </div>
          </div>
          {contact ?
            contact.member&&viewmember ?
          <div className="card">
            <div className="card-content">
              <span className="card-title">Ethnicity & Gender</span>
                <p>Ethnicity:</p>
                <ContactIntl contact={contact} disabled={disable} />
                <ContactGender contact={contact} disabled={disable} />
            </div>
          </div>:<div></div>:<div></div>}
          <div className="card">
            <div className="card-content">
              <span className="card-title">Addresses</span>
                {contact ?
                <AddressForm contact={contact} disabled={disable} addresses={contact.addresses} />:""}
            </div>
          </div>
          <NewAddressModal />
        </div>
        <div className="col s12 m6 l6">
          {contact ?
            contact.member&&viewmember ?
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Involvement</span>
                    <p>Campus Affiliations</p>
                    <CampusAffiliations contact={contact} disabled={disable}  />
                    <p>Community Life</p>
                    <CommunityLife contact={contact} disabled={disable} />
                </div>
              </div>
          :"":""}
          <div className="card">
            <div className="card-content">
              <span className="card-title">Bio</span>
                {contact ?
                  <ContactBio contact={contact} disabled={disable} />
                  :""}
            </div>
          </div>
          {contact ?
            contact.member&&viewmember?
          <div className="card">
            <div className="card-content">
              <span className="card-title">University Info</span>
                <ContactMajor contact={contact} disabled={disable} />
                <ContactGradTerm contact={contact} disabled={disable}  parent={this} />
                <ContactCurrYear contact={contact} disabled={disable} />
            </div>
          </div>:<div></div>:<div></div>}
          <div className="card">
            <div className="card-content">
              <span className="card-title">Events</span>
              <ul className="collection">
                {this.getEvents().map((event)=>{
                  return <Event key={event._id} event={event} />
                })}
              </ul>
            </div>
          </div>
        </div>
        {checkPermission("removecontact")?
        <div className="row">
          <div className="col s12">
            <a className="waves-effect waves-light btn-flat left"
              onClick={this.remove.bind(this)}>Remove Contact</a>
          </div>
        </div>
        :""}
      </div>
    )
  }
}
