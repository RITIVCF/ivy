import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupSingle from './GroupSingle.jsx';
import NewGroupModal from './NewGroupModal.jsx';
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
    $('ul.tabs').tabs();
  }

  createNew(event){
    event.preventDefault();
    //Meteor.call('addBlankChurch');
    if(this.refs.name.value!=""){
      Meteor.call("addGroup", this.refs.name.value,
      Meteor.user().preferences.groups_view);
      this.refs.name.value="";
    }
  }

  openNew(){
    //$("newgroupmodal").modal("open");
    this.refs.newgroupmodal.open();
  }


  groups(){
    return Groups.find({type: Meteor.user().preferences.groups_view}).fetch();
  }


	render() {

		return (
      <div className="">
        <NewGroupModal ref="newgroupmodal" type={Meteor.user().preferences.groups_view} />
        {/*<div className="row">
          <div className="col s8">

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
            <p>Select a group to edit, or create a new one.</p>
          </div>
        </div>*/}
        <div className="divider"></div>
        <div className="row">
          <div className="col s12 m6 l4">
            <div className={"card left"}
              style={{width: "100%"}} onClick={this.openNew.bind(this)}>
              <div className="card-content">
                <span className="card-title">Add New</span>

              </div>
            </div>
          </div>
          {this.groups().map( (group)=>{
              return <GroupSingle key={group._id}
                selected={Session.get("groupselected")==group._id}
                group={group} sub={this.props.sub} parent={this} />
          })}
        </div>
      </div>
    )
	}
}
