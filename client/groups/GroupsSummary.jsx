import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupSingle from './GroupSingle.jsx';
//import ChurchSingle from './ChurchSingle.jsx';
//import ChurchWorkspace from './GroupsWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Groups = new Mongo.Collection("groups");

export default class GroupsSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

  }

  componentWillUnmount() {

  }

  createNew(event){
    event.preventDefault();
    //Meteor.call('addBlankChurch');
    if(this.refs.name.value!=""){
      Meteor.call("addGroup", this.refs.name.value, this.props.admin);
      this.refs.name.value="";
    }
  }


  groups(){
    return Groups.find({admingroup: true}).fetch();
  }


	render() {

		return (
      <div>
      <div className="sidebar">
        <ul>
          <li><input type="text" ref="name" /></li>
          <li><button onClick={this.createNew.bind(this)}>New</button></li>
        </ul>

      </div>
      <div className="summary">
        <div className="groups">
          <h1>Active Groups</h1>
          {this.groups().map( (group)=>{
              return <GroupSingle key={group._id} group={group} parent={this} />
          })}
        </div>
      </div>
      {/*<a href="/groups/old"><button>View old/inactive groups</button></a>  */}
    </div>
  )
	}
}
