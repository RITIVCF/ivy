import React, { Component, PropTypes } from 'react'

// Permission component - represents a single todo item
export default class Permission extends Component
{
    render()
    {
        // Give permissions a different className when they are checked off,
        // so that we can style them nicely in CSS

        var text = "";
        var type = this.props.type;
        if(type == "group")
        {
            var groups = this.props.groups;
            for(var i = 0; i < groups.length; i++)
            {
                if(this.props.permHolder == groups[i]._id)
                {
                    text = groups[i].text;
                    break;
                }
            }
        }
        else
        {
            var users = this.props.users;
            for(var i = 0; i < users.length; i++)
            {
                if(this.props.permHolder == users[i]._id)
                {
                    text = users[i].username;
                    break;
                }
            }
        }

        type += "Perm";
        console.log(type);
        console.log(text);
        return (
            <div className={type} id="permission_{text}">
                <div className="permHolder">
                    {text}
                </div>
                <div className="editButtonWrapper">
                    <input type="radio" name="permLevel_{this.props.permHolder}_{type}" id="edit_{this.props.permHolder}_{type}" onclick={this.props.clickFunc.bind(this.props.parent)} />
                </div>
                <div className="viewButtonWrapper">
                    <input type="radio" name="permLevel_{this.props.permHolder}_{type}" id="view_{this.props.permHolder}_{type}" onclick={this.props.clickFunc.bind(this.props.parent)} />
                </div>
            </div>
        );
    }
}

Permission.propTypes = {
    // This component gets the permission to display through a React prop.
    // We can use propTypes to indicate it is required
//    permission: PropTypes.object.isRequired,
};
