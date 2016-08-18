import React, {Component} from 'react';



export default class EventEVR extends Component {
  updateEventEVR(event){  // Need one of these for each component
    event.preventDefault();
    Meteor.call('updateEventEVR', this.props.ev._id, this.refs.evr.checked);
  }


  render(){
    /*
  	if(!contact.newsletter){
  		return (<div>Loading...</div>);
  	}*/

    return(
      <div>
        <label>EVR Complete: </label>
          <input type="checkbox"
            readOnly={true}
            ref="evr"
            disabled={!this.props.perm}
            onClick={this.updateEventEVR.bind(this)}
            checked={this.props.ev.evr}
          />
      </div>
    )
  }
}
