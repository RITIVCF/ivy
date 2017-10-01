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

export default class GroupsWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Groups: Meteor.subscribe("Structures"),
        Contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Groups.stop();
    this.state.subscription.Contacts.stop();
    //this.state.subscription.Users.stop();
  }

  componentDidMount(){
//    $('ul.tabs').tabs();
  }

  setActiveGroup(id){
    Meteor.call("setGroupsView", id);
  }

  toggleInfoBar(){
    Meteor.call("toggleGroupsInfoBar");
  }

  getSubHeader(){
    /*<ul className="right">
    }<li className="active" onClick={this.toggleInfoBar.bind(this)}><a className="waves-effect waves-light">
      <i className="material-icons black-text">{Meteor.user().preferences.groups_infobar?"info":"info_outline"}</i></a></li>
  </ul>*/
    // Mailing list
    // Strategic Groups
    // Roles
    // Permission Groups
    // Small Groups
    return (
      <ul className="tabs blue-text">
        <li className="tab col s3">
          <a onClick={this.setActiveGroup.bind(this,"Team")}
            className={Meteor.user().preferences.groups_view=="Team"?"active":""}>Ministry Teams</a>
        </li>
        <li className="tab col s3">
          <a onClick={this.setActiveGroup.bind(this,"Role")}
            className={Meteor.user().preferences.groups_view=="Role"?"active":""}>Roles</a>
        </li>
        <li className="tab col s3">
          <a onClick={this.setActiveGroup.bind(this,"Permission Group")}
            className={Meteor.user().preferences.groups_view=="Permission Group"?"active":""}>Permission Groups</a>
        </li>
        <li className="tab col s3">
          <a onClick={this.setActiveGroup.bind(this,"Small Group")}
            className={Meteor.user().preferences.groups_view=="Small Group"?"active":""}>Small Groups</a>
        </li>
      </ul>)

  }

  getInfoBar(){
    return <GroupsWorkspace group={Groups.findOne(Session.get("groupselected"))} showPerm={Session.get("groupselected")=="admin"} />
  }

	render() {
    if(!(this.state.subscription.Groups.ready()&&this.state.subscription.Contacts.ready())){
      return (<LoaderCircle />)
    }
		return (
      <MainBox
        content={<GroupsSummary />}
        subheader={this.getSubHeader()}
        showinfobar={false}
        infobar={<div></div>}
        />
    )
	}
}
