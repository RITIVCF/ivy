import React, { Component, PropTypes } from 'react';
import Permission from './Permission.jsx';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import SelectGroup from '../../sharedcomponents/SelectGroup.jsx';

//Groups = new Mongo.Collection("groups");

// Permission component - represents a single todo item
export default class PermissionWindow extends Component
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

    stateSync()
    {
        let evt = this.props.ev; //parent.getEvent();
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

    toggleOverlay()
    {
        if(this.state.overlayState == "hidden")
        {
            this.setState({overlayState: ""});
            this.stateSync();
        }
        else
        {
            this.setState({overlayState: "hidden"});
        }
    }

    users()
    {
        var users = Meteor.users.find({}).fetch();
        users.forEach(function(user){
          user.name = Contacts.findOne(user.contact).name;
        });
        return users;
    }

    groups()
    {
        return Groups.find({}).fetch();
    }

    setPerm(event)
    {
        // var id = event.target.id;
        // var usrIdStart = id.indexOf("_") + 1;
        // var usrIdEnd = id.lastIndexOf("_");
        // var usrId = id.substring(usrIdStart, usrIdEnd);
        // if(id.indexOf("user") != -1)
        // {
        //     this.state.permissions.users[usrId] = (event.target.id.substring(0, 4) == "edit");
        // }
        // else
        // {
        //     this.state.permissions.groups[usrId] = (event.target.id.substring(0, 4) == "edit");
        // }
        // this.forceUpdate();
        // this.submitChanges();
    }

    addGroupPerm(group){
      Meteor.call("addEventGroupPerm", this.props.ev._id, group._id);
      //user.component.forceUpdate();
    }

    addUserPerm(user)
    {
      Meteor.call("addEventUserPerm", this.props.ev._id, user._id);
      //user.component.forceUpdate();
        // var newOwnerId = ReactDOM.findDOMNode(this.refs.newPermSelect).value;
        // var lastUnderscoreIndex = newOwnerId.lastIndexOf("_");
        // var type = newOwnerId.substring(lastUnderscoreIndex + 1);
        // newOwnerId = newOwnerId.substring(0, lastUnderscoreIndex);
        // if(type == "USER")
        // {
        //     this.state.permissions.users[newOwnerId] = false;
        // }
        // else
        // {
        //     this.state.permissions.groups[newOwnerId] = false;
        // }
        // this.submitChanges();
    }

//     deletePerm(event)
//     {
//         var id = event.target.id;
//         var usrIdStart = id.indexOf("_") + 1;
//         var usrIdEnd = id.lastIndexOf("_");
//         usrId = id.substring(usrIdStart, usrIdEnd);
//         if(id.indexOf("user") != -1)
//         {
//             delete this.state.permissions.users[usrId];
//         }
//         else
//         {
//             delete this.state.permissions.groups[usrId];
//         }
//         this.submitChanges();
// //        this.forceUpdate();
//     }

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
        return Object.keys(permHolders).map((permHolder) => (
                    <Permission key={permHolder._id} permHolder={[permHolder, permHolders[permHolder]]} type={type} groups={this.groups()} users={this.users()} clickFunc={this.setPerm} parent={this} deleteFunc={this.deletePerm} />
        ));
    }

    generateOption(option, optionType)
    {
        var text;
        var id;
        if(optionType == "users")
        {
            text = option.name;
            id = option._id + "_USER";
        }
        else
        {
            text = option.name;
            id = option._id + "_GROUP";
        }
        return (
                <option value={id}>{text}</option>
        );
    }

    generateOptions(options, optionType)
    {
        return options.map((option) => (
                    this.generateOption(option, optionType)
        ));
    }

    changeOwner(newowner)
    {
        //var newOwnerId = this.refs.ownerSelect.value;
        //newOwnerId = newOwnerId.substring(0, newOwnerId.lastIndexOf("_"));
        if(confirm("Once the owner changes, you will not be able to make additional changes. Are you sure you want to continue?"))
        {
            Meteor.call("changeEventOwner", this.props.ev._id, newowner._id);
            this.toggleOverlay();
        }
    }

    unset(){

    }

    printState(){
      //console.log(this.state);
    }

    render()
    {
      if(!this.props.parent.state.subscription.contacts.ready()){
        return <div></div>
      }
        var event = this.props.ev; //parent.getEvent();
        var owner = Meteor.users.findOne(event.owner);//event.username;
        //console.log("Event Owner: "+ event.owner);
        //console.log("Event Owner: "+ owner.contact);
        var name = Contacts.findOne(owner.contact).name;
        //console.log(name);
        var permUsers = event.permUser;
        var permGroups = event.permGroup;

        return (
            <div>
                <div id="overlay" className={this.state.overlayState} onClick={this.toggleOverlay.bind(this)}></div>
                <div id="popup" className={this.state.overlayState}>
                    <h3>Edit {event.name} Permissions</h3>
                    <h5 id="permWindowOwner">Event Owner:
                      <SelectUser
                          parent={this}
                          id={"owner"}
                          unset={this.unset.bind(this)}
                          updateContact={this.changeOwner.bind(this)}
                          initialValue={name}
                          ref={"owner"}
                          />
                      </h5>
                  {/*  <select id="ownerSelect" ref="ownerSelect">
                        {this.generateOptions(this.users(), "users")}
                    </select>
                    <button onClick={this.changeOwner.bind(this)} type="button" id="changeOwner">Change</button>

                    <div id="permBlock">
                        <div id="headerRow">
                            <div id="nameHeader">
                                Group / User Name
                            </div>
                            <div id="editHeader">
                                Edit
                            </div>
                            <div id="viewHeader">
                                View Only
                            </div>
                            <div id="deleteHeader">
                                Delete
                            </div>
                        </div>
                        <div id="permList">
                            {/*this.renderPermissions(permGroups, "groups")*/}
                            {/*this.renderPermissions(permUsers, "users")*/}
                        <table className="table table-striped table-responsive">
                          <thead>
                            <tr>
                              <th>Remove</th>
                              <th>Group/User Name</th>
                              <th>Edit</th>
                              <th>View Only</th>
                              {/*}<th>Delete</th>*/}
                            </tr>
                          </thead>
                          <tbody>
                            {event.permGroup.map( (perm)=>{
                              return <Permission key={perm.id} perm={perm} eid={this.props.ev._id} type={"groups"} />
                            })}
                            {event.permUser.map( (perm)=>{
                              return <Permission key={perm.id} perm={perm} eid={this.props.ev._id} type={"users"} />
                            })}
                            </tbody>
                          </table>
                        {/*}</div>
                    </div>*/}
                    <div id="addPermWrapper">
                      <label>Add Group:
                      <SelectGroup
                				parent={this}
                				id={"group"}
                				unset={this.unset.bind(this)}
                				updateContact={this.addGroupPerm.bind(this)}
                				initialValue={""}
                				ref={"group"}
                				/></label><br/>
                      <label>Add User:
                      <SelectUser
                  				parent={this}
                  				id={"user"}
                  				unset={this.unset.bind(this)}
                  				updateContact={this.addUserPerm.bind(this)}
                  				initialValue={""}
                  				ref={"user"}
                  				/></label>
                      {/*}  <select id="newPermSelect" ref="newPermSelect">
                            {this.generateOptions(this.groups(), "groups")}
                            {this.generateOptions(this.users(), "users")}
                        </select>
                        <button type="button" id="addPermHolder" onClick={this.addPerm.bind(this)}>Add</button>
                        */}

                    </div>
                    <div id="closeWrapper">
                    {/*  <button onClick={this.printState.bind(this)}>Test State</button>*/}
                        <button type="button" id="closeWindow" className="btn btn-info" onClick={this.toggleOverlay.bind(this)}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

PermissionWindow.propTypes = {
    // This component gets the permission to display through a React prop.
    // We can use propTypes to indicate it is required
};
