import React, {Component} from 'react';



export default class EventReserved extends Component {
  updateEventReserved(event){  // Need one of these for each component
    event.preventDefault();
    if(this.props.perm){
      Meteor.call('updateEventReserved', this.props.ev._id);
    }
  }


  render(){

    return(
      <div>
          <input type="checkbox"
            readOnly={true}
            ref="reserved"
            name="reserved"
            disabled={!this.props.perm}
            checked={this.props.ev.reserved}
          />
          <label onClick={this.updateEventReserved.bind(this)} htmlFor="reserved">Location Reserved</label>
      </div>
    )
  }
}
