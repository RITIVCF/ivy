import React, { Component, PropTypes } from 'react';


// Permission component - represents a single todo item
export default class NewEventWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden",
            id: props.eid
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

    openOverlay(){
      this.setState({overlayState:""});
    }

    closeOverlay(){
      this.setState({overlayState:"hidden"});
    }

    delete(){
      Meteor.call("deleteEvent", this.state.id);
      FlowRouter.go("/events");
    }

    render()
    {
        return (
            <div>
              <div id="deleteEventOverlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}></div>
              <div id="deleteEventPopup" className={this.state.overlayState}>
                <p>Are you sure you want to delete? This action cannot be undone.</p>
                <button onClick={this.delete.bind(this)}>Ok</button>
                <button onClick={this.closeOverlay.bind(this)}>Cancel</button>

              </div>
            </div>
        );
    }
}
