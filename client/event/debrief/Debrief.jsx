import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import DebriefModal from './DebriefModal.jsx';

export default class Debrief extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
			edit: false
		};
  }

	openModal(){
		this.refs.modal.open();
	}

	componentWillUnmount(){
		tinymce.remove();
	}

	componentWillUpdate(nextProps){
		console.log("Is updating: ", nextProps.ev.debrief.notes);
		tinymce.get("notespad").setContent(nextProps.ev.debrief.notes);
	}

	componentDidMount(){
		tinymce.init({
      selector: "#notespad",
      theme: "modern",
      height: 300,
			elementpath: false,
			menubar: false,
			browser_spellcheck: true,
      toolbar: false

  	});
		tinymce.get("notespad").setContent(this.props.ev.debrief.notes);
		tinymce.get("notespad").setMode("readonly");
	}

	edit(){
		this.setState({edit: true});
		tinymce.get("notespad").setMode();
	}

	save(){
		Meteor.call("updateEventDebrief", this.props.ev._id, tinymce.get("notespad").getContent());
		this.setState({edit: false});
		tinymce.get("notespad").setMode("readonly");
	}

	cancel(){
		this.setState({edit: false});
		tinymce.get("notespad").setMode("readonly");
	}

	render() {
		let ev = this.props.ev;
		let edit = this.state.edit;
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
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							{!edit&&<a className="btn" onClick={this.edit.bind(this)}>Edit</a>}
							{edit&&<a className="btn" style={{marginRight:"5px"}} onClick={this.save.bind(this)}>Save</a>}
							{edit&&<a className="btn" onClick={this.cancel.bind(this)}>Cancel</a>}
						</div>
					</div>
				</div>
				{/*}<DebriefModal ref="modal" ev={ev} />*/}
			</div>
		)
	}
}
