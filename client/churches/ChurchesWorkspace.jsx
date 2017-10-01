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

  }

	render() {
		let ch = this.props.ch;

		return (
			<Row>
				<Column>
					<Row>
						<ChurchName ch={ch} />
					</Row>
					<Row>
						<ChurchURL ch={ch} />
					</Row>
					<ChurchTimes ch={ch} />
					<ChurchContactsControls ch={ch} />
					<Row>
						<ButtonActive ch={ch} onToggle={this.props.onToggle} />
						<ButtonDelete ch={ch} onDelete={this.props.onDelete} />
					</Row>
				</Column>
			</Row>
		)
	}
}
