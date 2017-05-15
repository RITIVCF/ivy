import React, {Component} from 'react';



export default class ButtonActive extends Component {

  toggleActiveChurch(event){
		event.preventDefault();
    this.props.parent.close();
		this.props.ch.toggleActive();
		//console.log(this);
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
    }else{
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
