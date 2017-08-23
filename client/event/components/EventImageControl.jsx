import React, {Component} from 'react';
import Modal from '/client/sharedcomponents/Modal.jsx';
import TextInput from '/client/sharedcomponents/TextInput';
import { Row, Column, Button, NavbarItem } from '/client/materialize.jsx';

export default class EventImageControl extends Component {
	constructor(props){
		super(props);

		this.state = {
			editing: false,
			value: ""
		};

		this.updateURL = this.updateURL.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	toggleEdit(){
		this.setState({
			editing: !this.state.editing,
			value: this.props.ev.pic
		});
	}

	handleChange(newValue){
		this.setState({value: newValue});
	}

	updateURL(event){
		event.preventDefault();
		console.log("this: ", this);
		Meteor.call("updateEventImage", this.props.ev._id, this.state.value);
		this.toggleEdit();
	}

  getContent(){
		const ev = this.props.ev;
		return (
			<Row>
				<Column>
					{this.state.editing ?
						<form onSubmit={this.updateURL}>
							<TextInput
								id={ev._id+"_img"}
								ref="url"
								label="Image URL"
								onChange={this.handleChange}
								defaultValue={ev.pic}
							/>
							<Button type={"submit"}>Save</Button>
						</form>
					:
					<p>
						{/* {ev.pic} */}
						<Button onClick={this.toggleEdit}>Edit</Button>
					</p>
					}
				</Column>
			</Row>
		)
	}

	openModal(){
		this.refs.modal.open();
	}

	closeModal(){
		this.refs.modal.close();
	}

	getFooter(){
		return <div></div>
	}

  render(){
    return (
			<NavbarItem>
				<i className="tiny material-icons black-text" onClick={this.openModal.bind(this)}>photo</i>
				<Modal
					id={"EventImageModal"}
					content={this.getContent()}
					footer={this.getFooter()}
					ref="modal"
				/>
			</NavbarItem>
    )
  }
}
