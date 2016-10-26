import React, {Component} from 'react';


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
    Meteor.call("newContact",
      this.refs.name.value.trim(),
      this.refs.email.value.trim(),
      this.refs.phone.value.trim(),
      this.refs.major.value.trim(),
      function(error, cid){
        if(error){
          window.alert("Oops. Something went wrong. Please try again.");
          return;
        }
        Meteor.call("updateNewsletter", cid, newsletter);
        window.alert("Success!");
        if(thiz.state.route){
          FlowRouter.go(thiz.state.route);
        }
        else{
          thiz.refs.name.value="";
          thiz.refs.email.value="";
          thiz.refs.phone.value="";
          thiz.refs.major.value="";
          thiz.refs.newsletter.checked = false;
        }
      });

    //Meteor.call('addMember');
    }

    render() {
      return (
        <div className="container-fluid">
          <div className="panel panel-default">
            <h1>New Contact</h1>
            <form className="publicForm" onSubmit={this.submit.bind(this)}>
              <div className="form-group">
                <input ref="name" placeholder="Name" id="name" required />
                <input ref="email" placeholder="Email" id="email" type="email" required />
                <input ref="phone" placeholder="Phone number (optional)" type="tel" className={this.state.new?"hidden":""} />
                <input ref="major" placeholder="Major" type="text" className={this.state.new?"hidden":""} />
                <input type="checkbox" ref="newsletter" id="news" name="news" className={this.state.new?"hidden":""} value="Yes" />
                <label htmlFor="news">Please sign me up for the newsletter</label>
                <input type="submit" name="submit" value="Create" className="form-control button" />
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
