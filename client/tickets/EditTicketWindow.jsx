import React, { Component, PropTypes } from 'react';
import SelectContact from '../sharedcomponents/SelectContact.jsx';
import SelectOption from '../sharedcomponents/SelectOption.jsx';
import EditTicketForm from './EditTicketForm.jsx';




export default class EditTicketWindow extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
          overlayState: "hidden",
          ticket: false
        };
    }

    openOverlay(tid){
      this.setState({ticket: tid});
      this.setState({overlayState:""});
    }

    closeOverlay(){
      this.setState({overlayState:"hidden"});
      this.setState({ticket: false});
      this.forceUpdate();
      //this.clearAll();
    }


    render()
    {
      var ticket = Tickets.findOne(this.state.ticket);
        return (
            <div>
              <div id="overlay" className={this.state.overlayState} onClick={this.closeOverlay.bind(this)}>
              </div>
              <div id="editTicketPopup" className={this.state.overlayState}>
                {ticket ? <EditTicketForm ref="ticketform" ticket={ticket} />:<div></div>}
                <button onClick={this.closeOverlay.bind(this)}>Close</button>
              </div>

            </div>
        );
    }
}
