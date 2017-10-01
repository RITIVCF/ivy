import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ServiceRequestForm from './ServiceRequestForm.jsx';


export default class ServiceRequestControl extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
			open: false,
    };

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

	componentDidMount(){

	}

	openModal(){
		this.setState({open: true});
	}

	closeModal(){
		this.setState({open: false});
	}

	render() {
		return (
			<Row style={{marginTop: "1em"}}>
				<Button onClick={this.openModal}>
					Service Requests
				</Button>
				<Modal open={this.state.open} onClose={this.closeModal}>
					<ServiceRequestForm event={this.props.event} />
				</Modal>
			</Row>
		)
	}
}
