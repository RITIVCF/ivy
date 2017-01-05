import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class PositionEntry extends Component {
	constructor(props) {
    super(props);

    this.state = {
			pos: "",
			slotvalue: 1
    };
  }

	componentDidMount(){
		Materialize.updateTextFields();
	}

	focus(){
		this.refs.signuppos.focus();
	}

	changeNum(event){
		this.setState({slotvalue: event.target.value});
	}

	changePos(event){
		this.setState({pos: event.target.value});
	}

	render() {
		return (
			<div>
				<div className="input-field col s12 m10">
					<input type="text" ref="signuppos" id="signuppos" className="validate" required
						onChange={this.changePos.bind(this)} value={this.state.pos} />
					<label htmlFor="signuppos">Position</label>
				</div>
				<div className="input-field col s12 m2">
					<input type="number" id="numslots" className="validate" required
						onChange={this.changeNum.bind(this)} value={this.state.slotvalue} min="1"/>
					<label htmlFor="numslots"># Slots</label>
				</div>
			</div>
		)
	}
}
