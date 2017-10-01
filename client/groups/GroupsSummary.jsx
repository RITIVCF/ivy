import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupSingle from './GroupSingle.jsx';
import NewGroupControl from './NewGroupControl.jsx';

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

    if(this.refs.name.value!=""){
      Meteor.call("addGroup", this.refs.name.value,
      this.getType());
      this.refs.name.value="";
    }
  }

  groups(){
    return Groups.find({type: this.getType()}).fetch();
  }

	getType(){
		return Meteor.user().preferences.groups_view;
	}

	render() {

		return (
      <div className="">
        <div className="divider"></div>
        <div className="row">
          <NewGroupControl type={this.getType()} />
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
