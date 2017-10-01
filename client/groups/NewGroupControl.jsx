import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NewGroupForm from './NewGroupForm';


export default class NewGroupControl extends TrackerReact(React.Component) {
  constructor(){
    super();

		this.state = {
			open: false
		};

		this.openNew = this.openNew.bind(this);
		this.closeModal = this.closeModal.bind(this);
  }

	openNew(){
		this.setState({open: true});
	}

	closeModal(){
		this.setState({open: false});
	}

  render() {
    return (
			<div className="col s12 m6 l4">
				<div className={"card left"}
					style={{width: "100%"}} onClick={this.openNew}>
					<div className="card-content">
						<span className="card-title">Add New</span>
						<p>&nbsp;</p>
					</div>
				</div>
				<Modal
					open={this.state.open}
					onClose={this.closeModal}
				>
					<NewGroupForm
						onSubmit={this.closeModal}
						type={this.props.type}
					/>
				</Modal>
			</div>
    )
  }
}
