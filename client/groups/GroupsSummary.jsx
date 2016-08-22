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
      <div className="container-fluid">
  			<div className="row">
  				<div className="col-sm-3 col-lg-2">
  					<nav className="navbar navbar-default navbar-fixed-side">
              <form className="navbar-form" onSubmit={this.createNew.bind(this)}>
                <div className="form-group">
                  <input type="text" ref="name" className="form-control" placeholder="New Group Name..." />
                </div>
              </form>
  					</nav>
  				</div>
  				<div className="col-sm-9 col-lg-10">
            <h1>Active Groups</h1>
            {this.groups().map( (group)=>{
                return <GroupSingle key={group._id} group={group} parent={this} />
            })}
          </div>
        </div>
      </div>
    )
	}
}
