import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class ServiceRequestModal extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
    };
  }

	componentDidMount(){
		$('.modal').modal();
	}

	open(){
		$('#servicerequestmodal').modal('open');
	}



	render() {
		return (
			<div id="servicerequestmodal" className="modal bottom-sheet">
		    <div className="modal-content">
		      <h4>Modal Header</h4>
		      <p>A bunch of text</p>
		    </div>
		    <div className="modal-footer">
		      <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
		    </div>
		  </div>
		)
	}
}
