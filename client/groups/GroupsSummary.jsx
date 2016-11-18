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

  componentDidMount() {
    $('.collapsible').collapsible();
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
      <div className="container">
        <div className="row">
          <div className="col s8">
            <h1>Active Groups</h1>
          </div>
          <form onSubmit={this.createNew.bind(this)}>
            <div className="input-field col s4">
              <input type="text" ref="name"  />
              <label>New Group</label>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="col s12">
            <p>Enter a new group name and press enter, or select a group from below to edit.</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="row">
          {this.props.sub.Contacts.ready()?this.groups().map( (group)=>{
              return <GroupSingle key={group._id} group={group} sub={this.props.sub} parent={this} />
          }):<div></div>}
        </div>
      </div>
    )
	}
}
