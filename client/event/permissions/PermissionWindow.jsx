import React, { Component, PropTypes } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Permission from './Permission.jsx';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import SelectTeam from '../../sharedcomponents/SelectTeam.jsx';

//Groups = new Mongo.Collection("groups");

// Permission component - represents a single todo item
export default class PermissionWindow extends TrackerReact(React.Component)
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden",
            permissions: {users: {}, groups: {}}
        };
        this.stateSync();
    }

    componentDidMount(){
			Materialize.updateTextFields();
    }

    shouldComponentUpdate(nextProps, nextState){
      if(this.props.ev.permUser==nextProps.permUser&&
        this.props.ev.permGroup==nextProps.permGroup&&
        this.props.ev.owner==nextProps.owner){
          return false;
      }else{
        return true;
      }
    }

    stateSync()
    {
        let evt = this.props.ev;
        let keys = Object.keys(evt.permUser);
        let gKeys = Object.keys(evt.permGroup);
        for(var i = 0; i < keys.length; i++)
        {
            this.state.permissions.users[keys[i]] = evt.permUser[keys[i]];
        }
        for(var i = 0; i < gKeys.length; i++)
        {
            this.state.permissions.groups[gKeys[i]] = evt.permGroup[gKeys[i]];
        }
    }

    users()
    {
        var users = Meteor.users.find({}).fetch();
        // users.forEach(function(user){
        //   user.name = Meteor.findOne(user.contact).name;
        // });
        return users;
    }

    groups()
    {
        return Groups.find({}).fetch();
    }

    setPerm(event)
    {

    }

    addGroupPerm(group){
      Meteor.call("addEventGroupPerm", this.props.ev._id, group._id);
      //user.component.forceUpdate();
    }

    addUserPerm(user)
    {
      Meteor.call("addEventUserPerm", this.props.ev._id, user._id);

    }

    submitChanges()
    {
      //  Meteor.call("updateEventPermissions", this.props.ev, this.state.permissions.users, this.state.permissions.groups);
    }

    getEvent(){
  		//return Events.find({_id: this.props.eid}).fetch();
  		return Events.findOne(this.props.ev._id);
  	}

    renderPermissions(permHolders, type)
    {
        return Object.keys(permHolders).map((permHolder) => {
                    <Permission key={permHolder._id} permHolder={[permHolder, permHolders[permHolder]]} type={type} groups={this.groups()} users={this.users()} clickFunc={this.setPerm} parent={this} deleteFunc={this.deletePerm} />
        });
    }



    changeOwner(newowner)
    {
        if(confirm("Once the owner changes, you will not be able to make additional changes. Are you sure you want to continue?"))
        {
          if(newowner.emails[0].verified==false){
            if(confirm("This user does not have an account. Are you sure?")){
                Meteor.call("changeEventOwner", this.props.ev._id, newowner._id);
            }
          }
          else{
            Meteor.call("changeEventOwner", this.props.ev._id, newowner._id);
          }

        }
    }

    unset(){

    }



    render()
    {
      var event = this.props.ev;
      var owner = Meteor.users.findOne(event.owner);

      var permUsers = event.permUser;
      var permGroups = event.permGroup;

      return (
				<Row>
					<Column>
						<Row>
							<div className="col s12 m5 l3">
								<SelectUser
									parent={this}
									id={"owner"}
									label="Event Leader"
									unset={this.unset.bind(this)}
									updateUser={this.changeOwner.bind(this)}
									initialValue={owner.name}
									ref={"owner"}
								/>
							</div>
							<div className="col s12 m2 l6"></div>
							<div className="col s12 m5 l3">
								<label>Add Group:
									<SelectTeam
										parent={this}
										id={"group"}
										unset={this.unset.bind(this)}
										updateContact={this.addGroupPerm.bind(this)}
										initialValue={""}
										ref={"group"}
									/></label><br/>

								<SelectUser
									parent={this}
									id={"user"}
									label="Add User"
									unset={this.unset.bind(this)}
									updateUser={this.addUserPerm.bind(this)}
									initialValue={""}
									ref={"user"}
								/>
							</div>
						</Row>
		        <Row>
							<Column>
								<table>
									<thead>
										<tr>
											<th>Remove</th>
											<th>Group/User Name</th>
											<th>Edit</th>
											<th>View Only</th>
										</tr>
									</thead>
									<tbody>
										{event.permGroup.map( (perm,i)=>{
											return <Permission key={perm.id+"group"+i} perm={perm} eid={this.props.ev._id} type={"groups"} />
										})}
										{event.permUser.map( (perm,i)=>{
											return <Permission key={perm.id+"user"+i} perm={perm} eid={this.props.ev._id} type={"users"} />
										})}
									</tbody>
								</table>
							</Column>
						</Row>
					</Column>
				</Row>
			)
    }
}
