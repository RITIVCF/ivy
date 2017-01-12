import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PositionEntry from './PositionEntry.jsx';
import SinglePosition from './SinglePosition.jsx';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';

export default class ServiceRequestModal extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
			name: "",
			user: false
    };
  }

	componentDidMount(){
		$('.modal').modal();
		$('.collapsible').collapsible();
	}

	open(){
		$('#servicerequestmodal').appendTo("body").modal('open');
	}

	setUser(user){
		this.setState({userId: user._id});
		Materialize.updateTextFields();
	}

	blur(){
		Materialize.updateTextFields();
	}

	unset(){
		this.setState({user: false});
	}

	changeName(event){
    event.preventDefault();
    this.setState({name: event.target.value});
  }

	aReqSubmit(){
		this.refs.reqform.submit();
	}

	aSignUpSubmit(){
		this.refs.signupform.submit();
	}

	submitRequest(event){
		event.preventDefault();
		if(!this.state.userId){
			Materialize.toast("Please select a user, then submit again.", 4000);
		}
		Meteor.call("createJobRequest",
			this.props.eid,
			this.state.userId,
			this.refs.job.value,
			Meteor.userId(), true);
		this.refs.job.value="";
		this.setState({user: false});
		//this.refs.user.focus();
		$("#name").focus();
	//	this.setState({textValue: ""});
	}

	submitSignUp(event){
		event.preventDefault();

		// for each #ofSlots
		for(i=0;i < this.refs.posentry.state.slotvalue;i++){
			Meteor.call("createJobRequest",
				this.props.eid,
				"",
				this.refs.posentry.state.pos,
				Meteor.userId(), false);
		}
		this.refs.posentry.clear();
		this.refs.posentry.focus();
		//Clear form and leave on empty
	}

	getRequests(){
		return Events.findOne(this.props.eid).jobs.filter((job)=>{
			return job.isRequest==true;
		});
	}

	getSignUps(){
		return Events.findOne(this.props.eid).jobs.filter((job)=>{
			return job.isRequest==false;
		});
	}

	render() {
		return (
			<div id="servicerequestmodal" className="modal modal-fixed-footer bottom-sheet ">
		    <div className="modal-content">
					<div className="row">
						<div className="col s12 l6">
							<h4>Service Request</h4>
							<form ref="reqform" onSubmit={this.submitRequest.bind(this)}>
								<div>
									<div className="col s12 m6">
										<SelectUser
                      parent={this}
                      unset={this.unset.bind(this)}
                      onBlur={this.blur.bind(this)}
                      initialValue={""}
                      onChange={this.changeName.bind(this)}
                      updateUser={this.setUser.bind(this)}
                      id="first_name"
                      type="text"
                      ref="user"
                      className="validate" />
									</div>
									<div className="input-field col s12 m6">
										<input type="text" ref="job" id="reqposition" className="validate" required />
										<label htmlFor="reqposition">Position</label>
									</div>
								</div>
								<div className="row">
									<button className="btn-floating btn-large iv-blue waves-effect waves-light right">
										<i className="material-icons">send</i>
									</button>
								</div>
							</form>
							<ul className="collection">
								{this.getRequests().length > 0?this.getRequests().map((req,i)=>{
									return <SinglePosition key={i} job={req} eid={this.props.eid} />
								}):<li className="collection-item">No Requested Positions</li>}
							</ul>
						</div>
						<div className="col s12 l6">
							<h4>Sign Ups</h4>
							<form ref="signupform" onSubmit={this.submitSignUp.bind(this)}>
								<div>
									<PositionEntry ref="posentry" />
									{/*}<button className="btn-floating btn-small green waves-effect waves-light">
										<i className="material-icons">add</i>+
									</button>*/}
									<div className="row">
										<button className="btn-floating btn-large iv-blue waves-effect waves-light right">
											<i className="material-icons">send</i>
										</button>
									</div>
								{/*}	<ul className="collapsible" data-collapsible="expandable">
										<li>
											<div className="collapsible-header">Position</div>
											<div className="collapsible-body">*/}
												<ul className="collection">
													{this.getSignUps().length > 0?this.getSignUps().map((req,i)=>{
														return <SinglePosition key={i} job={req} eid={this.props.eid} />
													}):<li className="collection-item">No Signup Positions</li>}
												</ul>{/*}
											</div>
										</li>
									</ul>*/}
								</div>
							</form>
						</div>
					</div>













		    </div>
		    <div className="modal-footer">
		      <a className=" modal-action modal-close waves-effect waves-blue btn-flat">Close</a>
		    </div>
		  </div>
		)
	}
}
