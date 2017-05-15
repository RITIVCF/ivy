import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchContact from './ChurchContact.jsx';
import SelectOption from '../../sharedcomponents/SelectOption.jsx';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';


export default class ChurchContactsControls extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      contact: false
    }
  }

  addContact(contact){
    //this.state.contact = contt;
    // console.log(this);
		// console.log(this);
    // console.log(contact);
    // console.log(this.props.ch._id);
    var chid = this.props.ch._id;
    this.props.ch.addContact(contact._id);

    contact.component.state.value='';
    contact.component.forceUpdate();
	}

  /*componentWillUpdate(){
    console.log(this);
    //console.log(contact);
    console.log(this.props.ch._id);
    var chid = this.props.ch._id;
    if(false==true){
        Meteor.call("addChurchContact",this.props.ch._id, this.state.contact._id);
        this.state.contact = false;
    }
    this.refs.contact.state.value='';
    this.refs.contact.forceUpdate();
  }*/

  unset(){
    // does nothing. just needs to be here
  }

  getSelection(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Contacts.find().fetch();
	}

  getContactsInfo(){
    //console.log(this.props.ch.contacts);
    return Meteor.users.find({_id:{$in:this.props.ch.contacts}}).fetch();
  }


  render(){
  	/*if(!this.state.subscription.users.ready()){
  		return (<div>Loading...</div>);
  	}*/
    return(
      <div>
        {/*}<h4>Church Contacts</h4>
      <p>Choose a name from the list to add person</p>*/}
        <SelectUser
          parent={this}
          unset={this.unset.bind(this)}
          initialValue={""}
          label="Add Contact"
          updateUser={this.addContact.bind(this)}
          ref="contact"  />
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.getContactsInfo().map((contact)=>{
								contact = new Contact(contact);
                return <ChurchContact key={contact._id} ch={this.props.ch} contact={contact} />
              })}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
