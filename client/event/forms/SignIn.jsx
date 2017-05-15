import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import HowHearSelect from './HowHearSelect.jsx';

export default class SignIn extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      new: true,
      submitted: false
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
    let signInObj = {
      eid: this.props.ev._id,
      uid: this.state.user._id,
      new: !this.state.user, // If not user, new is true
      name: this.refs.user.state.value.trim(),
      email: this.refs.email.value.trim(),
      phone: this.refs.phone.value.trim(),
      major: this.refs.major.value.trim()
    };
    if(this.state.new){
        signInObj.newsletter = this.refs.newsletter.checked;
        signInObj.learnmore = this.refs.learnmore.checked;
        if(this.refs.howhear.state.other){
          signInObj.howhear = this.refs.howhear.refs.other.value;
        }
        else{
          signInObj.howhear = this.refs.howhear.refs.howhear.value;
        }
    }

    Meteor.call("handleEventSignIn", signInObj, function(error){
      if(error){
        console.log("Handle signin error: ", error);
        window.alert("Oops. Something went wrong. Please try again.");
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
    this.refs.user.setState({disabled: !this.refs.user.state.disabled}, ()=>{
      this.refs.user.focus();
    });
  }


  getusers(){
    return Meteor.users.find().fetch();
  }

  update(contt){
    //console.log("Suggestion Selected. Print autosuggest return object.");
    //console.log(contt);
    //this.state.contact = contt;
    this.setState({user: contt});
    //this.state.new = false;
    this.setState({new: false});
    //console.log("print state");
    //console.log(this.state);
    this.refs.email.value = contt.emails[0].address;
    this.refs.email.disabled = true;
    this.refs.phone.value = contt.phone;
    this.refs.phone.disabled = true;
    this.refs.major.value = contt.major;
    this.refs.major.disabled = true;
    this.refs.howhear.refs.howhear.value = contt.howhear;
    this.refs.howhear.refs.howhear.disabled = true;
    this.refs.newsletter.checked = contt.newsletter;
    this.refs.newsletter.disabled = true;
    this.refs.learnmore.checked = contt.learnmore;
    this.refs.learnmore.disabled = true;
    $('select').material_select();
    Materialize.updateTextFields();
    //this.refs.phone.value = this.state.contact.phone;
    //this.refs.newsletter.checked = this.state.contact.newsletter;
    //this.setState({contact:contt});
    ////console.log(this);
  }

  log(){
    //console.log(this.state);
  }

  setNew(){
    if(!this.state.user){
      this.state.new = true;
    }
  }

  unset(){
    //console.log(this);
    //this.state.contact = false;
    this.setState({new: true});
    this.setState({user: false});
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

    // this.refs.phone.value="";
    // this.refs.newsletter.checked=false;
    // this.refs.major.value="";
    //this.state.new=false;
    //this.clearFields.bind(this);
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
              <h1>Welcome to {this.props.ev.name}!</h1>
              <h2>Please sign in</h2>
              <form ref="publicForm" className="publicForm" onSubmit={this.submit.bind(this)} name="form">
                <SelectUser
                  parent={this}
                  unset={this.unset.bind(this)}
                  onBlur={this.setNew.bind(this)}
                  initialValue={""}
                  onChange={this.changeName.bind(this)}
                  updateUser={this.update.bind(this)}
                  id="first_name"
                  type="text"
                  ref="user"
                  className="validate" />
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

                  {/*}<a onClick={this.circle.bind(this)}>expand</a>*/}

                  <button id="submit-circle" className="btn-floating btn-large iv-blue waves-effect waves-light right" type="submit" name="action">
                    <span id="sign-in-button">
                     <i className="material-icons">send</i>
                    </span>
                  </button>
                  <div id="welcome-message">
                    <h1>Welcome to {this.props.ev.name}!</h1>
                    <h2>Thank you for signing in!</h2>
                  </div>
                  <div className="clear-fix"></div>
              </form>
            </div>
          </div>
        </div>
      )

/* adding something more*/

  }
}
