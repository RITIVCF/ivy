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
      $('.modal').modal();
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

    open()
    {
        $("#permwindow").appendTo("body").modal('open');
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
        return Object.keys(permHolders).map((permHolder) => {
                    <Permission key={permHolder._id} permHolder={[permHolder, permHolders[permHolder]]} type={type} groups={this.groups()} users={this.users()} clickFunc={this.setPerm} parent={this} deleteFunc={this.deletePerm} />
        });
    }



    changeOwner(newowner)
    {
        //var newOwnerId = this.refs.ownerSelect.value;
        //newOwnerId = newOwnerId.substring(0, newOwnerId.lastIndexOf("_"));
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
            //this.toggleOverlay();
        }
    }

    unset(){

    }



    render()
    {
      // if(!Contacts.findOne(Meteor.userId())){
      //   return <div></div>
      // }
        var event = this.props.ev; //parent.getEvent();
        var owner = Meteor.users.findOne(event.owner);//event.username;
        //console.log("Event Owner: "+ event.owner);
        //console.log("Event Owner: "+ owner.contact);
        //var name = Contacts.findOne(owner.contact).name;
        //console.log(name);
        var permUsers = event.permUser;
        var permGroups = event.permGroup;

        return (
          <div id="permwindow" className="modal modal-fixed-footer bottom-sheet">
            <div className="modal-content">
              {/*}<h3>Edit {event.name} Permissions</h3>*/}
              <div className="row">
                <div className="col s12 m5 l3">
                  <SelectUser
                      parent={this}
                      id={"owner"}
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
              </div>

              <div className="row">
                <div className="col s12">
                  <table>
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
                </div>
              </div>
              <div className="row">

              </div>


            </div>
            <div className="modal-footer">
              <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>
        );
    }
}
