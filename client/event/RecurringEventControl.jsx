import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { NavbarItem } from '/client/materialize.jsx';
import RecurringEventForm from './RecurringEventForm';

export default class RecurringEventControl extends React.Component {

  constructor(props){
    super(props);

    this.state = {
			open: false
    };

		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
  }

	openModal() {
		this.setState({open: true});
	}

	closeModal() {
		this.setState({open: false});
	}

  render() {
    return (
			<NavbarItem
				onClick={this.openModal}
				tooltip={{text: "Set recurrence"}}
			>
				<i className="material-icons black-text">content_copy</i>
				<Modal
					open={this.state.open}
					onClose={this.closeModal}
				>
					<RecurringEventForm
						event={this.props.event}
						onSubmit={this.closeModal}
					/>
				</Modal>
			</NavbarItem>
		)
  }
}
