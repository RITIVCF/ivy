import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ButtonActive from './components/ButtonActive.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import ChurchContactsControls from './components/ChurchContactsControls.jsx';
import ChurchTimes from './components/ChurchTimes.jsx';
import ChurchName from './components/ChurchName.jsx';
import ChurchURL from './components/ChurchURL.jsx';


export default class ChurchesWorkspace extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {

			contact: false
    };
  }

  componentWillUnmount() {

  }

	componentDidMount(){
		$('.modal').modal();
	}

	open(){
		$("#"+this.props.ch._id).appendTo("body").modal("open");
	}

	preventPropo(event){
		event.stopPropagation();
	}

	render() {
		let ch = this.props.ch; //this.getChurch();

		return (
		<div id={ch._id} className="modal modal-fixed-footer" onClick={this.preventPropo.bind(this)}>
			<div className="modal-content">
				<div className="row">
					<ChurchName ch={ch}  />
				</div>
				<div className="row">
					<ChurchURL ch={ch} />
				</div>


				<ChurchTimes ch={ch} />
				<ChurchContactsControls ch={ch} />
			</div>
			<div className="modal-footer">
				<a className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
				<ButtonActive ch={ch} />
				<ButtonDelete ch={ch} />
			</div>

		</div>
		)
	}
}
