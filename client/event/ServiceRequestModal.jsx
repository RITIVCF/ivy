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
		$('#servicerequestmodal').appendTo("body").modal('open');
	}



	render() {
		return (
			<div id="servicerequestmodal" className="modal bottom-sheet">
		    <div className="modal-content">
					<div className="switch">
				    <label>

				      <input type="checkbox" />
				      <span className="lever"></span>
				      On
				    </label>
				  </div>
		    </div>
				<h1>Test Stuff</h1>
				<h1>Test Stuff</h1>
		    <div className="modal-footer">
		      <a className=" modal-action modal-close waves-effect waves-blue btn-flat">Close</a>
		    </div>
		  </div>
		)
	}
}
