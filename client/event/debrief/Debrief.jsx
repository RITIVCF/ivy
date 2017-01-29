import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import DebriefModal from './DebriefModal.jsx';

export default class Debrief extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {

		};
  }

	openModal(){
		this.refs.modal.open();
	}

	componentWillUnmount(){
		tinymce.remove();
	}

	componentDidMount(){
		tinymce.init({
      selector: "#notespad",
      theme: "modern",
      height: 300,
			elementpath: false,
			menubar: false,
      toolbar: false

  	});
		tinymce.get("notespad").setContent(this.props.ev.debrief.notes);
		tinymce.get("notespad").setMode("readonly");
	}

	render() {
		let ev = this.props.ev;
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">{ev.name}</span>
					<div className="row">
						<div className="col s12">
							<p>{moment(ev.start.toISOString()).format("DD MMM YYYY")}
								{/*}<a className="btn right" onClick={this.openModal.bind(this)}>Edit</a>*/}
							</p>
						</div>
					</div>
					{/*}<div className="row">
						<div className="col s12 m6">
							<p>Question 1:<br/>{ev.debrief.questions["0"]}</p>
							<p>Question 2:<br/>{ev.debrief.questions["1"]}</p>
						</div>
					</div>*/}
					<div className="row">
						<div className="col s12">
							<label>Notes</label>
							<textarea id="notespad"/>
							{/*}<p style={{whiteSpace: "pre-line",outline:"grey solid 1px"}}>{ev.debrief.notes}</p>*/}
						</div>
					</div>
				</div>
				{/*}<DebriefModal ref="modal" ev={ev} />*/}
			</div>
		)
	}
}
