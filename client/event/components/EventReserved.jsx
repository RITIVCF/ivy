import React, {Component} from 'react';



export default class EventReserved extends Component {
  updateEventReserved(event){  // Need one of these for each component
    event.preventDefault();
    Meteor.call('updateEventReserved', this.props.ev._id, this.refs.reserved.checked);
  }


  render(){
    /*
  	if(!contact.newsletter){
  		return (<div>Loading...</div>);
  	}*/

    return(
      <div>
        <label>Location Reserved:
          <input type="checkbox"
            readOnly={true}
            ref="reserved"
            disabled={!this.props.perm}
            onClick={this.updateEventReserved.bind(this)}
            checked={this.props.ev.reserved}
          /></label>
      </div>
    )
  }
}
