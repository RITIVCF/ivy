import React, { Component, PropTypes } from 'react';
import Permission from './Permission.jsx';

// Permission component - represents a single todo item
export default class PermissionWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden",
        };
    }

    toggleOverlay()
    {
        if(this.state.overlayState == "hidden")
        {
            this.setState({overlayState: ""});
        }
        else
        {
            this.setState({overlayState: "hidden"});
        }
    }

    tmpFunc()
    {

    }

    getEvent(){
  		//console.log(Events.find({_id: this.props.eid}).fetch());
  		//return Events.find({_id: this.props.eid}).fetch();
  		return Events.findOne(this.props.eid);
  	}

    renderPermissions(permHolders, type)
    {
        return permHolders.map((permHolder) => (
                    <Permission key={permHolder._id} permHolder={permHolder} type={type} groups={this.props.parent.props.groups} users={this.props.parent.props.users} clickFunc={this.tmpFunc} parent={this} />
        ));
    }

    render()
    {
        var event = this.props.parent.getEvent();
        var name = event.name;
        var owner = event.username;

        console.log(event);

        var permUsers = event.permUser;
        var permGroups = event.permGroup;

        return (
            <div>
                <div id="overlay" className={this.state.overlayState} onClick={this.toggleOverlay.bind(this)}></div>
                <div id="popup" className={this.state.overlayState}>
                    <h3>Edit {name} Permissions</h3>
                    <h5 id="permWindowOwner">Event Owner: {owner}</h5>
                    <button type="button" id="changeOwner">Change</button>
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
                        </div>
                        <div id="permList">
                            {this.renderPermissions(permGroups, "groups")}
                            {this.renderPermissions(permUsers, "users")}
                        </div>
                    </div>
                    <div id="addRemove">
                        <button type="button" id="addPermHolder">Add</button>
                        <button type="button" id="removePermHolder">Remove</button>
                    </div>
                    <div id="cancelApply">
                        <button type="button" id="cancelPermEdit">Cancel</button>
                        <button type="button" id="applyPermEdit">Apply</button>
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
