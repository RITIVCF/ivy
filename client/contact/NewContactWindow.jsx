import React, { Component, PropTypes } from 'react';


// Permission component - represents a single todo item
export default class NewContactWindow extends Component
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
              <div id="newContactPopup" className={this.state.overlayState}>
                <label>Name<input type="text" ref="name" placeholder="Name" required/></label>
                <label>Email<input type="text" ref="email" placeholder="Email" required/></label>
                <label>Phone<input type="text" ref="phone" placeholder="000-000-0000"/></label>
                <label>Subscribe to Newsletter?<input type="checkbox" ref="newsletter"/></label>
                <br />
                {/*<label>Reoccuring: <input type="checkbox" name="reoccuring" ref="reoccuring" /></label>*/}
                <div id="btnsCreateCancel">
                  <button>Create</button>
                  <button onClick={this.closeOverlay.bind(this)}>Cancel</button>
                </div>
              </div>
            </div>
        );
    }
}
