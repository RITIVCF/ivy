import React, { Component, PropTypes } from 'react'
// Permission component - represents a single todo item

export default class Permission extends Component
{

  changePerm(event){
    console.log(event);
    console.log(event.target);
    console.log(this.refs[this.props.perm.id+"_edit"].value);

    if(event.target.value == "edit"){
      if(this.props.type=="users"){
        Meteor.call("updateEventUserPerm", this.props.eid, this.props.perm.id, true);
      }
      else{
        Meteor.call("updateEventGroupPerm", this.props.eid, this.props.perm.id, true);
      }
    }
    else{
      if(this.props.type=="users"){
        Meteor.call("updateEventUserPerm", this.props.eid, this.props.perm.id, false);
      }
      else{
        Meteor.call("updateEventGroupPerm", this.props.eid, this.props.perm.id, false);
      }
    }
  }

  deleteFunc(event)
  {
    event.preventDefault();
    if(this.props.type=="users"){
      Meteor.call("removeEventUserPerm", this.props.eid, this.props.perm);
    }
    else{
      Meteor.call("removeEventGroupPerm", this.props.eid, this.props.perm);
    }
      // var id = event.target.id;
      // var usrIdStart = id.indexOf("_") + 1;
      // var usrIdEnd = id.lastIndexOf("_");
      // usrId = id.substring(usrIdStart, usrIdEnd);
      // if(id.indexOf("user") != -1)
      // {
      //     delete this.state.permissions.users[usrId];
      // }
      // else
      // {
      //     delete this.state.permissions.groups[usrId];
      // }
      //this.submitChanges();
//        this.forceUpdate();
  }


    render()
    {
        // Give permissions a different className when they are checked off,
        // so that we can style them nicely in CSS
        var text = "";
        var type = this.props.type;
        var permHolderId = 0;//this.props.permHolder[0];
        if(type == "groups")
        {
            // var groups = this.props.groups;
            // for(var i = 0; i < groups.length; i++)
            // {
            //     if(this.props.permHolder == groups[i]._id)
            //     {
            //         text = groups[i].text;
            //         break;
            //     }
            // }
            text = Groups.findOne(this.props.perm.id).name;
        }
        else
        {
            // var users = this.props.users;
            // for(var i = 0; i < users.length; i++)
            // {
            //     if(permHolderId == users[i]._id)
            //     {
            //         text = users[i].name;
            //         break;
            //     }
            // }
            text = Contacts.findOne(Meteor.users.findOne(this.props.perm.id).contact).name;
        }

        type += "Perm";
        return (
            <tr id={'"permission_' + permHolderId + '"'}>

                {/*}<div className="permHolder">*/}
                  <td><span aria-hidden="true" onClick={this.deleteFunc.bind(this)}  className="glyphicon glyphicon-trash"  ></span></td>
                  <td>
                    {text}
                  </td>
                {/*}</div>
                <div className="editButtonWrapper">
                    {/*}<input
                      checked={type == "usersPerm" ?
                      this.props.parent.state.permissions.users[permHolderId] :
                      this.props.parent.state.permissions.groups[permHolderId]}
                      type="radio"
                      name={'"permLevel_' + permHolderId + '_' + type + '"'}
                      id={'edit_' + permHolderId + '_' + type}
                      onChange={this.props.clickFunc.bind(this.props.parent)}
                      style={{width:"initial", height:"initial"}} /> >*/}
                      <td>
                    <input checked={this.props.perm.edit}
                      type="radio" name={this.props.perm.id}
                      ref={this.props.perm.id+"_edit"}
                      value={"edit"} onClick={this.changePerm.bind(this)}
                      style={{width: "initial", height: "initial"}} />

                    {/*}</div>*/}
                </td>
                {/*}<div className="viewButtonWrapper">
                  {/*  <input
                      checked={type == "usersPerm" ?
                        !this.props.parent.state.permissions.users[permHolderId] :
                        !this.props.parent.state.permissions.groups[permHolderId]}
                        type="radio"
                        name={'"permLevel_' + permHolderId + '_' + type + '"'}
                        id={'view_' + permHolderId + '_' + type}
                        onChange={this.props.clickFunc.bind(this.props.parent)}
                        style={{width:"initial", height:"initial"}} />  */}
                        <td>
                    <input checked={!this.props.perm.edit}
                      type="radio" name={this.props.perm.id}
                      ref={this.props.perm.id+"_view"}
                      value={"view"} onClick={this.changePerm.bind(this)}
                      style={{width: "initial", height: "initial"}} />
                    {/*}</div>*/}
                    </td>
                    {/*<td>
                }<div className="deleteButtonWrapper">
                    {/*<span className="glyphicon glyphicon-trash" aria-hidden="true" id={'delete_' + permHolderId + '_' + type} onClick={this.deleteFunc.bind(this)}></span>
                    <button type="button" className="close" aria-label="Close" onClick={this.deleteFunc.bind(this)}><span aria-hidden="true">&times;</span></button>
                    </td>*/}
                {/*}</div>*/}
            </tr>
        );
    }
}

Permission.propTypes = {
    // This component gets the permission to display through a React prop.
    // We can use propTypes to indicate it is required
//    permission: PropTypes.object.isRequired,
};
