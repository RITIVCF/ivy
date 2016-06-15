import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ButtonActive from './components/ButtonActive.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import ChurchContactsControls from './components/ChurchContactsControls.jsx';
import ChurchDayTimeControls from './components/ChurchDayTimeControls.jsx';
import ChurchName from './components/ChurchName.jsx';
import ChurchURL from './components/ChurchURL.jsx';




export default class ChurchesWorkspace extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription: {
        Churches: Meteor.subscribe("allChurches")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
  }


	getChurch(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Churches.findOne(this.props.cid);
	}

	render() {
		let ch = this.getChurch();

		if(!ch){
			return (<div>Loading...</div>);
		}

		return (
		<div>

			<article id="main">
        <header className="special container">
          <h2>Churches Workspace</h2>
        </header>

			<div className="sidebar">
				<ButtonActive cid={this.props.cid} active={ch.active} />
				<ButtonDelete cid={this.props.cid} />
			</div>


			<div className="Workspace">
				<ChurchName cid={this.props.cid} />
				<ChurchURL cid={this.props.cid} />
			</div>

			</article>
		</div>
		)
	}
}
