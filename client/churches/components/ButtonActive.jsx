import React, {Component} from 'react';



export default class ButtonActive extends Component {

  toggleActiveChurch(event){
		event.preventDefault();
		if(this.props.onToggle){
			this.props.onToggle();
		}
		this.props.ch.toggleActive();
	}

  render(){
    if(this.props.ch.isActive()){
      return (<a
        onClick={this.toggleActiveChurch.bind(this)}
        type="button"
        ref="togglePublish"
        className="waves-effect waves-light btn-flat"
        value={true} >
        Retire
      </a>)
    } else {
      return(<a
        ref="togglePublish"
        type="button"
        onClick={this.toggleActiveChurch.bind(this)}
        className="waves-effect waves-light btn"
        value={false} >
        Activate
      </a>)
    }
  }
}
