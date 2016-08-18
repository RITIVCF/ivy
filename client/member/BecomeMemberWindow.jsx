import React, { Component, PropTypes } from 'react';
import MemberWrapper from './MemberWrapper.jsx';


// Permission component - represents a single todo item
export default class BecomeMemberWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            overlayState: "hidden"
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

    openOverlay(){

      this.setState({overlayState:""});
    }

    closeOverlay(){
      // Clear Fields
      this.setState({overlayState:"hidden"});
    }

    render()
    {
        return (
            <div>
              <div id="overlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}></div>
              <div id="newMemberPopup" className={this.state.overlayState}>
                <MemberWrapper subscription={this.props.subscription} />
              </div>
            </div>
        );
    }
}
