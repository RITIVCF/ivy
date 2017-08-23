import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Modal extends React.Component {
  constructor(){
    super();

  }

  componentDidMount(){
    $('.modal').modal();
  }

  open(){
    $('#' + this.props.id).appendTo("body").modal('open');
  }

	close(){
		$('#' + this.props.id).modal('close');
		this.props.onClose();
	}

	render() {
    return (
      <div id={this.props.id} className={this.getModalType()}>
        {this.getModalContent()}
				
				{this.getModalFooter()}
      </div>
    )
  }

	getModalType(){
		let className = "modal";
		switch (this.props.type) {
			case "bottom-sheet":
				className += " bottom-sheet";
				break;
			case "fixed-footer":
				className += " modal-fixed-footer"
				break;
			default:
		}
		return className;
	}

	getModalContent(){
		return (
			<div className="modal-content">
				{this.props.content}
			</div>
		)
	}

	getModalFooter(){
		if(!!this.props.footer){
			return (
				<div className="modal-footer">
					{this.props.footer}
				</div>
			)
		}
		else{
			return false;
		}

	}

}
