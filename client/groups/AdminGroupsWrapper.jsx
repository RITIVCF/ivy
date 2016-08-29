import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
//import GroupSingle from './GroupSingle.jsx';
import GroupsSummary from './GroupsSummary.jsx';
//import ChurchSingle from './ChurchSingle.jsx';
//import ChurchWorkspace from './GroupsWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Groups = new Mongo.Collection("groups");

export default class AdminGroupsWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Groups: Meteor.subscribe("adminGroups"),
        Users: Meteor.subscribe("allUsers"),
        Contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Groups.stop();
    this.state.subscription.Contacts.stop();
    this.state.subscription.Users.stop();
  }

	render() {
    document.title = "Ivy - Groups Dashboard";
		return (
      <div>
        <GroupsSummary admin={true} parent={this} />
      </div>
    )
	}
}
