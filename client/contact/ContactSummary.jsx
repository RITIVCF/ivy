import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ContactSingle from './ContactSingle.jsx';
//import NewContactWrapper from './NewContactWindow.jsx';

export default class ContactSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Contacts: Meteor.subscribe("allContacts", "All", "Name")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Contacts.stop();
  }

  newContact(event){
		event.preventDefault();
  	//this.refs.newcontactoverlay.openOverlay();
    FlowRouter.go("/forms/contacts/new");
  }

  changeFilter(){
		//this.state.filter = this.refs.filter.value;
		//this.setState({filter: this.refs.filter.value});
    console.log("filter change");
    console.log(this.refs.filter.value);
    console.log(this.refs.sort.value);
    this.state.subscription.Contacts.stop();
    this.state.subscription.Contacts = Meteor.subscribe("allContacts", this.refs.filter.value, this.refs.sort.value);
    //this.setState({subscription: {Contacts: Meteor.subscribe("allContacts", this.refs.filter.value, this.refs.sort.value)}});
	}

  changeSort(){
		//this.state.sort = this.refs.sort.value;
		//this.setState({sort: this.refs.sort.value});
    console.log("sort change");
    this.state.subscription.Contacts.stop();
    this.state.subscription.Contacts = Meteor.subscribe("allContacts", this.refs.filter.value, this.refs.sort.value);
	}


  contacts(){
    return Contacts.find().fetch();

  }


	render() {
    document.title="Ivy - Contact Dashboard";
    var status;
    var perm = checkPermission("ticket");
		return (
      <div>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">
              <div className="col-sm-12">
                <button className="btn btn-primary"
                  onClick={this.newContact.bind(this)}>New</button>
              </div>
            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <h2>All Contacts</h2>

            <div className="panel panel-default">
              <div className="panel-body">
                <label>Filter: <select ref="filter" onChange={this.changeFilter.bind(this)} value={this.state.filter}>
        					<option value={"All"}>All</option>
        					<option value={"Contact"}>Contact</option>
        					<option value={"Member"}>Member</option>
        				</select></label>
                <label>Sort: <select ref="sort" onChange={this.changeSort.bind(this)} value={this.state.sort}>
          					<option value={"Name"}>Name</option>
          					<option value={"Status"}>Status</option>
          				{/*}	<option value={"Status"}>Status</option> */}
          				</select></label>
              </div>
              <table className="table table-hover table-responsive">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Newsletter</th>
                    <th>Funnel Status</th>
                    {perm?<th>Ticket</th>:""}
                  </tr>
                </thead>
                <tbody>
                  {this.contacts().map( (contact, i) => {
                    console.log(i);
                    if(this.refs.sort){
                      if(this.refs.sort.value == "Status"){
                        if(contact.member != status){
                          console.log("Does not equal.");
                          console.log(status);
                          status = contact.member;
                          console.log(status);
                          i--;
                          return <tr key={status}><td colspan={5}>{status ? "Members":""}</td></tr>
                        }
                      }
                    }
                    return <ContactSingle key={contact._id} contact={contact} perm={perm} parent={this}/>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
	}
}
