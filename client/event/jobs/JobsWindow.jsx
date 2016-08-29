import React, { Component, PropTypes } from 'react';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';

// Permission component - represents a single todo item
export default class JobsWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden",
            user: false
        };
    }


    componentWillUnmount(){

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

    updateSelectedUser(user){
      this.state.user = user;
    }

    unset(){
      this.state.user = false;
    }

    openOverlay(){
      this.setState({overlayState:""});
    }

    closeOverlay(){
      this.setState({overlayState:"hidden"});
      this.refs.user.state.value="";
      this.refs.user.forceUpdate();
      this.refs.job.value="";
    }

    sendClose(){
      if(!this.state.user){
        window.alert("Please select a user");
        return;
      }
      Meteor.call("createJobRequest", this.props.eid, this.state.user._id, this.refs.job.value, Meteor.userId());
      // send email and stuff
      this.setState({overlayState:"hidden"});
      this.refs.user.state.value="";
      this.refs.user.forceUpdate();
      this.refs.job.value="";
    }


    /*getEvent(){
  		//console.log(Events.find({_id: this.props.eid}).fetch());
  		//return Events.find({_id: this.props.eid}).fetch();
  		return Events.findOne(this.props.eid);
  	}*/



    render()
    {
        return (
            <div>
              <div id="deleteEventOverlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}></div>
              <div id="deleteEventPopup" className={this.state.overlayState}>
                <label>User:
                <SelectUser parent={this}
                  unset={this.unset.bind(this)}
                  updateContact={this.updateSelectedUser.bind(this)}
                  initialValue={""}
                  ref="user"
                  />
                </label>
                <label>Job Name:
                <input type="text" ref="job" /></label>
                <button onClick={this.sendClose.bind(this)}>Send</button>
                <button onClick={this.closeOverlay.bind(this)}>Cancel</button>

              </div>
            </div>
        );
    }
}
