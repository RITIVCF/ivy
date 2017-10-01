import React, {Component} from 'react';
import TextInput from '/client/sharedcomponents/TextInput';
import { Row, Column, Button, NavbarItem } from '/client/materialize.jsx';

export default class EventImageControl extends Component {
	constructor(props){
		super(props);

		this.state = {
			open: false,
			editing: false,
			value: ""
		};

		this.updateURL = this.updateURL.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	toggleEdit(){
		this.setState({
			editing: !this.state.editing,
			value: this.props.event.pic
		});
	}

	handleChange(newValue){
		this.setState({value: newValue});
	}

	updateURL(event){
		event.preventDefault();
		Meteor.call("updateEventImage", this.props.event._id, this.state.value);
		this.toggleEdit();
	}

  getContent(){
		const event = this.props.event;
		return (
			<Row>
				<Column>
					{this.state.editing ?
						<form onSubmit={this.updateURL}>
							<TextInput
								id={event._id+"_img"}
								ref="url"
								label="Image URL"
								onChange={this.handleChange}
								defaultValue={event.pic}
							/>
							<Button type={"submit"}>Save</Button>
						</form>
					:
					<p>
						<Button onClick={this.toggleEdit}>Edit</Button>
					</p>
					}
				</Column>
			</Row>
		)
	}

	openModal(){
		this.setState({open: true});
	}

	closeModal(){
		this.setState({open: false});
	}

	getFooter(){
		return <div></div>
	}

  render(){
    return (
			<NavbarItem
				onClick={this.openModal.bind(this)}
				tooltip={{text: "Add/Edit Photo"}}
			>
				<i className="tiny material-icons black-text">photo</i>
				<Modal
					open={this.state.open}
					onClose={this.closeModal}
				>
					{this.getContent()}
				</Modal>
			</NavbarItem>
    )
  }
}
