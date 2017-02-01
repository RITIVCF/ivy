import React, {Component} from 'react';
import HowHearSelect from '../event/forms/HowHearSelect.jsx';

export default class NewContactForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: props.route
    };
  }

  submit(event){
    event.preventDefault();
    //console.log(this);
    var newsletter = this.refs.newsletter.checked;
    var thiz = this;
    if(this.refs.howhear.state.other){
      var howhear = this.refs.howhear.refs.other.value;
    }
    else{
      var howhear = this.refs.howhear.refs.howhear.value;
    }
    Meteor.call("createNewUser",
      this.refs.name.value.trim(),
      this.refs.email.value.trim(),
      this.refs.phone.value.trim(),
      this.refs.major.value.trim(),
      howhear.trim(),
      function(error, uid){
        if(error){
          window.alert("Oops. Something went wrong. Please try again.");
          console.log(error);
          return;
        }
        Meteor.call("updateNewsletter", uid, newsletter);
        Materialize.toast("Success!",4000);
        if(thiz.state.route){
          FlowRouter.go(thiz.state.route);
        }
        else{
          thiz.refs.name.value="";
          thiz.refs.email.value="";
          thiz.refs.phone.value="";
          thiz.refs.major.value="";
          this.refs.howhear.refs.howhear.value="";
          thiz.refs.newsletter.checked = false;
        }
      });

    //Meteor.call('addMember');
    }

    handleChange(event){
      Materialize.updateTextFields();
    }

    render() {
      return (
        <div id="signinformcontainer">
        <div className="card-panel z-depth-5" id="cardwait">
          <div className="card-content">
            <h1>New Contact</h1>
            <form className="publicForm" onSubmit={this.submit.bind(this)}>
              <div className="input-field">
                <input type="text" ref="name" id="nm" required />
                <label htmlFor="nm">Name</label>
              </div>
              <div className="input-field">
                <input ref="email"  id="email" type="email" required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input ref="phone" id="phone" type="tel" />
                <label htmlFor="phone">Phone number (optional)</label>
              </div>
              <div className="input-field">
                <input ref="major" type="text" />
                <label htmlFor="major">Major</label>
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
            </form>
          </div>
        </div>
        </div>
      )
    }
  }
