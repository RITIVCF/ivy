import React, {Component} from 'react';



export default class ButtonPublish extends Component {

  togglePublishEvent(event){
		event.preventDefault();
		Meteor.call("togglePublishEvent", this.props.eid, this.props.published);
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
          >
          {this.props.published ?"Unpublish":"Publish"}
        </a>
    )
  }
}
