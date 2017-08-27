import React, { Component, PropTypes } from 'react';


// Permission component - represents a single todo item
export default class NewEventWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden",
            id: "",
            submitted: ""
        };
    }

    componentWillUnmount(){
        Meteor.call("updateEventName",this.state.id, this.refs.evname.value);
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
      var component = this;
      Meteor.call("addBlankEvent", function(error, result){
        if(error){
          console.error(error);
          return;
        }
        component.setState({"id":result});
      });
      this.setState({overlayState:""});
    }

    closeOverlay(){
      Meteor.call("deleteEvent",this.state.id);
      this.setState({overlayState:"hidden"});
    }

    render()
    {
        return (
            <div>
              <div id="overlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}></div>
              <div id="newEventPopup" className={this.state.overlayState}>
                <label>Name<input type="text" ref="evname" placeholder="Event Name" required/></label>
                <br />
                <div id="btnsCreateCancel">
                  {this.state.id != "" ?<div>
                    <a href={"/events/workspace/"+this.state.id}>
                      <button>Create</button>
                    </a>
										<button onClick={this.closeOverlay.bind(this)}>Cancel</button></div>
                  :
									<button onClick={this.closeOverlay.bind(this)}>Cancel</button>
                  }

                </div>
              </div>
            </div>
        );
    }
}
