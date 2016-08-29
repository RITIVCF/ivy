import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

var grpUpdateName = _.debounce(
	function(thiz, value){
	console.log(thiz);
	console.log(value);
	Meteor.call("updateGroupName", thiz.props.group._id, value);
}, 1000);

export default class GroupName extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);
		this.state = {
			edittingName: false,
			name: props.group.name
		}
    // this.state = {
    //   subscription: {
    //     Churches: Meteor.subscribe("allChurches"),
		// 		contacts: Meteor.subscribe("allContacts")
    //   },
		// 	contact: false
    // };
  }

  componentWillUnmount() {
    // this.state.subscription.Churches.stop();
		// this.state.subscription.contacts.stop();
  }

	changeName(event){
		event.preventDefault();
		this.setState({name: event.target.value});
		var thiz = this;
		grpUpdateName(this, event.target.value);
	}

	toggleName(event){
		event.preventDefault()
		this.setState({edittingName: !this.state.edittingName});
	}

	render() {

		return (
		<div>
			{!this.state.edittingName ? <h1 onClick={this.toggleName.bind(this)}>{this.props.group.name}</h1>
		:<input
					type="text"
					value={this.state.name}
					onChange={this.changeName.bind(this)}
					onBlur={this.toggleName.bind(this)}
				/>
			}
		</div>
		)
	}
}
