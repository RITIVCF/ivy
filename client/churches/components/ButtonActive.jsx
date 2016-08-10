import React, {Component} from 'react';



export default class ButtonActive extends Component {

  toggleActiveChurch(event){
		event.preventDefault();
		Meteor.call("toggleActiveChurch", this.props.ch._id, this.props.ch.active);
		console.log(this);
	}

  render(){
    return(
      <div>
      {this.props.ch.active ?
        <button
          onClick={this.toggleActiveChurch.bind(this)}
          ref="togglePublish"
          value={true} >
          Make Inactive
        </button>
        :
        <button
          ref="togglePublish"
          onClick={this.toggleActiveChurch.bind(this)}
          value={false} >
          Make Active
        </button>
      }
    </div>
    )
  }
}
