import React, {Component} from 'react';



export default class ButtonPublish extends Component {

  togglePublishEvent(event){
		event.preventDefault();
		Meteor.call("togglePublishEvent", this.props.eid, this.props.published);
		console.log(this);
	}

  render(){
    return(
      <div>
      {this.props.published ?
        <button
          onClick={this.togglePublishEvent.bind(this)}
          ref="togglePublish"
          value={true} >
          Unpublish
        </button>
        :
        <button
          ref="togglePublish"
          onClick={this.togglePublishEvent.bind(this)}
          value={false} >
          Publish
        </button>
      }
    </div>
    )
  }
}
