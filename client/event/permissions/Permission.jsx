import React, { Component, PropTypes } from 'react'
// Permission component - represents a single todo item

export default class Permission extends Component
{

  changePerm(event){

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
  }


    render()
    {
        // Give permissions a different className when they are checked off,
        // so that we can style them nicely in CSS
        var text = "";
        var type = this.props.type;
        var permHolderId = 0;
        if(type == "groups")
        {
            text = Groups.findOne(this.props.perm.id).name;
        }
        else
        {
            text = Meteor.users.findOne(this.props.perm.id).name;
        }

        type += "Perm";

        return (
            <tr id={'"permission_' + permHolderId + '"'}>
							<td><span aria-hidden="true" onClick={this.deleteFunc.bind(this)}  className="material-icons"  >close</span></td>
							<td>
								<span className="small material-icons">{this.props.type=="groups"?"group":"person"}</span>{text}
							</td>

							<td>
								<input checked={this.props.perm.edit}
									readOnly={true}
									className="with-gap"
									type="radio" name={this.props.perm.id}
									id={this.props.perm.id+"_edit"}
									ref={this.props.perm.id+"_edit"}
									value={"edit"} onClick={this.changePerm.bind(this)}
									style={{width: "initial", height: "initial"}} />
								<label htmlFor={this.props.perm.id+"_edit"}></label>
							</td>

							<td>
								<input checked={!this.props.perm.edit}
									readOnly={true}
									className="with-gap"
									type="radio" name={this.props.perm.id}
									id={this.props.perm.id+"_view"}
									ref={this.props.perm.id+"_view"}
									value={"view"} onClick={this.changePerm.bind(this)}
									style={{width: "initial", height: "initial"}} />
								<label htmlFor={this.props.perm.id+"_view"}></label>
							</td>
            </tr>
        );
    }
}

Permission.propTypes = {
    // This component gets the permission to display through a React prop.
    // We can use propTypes to indicate it is required
//    permission: PropTypes.object.isRequired,
};
