import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '/client/sharedcomponents/SelectUser.jsx';
import HowHearSelect from '/client/event/forms/HowHearSelect.jsx';

export default class NewContactForm extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      new: true,
      submitted: false,
			disabled: false
    };
  }

  circle() {
    $("#submit-circle").animate({
      'width': '+=2000px',
      'height': '+=2000px',
      'margin': '-=1000px'
    }, 500);
    var counter = 5;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        $('#sign-in-button').html(counter);
      }
      // Display 'counter' wherever you want to display it.
      if (counter === 0) {
        $("#submit-circle").animate({
          'width': '-=2000px',
          'height': '-=2000px',
          'margin': '+=1000px'
        }, 500);
        $('#sign-in-button').html("<i class='material-icons'>send</i>");
        clearInterval(counter);
      }
    }, 1000);
  }

  submitForm(event) {
    event.preventDefault();

    this.refs.publicForm.submit();
  }

  circleGrow(){
    $("#submit-circle").animate({
      'width': '+=2000px',
      'height': '+=2000px',
      'margin': '-=1000px'
    }, 500);
    setTimeout(function() {
      $('#welcome-message').fadeIn();
    }, 550);
    var counter = 5;
    setInterval(function() {
      counter--;
      if (counter >= 0) {
        $('#sign-in-button').html(counter);
      }
      // Display 'counter' wherever you want to display it.
      if (counter === 0) {
        $('#welcome-message').fadeOut();
        $("#submit-circle").animate({
          'width': '-=2000px',
          'height': '-=2000px',
          'margin': '+=1000px'
        }, 500);
        $('#sign-in-button').html("<i class='material-icons'>send</i>");
        clearInterval(counter);
      }
    }, 1000);
  }

  submit(event){
    event.preventDefault();
    let newContact = {
      name: this.state.name.trim(),
      email: this.refs.email.value.trim(),
      phone: this.refs.phone.value.trim(),
      major: this.refs.major.value.trim()
    };
    newContact.newsletter = this.refs.newsletter.checked;
	  newContact.learnmore = this.refs.learnmore.checked;
	  if(this.refs.howhear.state.other){
	    newContact.howhear = this.refs.howhear.refs.other.value;
	  }
	  else{
	    newContact.howhear = this.refs.howhear.refs.howhear.value;
	  }

    Meteor.call("createNewContact", newContact, (error) => {
      if(error){
        console.error("Handle new contact error: ", error);
				if(error.reason == "Email already exists."){
					window.alert("Email already exists.");
				}
				else{
					window.alert("Oops. Something went wrong. Please try again.");
				}
      } else {
				if(this.props.route){
          routeTo(this.props.route);
        }
			}
    });

    this.circleGrow();
    this.timer();
    this.disableEnableFields();
  }

  timer(){
    Meteor.setTimeout(()=>{
      this.unset();
      this.disableEnableFields();
    }, 3500);
  }

  // Only disables name field for now
  disableEnableFields(){
    this.setState({disabled: !this.state.disabled}, ()=>{
      this.refs.user.focus();
    });
  }

  setNew(){
    if(!this.state.user){
      this.state.new = true;
    }
  }

  unset(){
    this.setState({name: ''});
    this.refs.email.value = "";
    this.refs.email.disabled = false;
    this.refs.phone.value = "";
    this.refs.phone.disabled = false;
    this.refs.major.value = "";
    this.refs.major.disabled = false;
    this.refs.howhear.refs.howhear.value ="";
    this.refs.howhear.refs.howhear.disabled = false;
    this.refs.howhear.setState({other: false});
    this.refs.newsletter.checked = false;
    this.refs.newsletter.disabled = false;
    this.refs.learnmore.checked = false;
    this.refs.learnmore.disabled = false;
    $('select').material_select();
    Materialize.updateTextFields();
  }

  changeName(event){
    event.preventDefault();
    this.setState({name: event.target.value});
  }

  render() {
      return (
        <div id="signinformcontainer">
          <div className="card-panel z-depth-5" id="cardwait">
            <div className="card-content">
              <h1>Add Contact</h1>
              <h2>Fill out the info below to create a new contact card</h2>
              <form ref="publicForm" className="publicForm" onSubmit={this.submit.bind(this)} name="form">
								<div className="input-field">
									<input type="text" id="user" ref="user" className="validate" required
										value={this.state.name}
										onChange={this.changeName.bind(this)}
									/>
									<label htmlFor="user">Name</label>
								</div>
								<div className="input-field">
									<input ref="email" id="email" type="email" className="validate" required />
									<label htmlFor="email">Email</label>
								</div>
								<div className="input-field">
									<input ref="phone" id="phone" className="validate" type="tel" />
									<label htmlFor="phone">Phone number (optional)</label>
								</div>
								<div className="input-field">
									<input ref="major" id="major" className="validate" type="text" />
									<label htmlFor="major">Major (optional)</label>
								</div>
								<HowHearSelect ref="howhear" />
								<input type="checkbox" ref="newsletter" id="news" name="news" value="Yes" />
								<label htmlFor="news">Please sign me up for the newsletter</label>
								<input type="checkbox" ref="learnmore" id="more" name="more" value="Yes" />
								<label htmlFor="more">I would like to learn more about IV</label>


								<button id="submit-circle" className="btn-floating btn-large iv-blue waves-effect waves-light right" type="submit" name="action">
									<span id="sign-in-button">
										<i className="material-icons">send</i>
									</span>
								</button>
								<div id="welcome-message">
									<h1>Created contact {this.state.name.trim()}</h1>
								</div>
								<div className="clear-fix"></div>
              </form>
            </div>
          </div>
        </div>
      )

  }
}
