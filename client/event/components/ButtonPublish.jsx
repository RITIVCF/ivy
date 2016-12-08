import React, {Component} from 'react';



export default class ButtonPublish extends Component {

  togglePublishEvent(event){
		event.preventDefault();
		Meteor.call("togglePublishEvent", this.props.eid, this.props.published);
		//console.log(this);
	}

  render(){
    return(
        <a
          ref="togglePublish"
          className="waves-effect waves-light btn indigo darken-4"
          onClick={this.togglePublishEvent.bind(this)}
          >
          {this.props.published ?"Unpublish":"Publish"}
        </a>
    )
  }
}
