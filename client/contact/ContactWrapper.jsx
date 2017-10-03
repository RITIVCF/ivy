import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../MainBox.jsx';
import ContactPreview from './ContactPreview.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
import MaterialIcon from '../sharedcomponents/MaterialIcon.jsx';

import ContactSummary from './ContactSummary.jsx';
//Contacts = new Mongo.Collection('contacts');

export default class ContactWrapper extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {
        Contacts: Meteor.subscribe("allContacts", "All", "Name"),
        Events: Meteor.subscribe("EventAttendees")
      }
    };


  }

  componentWillUnmount() {
    this.state.subscription.Contacts.stop();
    this.state.subscription.Events.stop();
  }

  toggleView(){
    Meteor.call("toggleContactsView");
  }

  toggleInfoBar(){
    Meteor.call("toggleContactsInfoBar");
  }

	goToNewContact(){
		routeTo("newcontactform");
	}

  getSubHeader(){
		let left = (<ul key={0}>
			{checkPermission('admin')&&
				<li onClick={this.goToNewContact.bind(this)}>
					<a><MaterialIcon icon="add" className="black-text" /></a>
				</li>
			}
		</ul>);

    let right = <ul className="right" key={1} >
      {Meteor.user().preferences.contacts_view=="Tile"?
        <li onClick={this.toggleView.bind(this)}><a>
          <i className="material-icons black-text">view_module</i></a></li>
			:<li onClick={this.toggleView.bind(this)}><a>
        <i className="material-icons black-text">view_list</i></a></li>}
      <li onClick={this.toggleInfoBar.bind(this)}><a>
        <i className="material-icons black-text">{Meteor.user().preferences.contacts_infobar?"info":"info_outline"}</i></a></li>
    </ul>;

		return [
			left,
			right
		];

  }

  render() {
    /*if(!this.state.subscription.Contacts.ready()){
      return (<LoaderCircle />)
    }*/
    if(!checkPermission("contacts")){
      return <NoPerm />
    }

    var status;
    var perm = checkPermission("ticket");
    return (
      <MainBox
        content={<ContactSummary perm={perm} />}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.contacts_infobar}
        infobar={<ContactPreview cid={Session.get("conselected")} />}
        />
    )
  }
}
