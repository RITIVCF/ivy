import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DebriefForm from './DebriefForm.jsx';

export default class DebriefModal extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {

		};
  }

	componentDidMount(){
		$('.modal').modal();
	}

	open(){
		$('#debriefmodal').appendTo("body").modal('open');
	}

	save(){
		this.refs.form.save();
	}

	render() {
		return (
			<div id="debriefmodal" className="modal modal-fixed-footer"> 
		    <div className="modal-content">
					<DebriefForm ref="form" ev={this.props.ev} />
		    </div>
		    <div className="modal-footer">
					<a onClick={this.save.bind(this)}
						className=" modal-action modal-close waves-effect waves-blue btn-flat">Save</a>
		      <a className=" modal-action modal-close waves-effect waves-blue btn-flat">Close</a>
		    </div>
		  </div>
		)
	}
}
