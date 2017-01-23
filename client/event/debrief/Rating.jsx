import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Rating extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
			selected: props.defaultValue
		};
  }

	select(event){
		console.log(event.target);
		this.setState({selected: event.target.id});
		Meteor.call("updateDebriefDraftQuestion", this.props.eid, this.props.rid, event.target.id);
	}

	updateRating(){

	}

	getRating(){

	}

	render() {
		return (
			<div className="">
				<p>{this.props.title}<label>{this.props.subtitle}</label></p>

						<input name={this.props.rid} type="radio" id={this.props.rid+"1"} className="with-gap"
								onClick={this.select.bind(this)}
								checked={this.props.rid+"1"==this.state.selected} />
						<label htmlFor={this.props.rid+"1"}>1</label>
						<span>&nbsp; &nbsp; &nbsp; &nbsp;</span>
						<input name={this.props.rid} type="radio" id={this.props.rid+"2"} className="with-gap"
								onClick={this.select.bind(this)}
								checked={this.props.rid+"2"==this.state.selected} />
						<label htmlFor={this.props.rid+"2"}>2</label>
						<span>&nbsp; &nbsp; &nbsp; &nbsp;</span>

						<input name={this.props.rid} type="radio" id={this.props.rid+"3"} className="with-gap"
								onClick={this.select.bind(this)}
								checked={this.props.rid+"3"==this.state.selected} />
						<label htmlFor={this.props.rid+"3"}>3</label>
						<span>&nbsp; &nbsp; &nbsp; &nbsp;</span>


						<input name={this.props.rid} type="radio" id={this.props.rid+"4"} className="with-gap"
								onClick={this.select.bind(this)}
								checked={this.props.rid+"4"==this.state.selected} />
						<label htmlFor={this.props.rid+"4"}>4</label>
						<span>&nbsp; &nbsp; &nbsp; &nbsp;</span>


						<input name={this.props.rid} type="radio" id={this.props.rid+"5"} className="with-gap"
								onClick={this.select.bind(this)}
								checked={this.props.rid+"5"==this.state.selected} />
						<label htmlFor={this.props.rid+"5"}>5</label>
			</div>
		)
	}
}
