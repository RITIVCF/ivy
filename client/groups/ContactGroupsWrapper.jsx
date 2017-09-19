import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
//import GroupSingle from './GroupSingle.jsx';
import GroupsSummary from './GroupsSummary.jsx';
//import ChurchSingle from './ChurchSingle.jsx';
//import ChurchWorkspace from './GroupsWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Groups = new Mongo.Collection("groups");

export default class ContactGroupsWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Groups: Meteor.subscribe("contactGroups"),
        Contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Groups.stop();
    this.state.subscription.Contacts.stop();
  }

	render() {
    if(!checkPermission("admin")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
		return (
      <div>
        <h1>Contact Groups Dashboard</h1>
        <GroupsSummary admin={false} parent={this} />
      </div>
    )
	}
}
