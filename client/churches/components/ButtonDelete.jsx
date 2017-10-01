import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteChurch(event){
    var result = window.confirm("Are you sure you want to delete church?");
    if(result == true){
      if(this.props.onDelete){
				this.props.onDelete();
			}
      this.props.ch.remove();
    }
  }

  render(){
    return (
      <a className="modal-action modal-close waves-effect waves-light btn red" onClick={this.deleteChurch.bind(this)}>Delete</a>
    )
  }
}
