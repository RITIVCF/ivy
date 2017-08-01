import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

var grpUpdateName = _.debounce(
	function(thiz, value){
	Meteor.call("updateGroupName", thiz.props.group._id, value);
}, 1000);

export default class GroupName extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);
		this.state = {
			edittingName: false,
			name: props.group.name
		}
  }

  componentWillUnmount() {

  }

	changeName(event){
		event.preventDefault();
		this.setState({name: this.refs.name.value});
		var thiz = this;
		grpUpdateName(this, this.refs.name.value);
		this.setState({edittingName: false});
	}

	toggleName(event){
		event.preventDefault()
		this.setState({edittingName: !this.state.edittingName});
	}

	render() {
		return (
		<div>
			{!this.state.edittingName ? <h2>{this.props.group.name}{(!this.state.edittingName&&this.props.group._id!="admin")&&<i className="tiny material-icons black-text" onClick={this.toggleName.bind(this)}>edit</i>}</h2>
		:<input
					type="text"
					ref="name"
					defaultValue={this.props.group.name}
				/>
		}
			{this.state.edittingName&&<a className="btn" style={{marginRight:"5px"}} onClick={this.changeName.bind(this)}>Save</a>}
			{this.state.edittingName&&<a className="btn" onClick={this.toggleName.bind(this)}>Cancel</a>}
		</div>
		)
	}
}
