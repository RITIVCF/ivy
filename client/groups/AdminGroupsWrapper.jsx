import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
//import GroupSingle from './GroupSingle.jsx';
import GroupsSummary from './GroupsSummary.jsx';
import InfoBar from '../InfoBar.jsx';
import SubHeader from '../layouts/SubHeader.jsx';
//import ChurchSingle from './ChurchSingle.jsx';
import GroupsWorkspace from './GroupWorkspace.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import MainBox from '../MainBox.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Groups = new Mongo.Collection("groups");

export default class AdminGroupsWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Groups: Meteor.subscribe("adminGroups"),
        Contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Groups.stop();
    this.state.subscription.Contacts.stop();
    //this.state.subscription.Users.stop();
  }

  toggleInfoBar(){
    Meteor.call("toggleGroupsInfoBar");
  }

  getSubHeader(){
    return <ul className="right">
      <li className="active" onClick={this.toggleInfoBar.bind(this)}><a className="waves-effect waves-light">
        <i className="material-icons black-text">{Meteor.user().preferences.groups_infobar?"info":"info_outline"}</i></a></li>
    </ul>
  }

  getInfoBar(){
    return <GroupsWorkspace group={Groups.findOne(Session.get("groupselected"))} showPerm={Session.get("groupselected")=="admin"} />
  }

	render() {
    document.title = "Ivy - Groups Dashboard";
    if(!(this.state.subscription.Groups.ready()&&this.state.subscription.Contacts.ready())){
      return (<LoaderCircle />)
    }
		return (
      <MainBox
        content={<GroupsSummary admin={true} parent={this} sub={this.state.subscription} />}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.groups_infobar}
        infobar={this.getInfoBar()}
        />
    )
	}
}
