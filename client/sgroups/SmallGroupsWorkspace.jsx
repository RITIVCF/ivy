import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ButtonActive from './components/ButtonActive.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import SGName from './components/SGName.jsx';




export default class SmallGroupsWorkspace extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription: {
        SGs: Meteor.subscribe("SGs")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.SGs.stop();
  }


	getSG(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Groups.findOne(this.props.cid);
	}

	render() {
		let sg = this.getSG();

		if(!sg){
			return (<div>Loading...</div>);
		}

		return (
		<div>

			<article id="main">
        <header className="special container">
          <h2>Small Group Workspace</h2>
        </header>

			<div className="sidebar">
				<ButtonActive gid={this.props.gid} active={sg.active} />
				<ButtonDelete gid={this.props.gid} />
			</div>


			<div className="Workspace">
				<SGName gid={this.props.cid} />
			</div>

			</article>
		</div>
		)
	}
}
