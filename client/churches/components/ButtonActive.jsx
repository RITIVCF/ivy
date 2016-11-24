import React, {Component} from 'react';



export default class ButtonActive extends Component {

  toggleActiveChurch(event){
		event.preventDefault();
    $("#"+this.props.ch._id).modal('close');
		Meteor.call("toggleActiveChurch", this.props.ch._id, this.props.ch.active);
		//console.log(this);
	}

  render(){
    return(
      <div>
      {this.props.ch.active ?
        <button
          onClick={this.toggleActiveChurch.bind(this)}
          type="button"
          ref="togglePublish"
          className="waves-effect waves-light btn"
          value={true} >
          Make Inactive
        </button>
        :
        <button
          ref="togglePublish"
          type="button"
          onClick={this.toggleActiveChurch.bind(this)}
          className="waves-effect waves-light btn"
          value={false} >
          Make Active
        </button>
      }
    </div>
    )
  }
}
