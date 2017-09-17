import React, {Component} from 'react';



export default class ButtonPublish extends Component {

  togglePublishEvent(event){
		event.preventDefault();

		if ( !this.props.published ) {
			if ( !this.props.canPublish ) {
				window.alert("Please fill out the advertising description, location and type in order to publish the event.");
			} else {
				Meteor.call("togglePublishEvent", this.props.eid, this.props.published);
			}

		} else {
			Meteor.call("togglePublishEvent", this.props.eid, this.props.published);
		}

	}

  render(){
    var style = {};
    if(this.props.published){
      style={paddingRight:"20px",paddingLeft:"20px",maxWidth:"127px"};
    }
    return(
        <a
          ref="togglePublish"
          style={style}
          className="waves-effect waves-light btn-flat"
          onClick={this.togglePublishEvent.bind(this)}
					//disabled={!this.props.canPublish&&!this.props.published}
          >
          {this.props.published ?"Unpublish":"Publish"}
        </a>
    )
  }
}
