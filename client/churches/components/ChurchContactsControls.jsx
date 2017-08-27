import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchContact from './ChurchContact.jsx';
import SelectOption from '../../sharedcomponents/SelectOption.jsx';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import Contact from '/lib/classes/Contact.js';

export default class ChurchContactsControls extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      contact: false
    }
  }

  addContact(contact){
    var chid = this.props.ch._id;
    this.props.ch.addContact(contact._id);

    contact.component.state.value='';
    contact.component.forceUpdate();
	}

  unset(){
    // does nothing. just needs to be here
  }

  getSelection(){
		return Contacts.find().fetch();
	}

  getContactsInfo(){
    return Meteor.users.find({_id:{$in:this.props.ch.contacts}}).fetch();
  }


  render(){
    return(
      <div>
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
