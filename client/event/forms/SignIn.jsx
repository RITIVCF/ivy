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
      'margin': '-=1000px',
      'line-height': '+=2000px'
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
          'margin': '+=1000px',
          'line-height': '-=2000px'
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

  submit(event){
    event.preventDefault();


    var thiz = this;
    console.log(this.state);
    var eid = this.props.ev._id;
    var user = this.state.user;
    var evname = this.props.ev.name;
    var name = this.refs.user.state.value.trim();
    if(this.state.new){
        var newsletter = this.refs.newsletter.checked;
        var more = this.refs.learnmore.checked;
        if(this.refs.howhear.state.other){
          var howhear = this.refs.howhear.refs.other.value;
        }
        else{
          var howhear = this.refs.howhear.refs.howhear.value;
        }
    }

    if( !user ){

      var id = Meteor.call("createNewUser",
        name,
        this.refs.email.value,
        this.refs.phone.value,
        this.refs.major.value,
        howhear,
        function(error, uid){
          Meteor.call("addAttendanceTicket",
            "New Contact: "+ name,
            "New Contact at event: "+ evname,
            "","", uid,
            eid,
            function(errr, tktId){
              if(errr){
                //console.log(errr.reason);
                return;
              }
              Meteor.call("createAttendanceRecord",
              eid, uid,
              true,
              more,
              howhear,
              tktId);
              thiz.timer();
            });
            if(newsletter){
              Meteor.call("updateNewsletter", uid, true);
            }
        });

    }
    else{
      Meteor.call("createAttendanceRecord",
      this.props.ev._id,this.state.user._id,
      false,
      "",
      "",
      "");
      thiz.timer();
      // if(this.refs.newsletter){
      //   Meteor.call("updateNewsletter", this.state.contact._id, true);
      // }
    }
    //this.props.parent.setState({id: this.props.parent.state.id + 1});
  //   this.forceUpdate();
  //   this.refs.email.value="";
  //   if(this.state.new){
  //     this.refs.phone.value="";
  //     this.refs.newsletter.checked=false;
  //     this.refs.major.value="";
  //   }
  //
  //   //this.state.new=false;
  //   this.setState({new: true});
  //   this.refs.user.state.value='';
  //   this.refs.user.forceUpdate();
  // //  this.refs.user.focus();
  }

  timer(){
    this.setState({submitted: true});
    var thiz = this;
    setTimeout(function(){
      thiz.setState({submitted: false});
      thiz.setState({user: false});
      thiz.setState({new: true});
    }, 3000);
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
    Materialize.updateTextFields();
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
    Materialize.updateTextFields();
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

                  <a onClick={this.circle.bind(this)}>expand</a>

                  <button id="submit-circle" className="btn-floating btn-large iv-blue waves-effect waves-light right" type="submit" name="action">
                    <div className="welcome-message">Welcome!!</div>
                    <span id="sign-in-button">
                     <i className="material-icons">send</i>
                    </span>
                  </button>
                  <div className="clear-fix"></div>
              </form>
            </div>
          </div>
        </div>
      )

/* adding something more*/

  }
}
