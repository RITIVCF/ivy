import React, {Component} from 'react';



export default class EventEVR extends Component {
  updateEventEVR(event){  // Need one of these for each component
    //event.preventDefault();
    if(this.props.perm){
      Meteor.call('updateEventEVR', this.props.ev._id);
    }
  }


  render(){
    return(
      <div>
          <input type="checkbox"
            readOnly={true}
            ref="evr"
            name="evr"
            disabled={!this.props.perm}
            checked={this.props.ev.evr}
          />
          <label htmlFor="evr" onClick={this.updateEventEVR.bind(this)}>EVR Complete</label>
      </div>
    )
  }
}
