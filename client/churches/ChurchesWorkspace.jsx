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
      subscription: {
        Churches: Meteor.subscribe("allChurches"),
				contacts: Meteor.subscribe("allContacts")
      },
			contact: false
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
		this.state.subscription.contacts.stop();
  }


	getChurch(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Churches.findOne(this.props.cid);
	}

	render() {
		let ch = this.props.ch; //this.getChurch();

		if(!ch){
			return (<div>Loading...</div>);
		}

		return (
		<div>
			<div className="row">
				<div className="col s12 m6 l6">
					<ButtonActive ch={ch} />
				</div>
				<div className="col s12 m4 l3">
					<ButtonDelete ch={ch} />
				</div>
			</div>


			<div className="row">
				<ChurchName ch={ch} />
			</div>
			<div className="row">
				<ChurchURL ch={ch} />
			</div>


			<ChurchTimes ch={ch} />
			<ChurchContactsControls ch={ch} />
		</div>
		)
	}
}
